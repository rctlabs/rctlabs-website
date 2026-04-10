import { access, mkdir, readFile, writeFile } from "node:fs/promises"
import { spawn } from "node:child_process"
import path from "node:path"

const isWin = process.platform === "win32"
const npmCmd = isWin ? "npm.cmd" : "npm"
const npxCmd = isWin ? "npx.cmd" : "npx"

const port = Number(process.env.PERF_PORT ?? 3012)
const baseUrl = process.env.PERF_BASE_URL ?? `http://localhost:${port}`
const lcpMaxMs = Number(process.env.LCP_MAX_MS ?? 4000)
const RUNS_PER_LOCALE = Number(process.env.PERF_RUNS ?? 3)

const targets = [
  { locale: "en", url: `${baseUrl}/en` },
  { locale: "th", url: `${baseUrl}/th` },
]

function median(arr) {
  const nums = arr.filter((v) => typeof v === "number")
  if (nums.length === 0) return null
  const sorted = [...nums].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

async function waitForReady(proc, timeoutMs = 90000) {
  const startedAt = Date.now()

  return await new Promise((resolve, reject) => {
    let stderr = ""
    let stdout = ""

    const onData = (chunk) => {
      const text = String(chunk)
      stdout += text
      if (text.includes("Ready") || text.includes("started server")) {
        cleanup()
        resolve()
      }
    }

    const onErrorData = (chunk) => {
      stderr += String(chunk)
    }

    const timer = setInterval(() => {
      if (Date.now() - startedAt > timeoutMs) {
        cleanup()
        reject(new Error(`Timed out waiting for server readiness.\n${stdout}\n${stderr}`))
      }
    }, 300)

    const onExit = (code) => {
      cleanup()
      reject(new Error(`Server exited before ready with code ${code}.\n${stdout}\n${stderr}`))
    }

    const cleanup = () => {
      clearInterval(timer)
      proc.stdout?.off("data", onData)
      proc.stderr?.off("data", onErrorData)
      proc.off("exit", onExit)
    }

    proc.stdout?.on("data", onData)
    proc.stderr?.on("data", onErrorData)
    proc.on("exit", onExit)
  })
}

function runCommand(command, commandArgs) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, commandArgs, {
      stdio: ["ignore", "pipe", "pipe"],
      shell: isWin,
    })
    let stdout = ""
    let stderr = ""

    proc.stdout.on("data", (chunk) => {
      stdout += String(chunk)
    })

    proc.stderr.on("data", (chunk) => {
      stderr += String(chunk)
    })

    proc.on("error", reject)
    proc.on("close", (code) => {
      resolve({ stdout, stderr, code: code ?? 1 })
    })
  })
}

async function runLighthouse(url, outputPath) {
  const commandArgs = [
    url,
    "--output=json",
    `--output-path=${outputPath}`,
    "--chrome-flags=--headless=new --no-sandbox",
    "--quiet",
    "--emulated-form-factor=mobile",
    "--screenEmulation.mobile=true",
    "--screenEmulation.width=390",
    "--screenEmulation.height=844",
    "--screenEmulation.deviceScaleFactor=3",
    "--throttling.rttMs=150",
    "--throttling.throughputKbps=1638.4",
    "--throttling.cpuSlowdownMultiplier=4",
  ]

  const run = await runCommand(npxCmd, ["lighthouse", ...commandArgs])

  if (run.code !== 0) {
    try {
      await access(outputPath)
    } catch {
      throw new Error(`lighthouse failed with code ${run.code}.\n${run.stdout}\n${run.stderr}`)
    }
  }

  const json = JSON.parse(await readFile(outputPath, "utf-8"))

  const lcp = json.audits?.["largest-contentful-paint"]?.numericValue ?? null
  const ttfb = json.audits?.["server-response-time"]?.numericValue ?? null
  const tbt = json.audits?.["total-blocking-time"]?.numericValue ?? null
  const renderBlocking = json.audits?.["render-blocking-resources"]?.details?.items ?? []
  const lcpElementSnippet =
    json.audits?.["largest-contentful-paint-element"]?.details?.items?.[0]?.node?.snippet ?? ""
  const lcpBreakdown = json.audits?.["lcp-breakdown"]?.details?.items?.[0] ?? {}

  const renderBlockingItems = renderBlocking.map((item) => ({
    url: item.url ?? item.label ?? "(unknown)",
    wastedMs: item.wastedMs ?? null,
  }))

  return {
    lcp,
    ttfb,
    tbt,
    renderBlockingCount: renderBlocking.length,
    renderBlockingItems,
    lcpElementSnippet,
    phases: {
      ttfb: lcpBreakdown.ttfb ?? null,
      loadDelay: lcpBreakdown.loadDelay ?? null,
      loadTime: lcpBreakdown.loadTime ?? null,
      renderDelay: lcpBreakdown.renderDelay ?? null,
    },
  }
}

async function main() {
  const artifactsDir = path.join(process.cwd(), "artifacts", "perf")
  await mkdir(artifactsDir, { recursive: true })

  const serverProc = spawn(npmCmd, ["run", "start", "--", "-p", String(port)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
    shell: isWin,
  })

  try {
    console.log(`[perf] starting production server on port ${port}...`)
    await waitForReady(serverProc)

    console.log(`[perf] ${RUNS_PER_LOCALE} run(s) per locale  threshold=${lcpMaxMs} ms\n`)

    const localeResults = []

    for (const target of targets) {
      const runs = []

      for (let i = 0; i < RUNS_PER_LOCALE; i++) {
        const outputFile = path.join(artifactsDir, `lcp-trace-${target.locale}-r${i + 1}.json`)
        console.log(`[perf] ${target.locale.toUpperCase()} run ${i + 1}/${RUNS_PER_LOCALE}...`)
        const metrics = await runLighthouse(target.url, outputFile)
        runs.push(metrics)
        console.log(
          `       LCP=${metrics.lcp?.toFixed?.(0) ?? "n/a"} ms  TBT=${metrics.tbt?.toFixed?.(0) ?? "n/a"} ms  TTFB=${metrics.ttfb?.toFixed?.(0) ?? "n/a"} ms  blocking=${metrics.renderBlockingCount}`,
        )
      }

      const medianLcp = median(runs.map((r) => r.lcp))
      const medianTbt = median(runs.map((r) => r.tbt))
      const medianTtfb = median(runs.map((r) => r.ttfb))

      // Deduplicated render-blocking items across all runs
      const seenUrls = new Set()
      const allBlockingItems = []
      for (const run of runs) {
        for (const item of run.renderBlockingItems) {
          if (!seenUrls.has(item.url)) {
            seenUrls.add(item.url)
            allBlockingItems.push(item)
          }
        }
      }

      const lcpElementSnippet = runs.find((r) => r.lcpElementSnippet)?.lcpElementSnippet ?? ""
      const midRun = runs[Math.floor(runs.length / 2)]

      localeResults.push({
        locale: target.locale,
        url: target.url,
        medianLcp,
        medianTbt,
        medianTtfb,
        runs: runs.map((r) => ({ lcp: r.lcp, tbt: r.tbt, ttfb: r.ttfb })),
        renderBlockingCount: Math.max(0, ...runs.map((r) => r.renderBlockingCount)),
        renderBlockingItems: allBlockingItems,
        lcpElementSnippet,
        phases: midRun.phases,
      })
    }

    const summary = {
      timestamp: new Date().toISOString(),
      thresholdMs: lcpMaxMs,
      runsPerLocale: RUNS_PER_LOCALE,
      results: localeResults,
    }

    const summaryPath = path.join(artifactsDir, "lcp-phase-summary.json")
    await writeFile(summaryPath, JSON.stringify(summary, null, 2), "utf-8")

    console.log("\n[perf] -- median results --")
    for (const row of localeResults) {
      console.log(`\n${row.locale.toUpperCase()} ${row.url}`)
      console.log(`  median LCP : ${row.medianLcp?.toFixed?.(0) ?? "n/a"} ms  (threshold ${lcpMaxMs} ms)`)
      console.log(`  median TBT : ${row.medianTbt?.toFixed?.(0) ?? "n/a"} ms`)
      console.log(`  median TTFB: ${row.medianTtfb?.toFixed?.(0) ?? "n/a"} ms`)
      if (row.renderBlockingCount > 0) {
        console.log(`  render-blocking: ${row.renderBlockingCount} resource(s)`)
        for (const item of row.renderBlockingItems) {
          const label = item.url.length > 100 ? `...${item.url.slice(-90)}` : item.url
          console.log(`    * ${label}  (wasted ~${item.wastedMs?.toFixed?.(0) ?? "?"} ms)`)
        }
      }
      if (row.lcpElementSnippet) {
        console.log(`  LCP element: ${row.lcpElementSnippet.replace(/\s+/g, " ").slice(0, 160)}`)
      }
    }

    const regressions = localeResults.filter(
      (row) => typeof row.medianLcp === "number" && row.medianLcp > lcpMaxMs,
    )

    if (regressions.length > 0) {
      console.error("\n[perf] LCP regression guard FAILED (median):")
      for (const row of regressions) {
        console.error(`  ${row.locale.toUpperCase()} median=${row.medianLcp?.toFixed?.(0)} ms > ${lcpMaxMs} ms`)
      }
      process.exitCode = 1
      return
    }

    console.log("\n[perf] LCP regression guard PASSED (median).")
  } finally {
    if (!serverProc.killed) {
      if (isWin) {
        serverProc.kill()
      } else {
        serverProc.kill("SIGTERM")
      }
    }
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`[perf] lcp-trace failed: ${message}`)
  process.exit(1)
})
