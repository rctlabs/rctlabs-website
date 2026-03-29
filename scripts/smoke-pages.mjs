const baseUrl = (process.env.SMOKE_BASE_URL ?? "http://localhost:3005").replace(/\/$/, "")
const articleSlug = process.env.SMOKE_ARTICLE_SLUG ?? "verification-vs-prompt-engineering"

const checks = [
  {
    path: "/",
    expect: ["RCT Labs", "Constitutional AI"],
  },
  {
    path: "/th",
    expect: ["RCT Labs", "ระบบปฏิบัติการ AI แบบรัฐธรรมนูญ"],
  },
  {
    path: "/blog",
    expect: ["Blog", "RCT Labs"],
  },
  {
    path: "/th/blog",
    expect: ["บล็อก", "RCT Labs"],
  },
  {
    path: `/blog/${articleSlug}`,
    expect: ["Verification vs Prompt Engineering", "RCT Labs"],
  },
  {
    path: `/th/blog/${articleSlug}`,
    expect: ["Verification vs Prompt Engineering", "RCT Labs"],
  },
]

async function fetchPage(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache",
    },
  })

  const html = await response.text()
  return { response, html }
}

async function run() {
  let failures = 0

  for (const check of checks) {
    try {
      const { response, html } = await fetchPage(check.path)

      if (!response.ok) {
        failures += 1
        console.error(`FAIL ${check.path} -> HTTP ${response.status}`)
        continue
      }

      const missing = check.expect.filter((needle) => !html.includes(needle))

      if (missing.length > 0) {
        failures += 1
        console.error(`FAIL ${check.path} -> missing: ${missing.join(", ")}`)
        continue
      }

      console.log(`PASS ${check.path}`)
    } catch (error) {
      failures += 1
      const message = error instanceof Error ? error.message : String(error)
      console.error(`FAIL ${check.path} -> ${message}`)
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} smoke check(s) failed.`)
    process.exit(1)
  }

  console.log(`\nAll ${checks.length} page smoke checks passed.`)
}

run()