"use client"

import { m, useReducedMotion } from "framer-motion"

type AboutFDIAShowcaseProps = {
  locale: "en" | "th"
}

export function AboutFDIAShowcase({ locale }: AboutFDIAShowcaseProps) {
  const reduceMotion = useReducedMotion()
  const isTh = locale === "th"

  const fdiaCards = [
    {
      symbol: "F",
      title: isTh ? "Future" : "Future",
      subtitle: isTh ? "อนาคตที่ถูกออกแบบ" : "Designed outcome",
      description: isTh ? "ไม่ใช่การทำนายแบบปล่อยตามยถากรรม แต่เป็นผลลัพธ์ที่ถูกออกแบบจากโครงสร้าง การกำกับดูแล และการตัดสินใจ" : "Not a passive prediction, but an outcome deliberately shaped by structure, governance, and decision quality.",
      accent: "#D4A853",
      softBg: "rgba(212,168,83,0.10)",
    },
    {
      symbol: "D",
      title: isTh ? "Data" : "Data",
      subtitle: isTh ? "ข้อมูลและความเป็นจริง" : "Reality inputs",
      description: isTh ? "วัตถุดิบทั้งหมดของความจริง ตั้งแต่บริบท ประสบการณ์ ไปจนถึงสัญญาณแวดล้อมที่ระบบต้องรับผิดชอบต่อมัน" : "The raw material of reality: context, experience, and environmental signals the system must answer to.",
      accent: "#89B4C8",
      softBg: "rgba(137,180,200,0.10)",
    },
    {
      symbol: "I",
      title: isTh ? "Intent" : "Intent",
      subtitle: isTh ? "ตัวขยายความหมาย" : "Meaning multiplier",
      description: isTh ? "Intent คือสิ่งที่ทำให้ข้อมูลไม่ใช่ noise อีกต่อไป แต่กลายเป็น signal ที่มีเป้าหมายและลำดับความสำคัญ" : "Intent turns data from noise into directional signal with purpose and priority.",
      accent: "#F59E0B",
      softBg: "rgba(245,158,11,0.10)",
    },
    {
      symbol: "A",
      title: isTh ? "Architect" : "Architect",
      subtitle: isTh ? "มนุษย์ผู้ลงนาม" : "Human signatory",
      description: isTh ? "มนุษย์ยังอยู่ในระบบในฐานะผู้รับผิดชอบเชิงศีลธรรม ไม่ใช่ observer ที่ยืนดู output จากข้างนอก" : "The human remains inside the system as a moral signatory, not an observer standing outside the output stream.",
      accent: "#7B9E87",
      softBg: "rgba(123,158,135,0.11)",
    },
  ]

  const equationMotion = reduceMotion
    ? {}
    : {
        animate: { opacity: [0.94, 1, 0.95], y: [0, -4, 0] },
        transition: { duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" as const },
      }

  return (
    <section className="relative py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-[38px] border border-[#d8cebf] bg-white/82 px-6 py-8 shadow-[0_22px_58px_rgba(84,61,31,0.08)] backdrop-blur-[2px] dark:border-border/70 dark:bg-card/86 md:px-8 md:py-10">
          <div className="homepage-ambient-layer absolute inset-0 opacity-95">
            <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute -left-12 top-10 h-56 w-56 rounded-full" />
            <div className="homepage-ambient-orb homepage-ambient-orb--blue absolute right-0 top-18 h-64 w-64 rounded-full" />
            <div className="homepage-ambient-orb homepage-ambient-orb--terra homepage-ambient-orb--slow absolute left-1/3 bottom-0 h-60 w-60 rounded-full" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,246,0.68),rgba(255,250,246,0.18)_34%,rgba(255,250,246,0.62)_100%)] dark:bg-[linear-gradient(180deg,rgba(22,20,18,0.30),rgba(22,20,18,0.08)_34%,rgba(22,20,18,0.24)_100%)]" />
          </div>

          <div className="relative space-y-10">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/20 bg-warm-amber/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-warm-amber">
                  {isTh ? "ปรัชญาหลัก" : "Core Philosophy"}
                </div>
                <h2 className="max-w-xl text-4xl font-bold leading-tight text-foreground md:text-5xl">
                  {isTh ? "สมการที่กำกับทุกสิ่ง" : "The Equation That Governs Everything"}
                </h2>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  {isTh
                    ? "FDIA ไม่ได้ถูกใช้เป็นแค่ถ้อยคำเชิงปรัชญา แต่มันกำหนดว่า RCT จะตีความข้อมูล ใช้ intent อย่างไร และวางมนุษย์ไว้ตรงไหนในกระบวนการตัดสินใจ"
                    : "FDIA is not decorative philosophy. It defines how RCT interprets data, amplifies intent, and keeps the human positioned inside the final decision chain."}
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    isTh ? "Intent-first architecture" : "Intent-first architecture",
                    isTh ? "Verification before release" : "Verification before release",
                    isTh ? "Human-signed outcomes" : "Human-signed outcomes",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-[#eadfce] bg-white/92 px-4 py-3 text-sm font-medium text-foreground shadow-[0_10px_24px_rgba(84,61,31,0.035)] dark:border-border/70 dark:bg-background/35">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-4xl border border-[#2b2620] bg-[#1b1a18] p-6 text-warm-sand shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_44px_rgba(0,0,0,0.22)] dark:border-[#39332b] dark:bg-[#151412] md:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,168,83,0.14),transparent_38%),radial-gradient(circle_at_82%_22%,rgba(137,180,200,0.10),transparent_22%),radial-gradient(circle_at_25%_85%,rgba(123,158,135,0.10),transparent_20%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-warm-amber/40 to-transparent opacity-80" />
                <m.div className="relative" {...equationMotion}>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-amber/90">{isTh ? "Operating equation" : "Operating equation"}</div>
                  <div className="mt-6 flex flex-wrap items-end justify-center gap-3 text-center font-mono text-[3rem] font-bold tracking-[-0.06em] sm:text-[4.5rem] md:text-[5.5rem]">
                    <span style={{ color: "#D4A853" }}>F</span>
                    <span className="pb-1 text-warm-sand/78">=</span>
                    <span className="pb-1 text-warm-sand/72">(</span>
                    <span style={{ color: "#89B4C8" }}>D</span>
                    <span className="relative inline-flex pb-5 pr-2 align-top text-[1.45rem] text-orange-300 sm:text-[1.8rem] md:text-[2rem]">I</span>
                    <span className="pb-1 text-warm-sand/72">)</span>
                    <span className="pb-1 text-warm-sand/78">×</span>
                    <span style={{ color: "#7B9E87" }}>A</span>
                  </div>
                  <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-7 text-warm-sand/70 md:text-base">
                    {isTh
                      ? "Data กลายเป็นพลังที่มีทิศทางเมื่อถูกยกกำลังด้วย Intent และจะไม่กลายเป็นอนาคตที่น่าเชื่อถือจนกว่าจะผ่าน Architect ผู้ลงนามการตัดสินใจสุดท้าย"
                      : "Data becomes directional power when raised by Intent, and it does not become trustworthy future-state output until it passes through the Architect who signs the final decision."}
                  </p>
                </m.div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {fdiaCards.map((card, index) => (
                <m.div
                  key={card.symbol}
                  className="group relative overflow-hidden rounded-[28px] border border-[#e6ddd0] bg-white/94 p-6 shadow-[0_12px_30px_rgba(84,61,31,0.045)] dark:border-border/70 dark:bg-card/92"
                  initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={reduceMotion ? undefined : { duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-80" style={{ background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)` }} />
                  <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] dark:bg-background/35" style={{ borderColor: `${card.accent}55`, background: card.softBg, color: card.accent }}>
                    <span className="font-mono text-[1.7rem] font-bold">{card.symbol}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-foreground">{card.title}</h3>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{card.subtitle}</div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{card.description}</p>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}