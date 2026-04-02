"use client"

import { useMemo, useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Calculator, ChevronRight, Orbit, ShieldCheck, Sparkles, Zap } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FDIACalculatorPanel from "@/components/sections/fdia-calculator-panel"

type Language = "en" | "th"

type NodeId = "data" | "intent" | "architect" | "future"

type FDIANode = {
  id: NodeId
  letter: "D" | "I" | "A" | "F"
  label: string
  labelTh: string
  subtitle: string
  subtitleTh: string
  description: string
  descriptionTh: string
  detail: string
  detailTh: string
  visualRole: string
  visualRoleTh: string
  chip: string
  chipTh: string
  relationship: string
  relationshipTh: string
  color: string
  icon: typeof Orbit
}

type FDIAExplorerDialogProps = {
  language: Language
  trigger: ReactNode
}

const nodes: FDIANode[] = [
  {
    id: "data",
    letter: "D",
    label: "Data",
    labelTh: "Data",
    subtitle: "Verified inputs",
    subtitleTh: "ข้อมูลที่ผ่านการตรวจสอบ",
    description: "Raw signals, evidence, and quality controls that feed the system.",
    descriptionTh: "สัญญาณดิบ หลักฐาน และชั้นคุณภาพข้อมูลที่ป้อนเข้าระบบ",
    detail:
      "Data is the operating substrate. If provenance, readiness, and quality controls are weak, the rest of the equation amplifies noise instead of value.",
    detailTh:
      "Data คือฐานปฏิบัติการของระบบ หากที่มา ความพร้อม และการควบคุมคุณภาพอ่อนแอ สมการทั้งชุดจะขยาย noise แทนที่จะขยายคุณค่า",
    visualRole: "Foundation layer",
    visualRoleTh: "ชั้นฐานราก",
    chip: "Input quality",
    chipTh: "คุณภาพ input",
    relationship: "Data raises or lowers the whole ceiling of the system.",
    relationshipTh: "Data เป็นตัวกำหนดเพดานบนสุดของทั้งระบบ",
    color: "#89B4C8",
    icon: Orbit,
  },
  {
    id: "intent",
    letter: "I",
    label: "Intent",
    labelTh: "Intent",
    subtitle: "Exponential amplifier",
    subtitleTh: "ตัวขยายแบบยกกำลัง",
    description: "Clarity of purpose determines how much value data can unlock.",
    descriptionTh: "ความชัดเจนของเจตนากำหนดว่าข้อมูลจะปลดล็อกคุณค่าได้มากแค่ไหน",
    detail:
      "Intent is the exponent in the equation. Small gains in clarity can create non-linear downstream effects, which is why this variable cannot be treated like a decorative label.",
    detailTh:
      "Intent คือ exponent ในสมการ ความชัดเจนที่เพิ่มขึ้นเพียงเล็กน้อยสามารถสร้างผลลัพธ์แบบไม่เป็นเส้นตรงได้ จึงไม่ใช่เพียง label เชิงตกแต่ง",
    visualRole: "Amplification layer",
    visualRoleTh: "ชั้นขยายพลัง",
    chip: "Signal shaping",
    chipTh: "การกำหนดทิศสัญญาณ",
    relationship: "Intent changes the curve, not just the volume.",
    relationshipTh: "Intent เปลี่ยนรูปทรงของผลลัพธ์ ไม่ใช่แค่เพิ่มปริมาณ",
    color: "#C4745B",
    icon: Zap,
  },
  {
    id: "architect",
    letter: "A",
    label: "Architect",
    labelTh: "Architect",
    subtitle: "Human oversight",
    subtitleTh: "มนุษย์กำกับดูแล",
    description: "Governance, judgment, and system design keep AI aligned with reality.",
    descriptionTh: "ธรรมาภิบาล วิจารณญาณ และการออกแบบระบบทำให้ AI อยู่ในกรอบของโลกจริง",
    detail:
      "Architect is the multiplier because systems need stewardship. Human-in-the-loop review turns computation into accountable execution.",
    detailTh:
      "Architect เป็นตัวคูณเพราะระบบต้องมีผู้กำกับ Human-in-the-loop ทำให้การคำนวณกลายเป็นการปฏิบัติที่ตรวจสอบรับผิดชอบได้",
    visualRole: "Governance layer",
    visualRoleTh: "ชั้นกำกับดูแล",
    chip: "Human in loop",
    chipTh: "มนุษย์ในวงจร",
    relationship: "Architect keeps optimization aligned with policy and reality.",
    relationshipTh: "Architect ทำให้การ optimization ยังสอดคล้องกับนโยบายและโลกจริง",
    color: "#7B9E87",
    icon: ShieldCheck,
  },
  {
    id: "future",
    letter: "F",
    label: "Future",
    labelTh: "Future",
    subtitle: "Constructed outcome",
    subtitleTh: "ผลลัพธ์ที่ถูกสร้างขึ้น",
    description: "Future is produced by the whole pipeline, not guessed in isolation.",
    descriptionTh: "Future ถูกสร้างขึ้นจากทั้ง pipeline ไม่ใช่การคาดเดาแยกส่วน",
    detail:
      "Future is the visible outcome of disciplined inputs, sharp intent, and accountable architecture working together as one operating system.",
    detailTh:
      "Future คือผลลัพธ์ที่มองเห็นได้จาก input ที่มีวินัย เจตนาที่ชัด และสถาปัตยกรรมที่รับผิดชอบซึ่งทำงานร่วมกันเป็นระบบเดียว",
    visualRole: "Outcome layer",
    visualRoleTh: "ชั้นผลลัพธ์",
    chip: "Strategic output",
    chipTh: "ผลลัพธ์เชิงกลยุทธ์",
    relationship: "Future is the consequence, never the starting assumption.",
    relationshipTh: "Future คือผลตามมา ไม่ใช่สมมติฐานตั้งต้น",
    color: "#D4A853",
    icon: Sparkles,
  },
]

const railOrder: NodeId[] = ["data", "intent", "architect", "future"]

function formatCompactNumber(value: number) {
  if (value >= 1e15) return value.toExponential(2)
  if (value >= 1e12) return `${(value / 1e12).toFixed(1)}T`
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`
  return value.toFixed(1)
}

export function FDIAExplorerDialog({ language, trigger }: FDIAExplorerDialogProps) {
  const prefersReducedMotion = useReducedMotion()
  const isEn = language === "en"
  const [selectedId, setSelectedId] = useState<NodeId>("intent")

  const selectedNode = nodes.find((node) => node.id === selectedId) ?? nodes[1]
  const intentReadout = useMemo(() => {
    const baseData = 85
    const architectMultiplier = 1.5
    const lowIntent = Math.pow(baseData, 1) * architectMultiplier
    const highIntent = Math.pow(baseData, 10) * architectMultiplier

    return {
      lowIntent: formatCompactNumber(lowIntent),
      highIntent: formatCompactNumber(highIntent),
      multiplier: `${(highIntent / lowIntent).toExponential(2)}x`,
    }
  }, [])

  const readinessCards = [
    {
      title: isEn ? "Layer" : "ชั้นของระบบ",
      value: isEn ? selectedNode.visualRole : selectedNode.visualRoleTh,
    },
    {
      title: isEn ? "Focus" : "จุดเน้น",
      value: isEn ? selectedNode.chip : selectedNode.chipTh,
    },
    {
      title: isEn ? "System effect" : "ผลต่อระบบ",
      value: isEn ? selectedNode.relationship : selectedNode.relationshipTh,
    },
  ]

  const operationalNotes = [
    isEn
      ? "The popup now uses a real dialog with focus trap, overlay portal, and keyboard close behavior."
      : "popup ใหม่นี้ใช้ dialog จริง มี focus trap, overlay ผ่าน portal และปิดด้วย keyboard ได้",
    isEn
      ? "Content scrolls inside the dialog instead of being clipped by a fixed-height shell."
      : "เนื้อหาภายในเลื่อนอ่านได้จริง แทนที่จะถูกตัดทิ้งด้วยกรอบความสูงคงที่",
    isEn
      ? "The blueprint rail is rebuilt for tap, click, and keyboard selection rather than relying on a squeezed compact chart."
      : "rail ของ blueprint ถูกสร้างใหม่ให้เลือกได้ด้วย tap, click และ keyboard แทนการบีบ chart เดิมให้เล็กลง",
  ]

  const accordionLabels = {
    snapshot: isEn ? "Equation Snapshot" : "ภาพรวมของสมการ",
    blueprint: isEn ? "Blueprint Rail" : "rail ของ blueprint",
    layer: isEn ? "Selected Layer" : "ชั้นที่เลือก",
    exponent: isEn ? "Intent Delta" : "ผลต่างของ Intent",
    calculator: isEn ? "Live Calculator" : "เครื่องคำนวณแบบสด",
    notes: isEn ? "Operational Notes" : "บันทึกการใช้งาน",
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="w-[min(980px,calc(100vw-1rem))] max-w-[min(980px,calc(100vw-1rem))] gap-0 overflow-hidden border border-[rgba(176,150,111,0.18)] bg-[linear-gradient(180deg,rgba(29,26,24,0.985),rgba(18,17,16,0.995))] p-0 text-[#f4ede3] shadow-[0_32px_108px_rgba(0,0,0,0.46)] sm:max-w-[min(980px,calc(100vw-2rem))]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.14),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(137,180,200,0.09),transparent_24%),radial-gradient(circle_at_80%_82%,rgba(123,158,135,0.08),transparent_22%)]" />

        <div className="relative z-10 flex max-h-[86vh] flex-col">
          <DialogHeader className="border-b border-[rgba(176,150,111,0.12)] px-4 py-3.5 text-left sm:px-5 sm:py-4.5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-warm-amber/20 bg-warm-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-amber">
                  <Sparkles className="h-3.5 w-3.5" />
                  {isEn ? "FDIA Blueprint" : "FDIA Blueprint"}
                </div>
                <DialogTitle className="text-[20px] font-semibold leading-tight text-[#f4ede3] sm:text-[24px]">
                  {isEn ? "Future = Data^Intent × Architect" : "Future = Data^Intent × Architect"}
                </DialogTitle>
                <DialogDescription className="mt-2 max-w-2xl text-sm leading-relaxed text-[#c7bbab] sm:text-[14px]">
                  {isEn
                    ? "A tighter floating dialog with collapsible modules, lightweight rhythm, and reactive details only when the visitor asks for them."
                    : "dialog ใหม่ที่เบาขึ้น สั้นลง และแยกเป็นโมดูลยุบ/ขยายได้ โดยจะแสดงรายละเอียดลึกเมื่อผู้ใช้เลือกเปิดเท่านั้น"}
                </DialogDescription>
              </div>

              <DialogClose asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(176,150,111,0.18)] bg-white/5 text-[#f4ede3] transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-warm-amber/50"
                  aria-label={isEn ? "Close FDIA blueprint dialog" : "ปิดหน้าต่าง FDIA"}
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? undefined : { duration: 0.26 }}
              className="mb-4 rounded-[26px] border border-[rgba(176,150,111,0.16)] bg-[linear-gradient(180deg,rgba(37,33,30,0.9),rgba(22,20,19,0.96))] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-warm-amber">
                    {isEn ? "Floating Summary" : "สรุปแบบล่องลอย"}
                  </p>
                  <p className="mt-1 text-sm text-[#c7bbab]">
                    {isEn
                      ? "Open only the modules you need. The popup stays short until you ask for deeper detail."
                      : "เปิดเฉพาะโมดูลที่ต้องการ เพื่อให้ popup สั้นลงและค่อยขยายเมื่อผู้ใช้ต้องการรายละเอียดเพิ่ม"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="rounded-full border border-warm-amber/18 bg-warm-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-amber">
                    {isEn ? "Intent is exponential" : "Intent เป็น exponent"}
                  </div>
                  <div className="rounded-full border border-[rgba(176,150,111,0.16)] bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d9cfbf]">
                    {isEn ? selectedNode.label : selectedNode.labelTh}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center">
                <div className="rounded-3xl border border-[rgba(212,168,83,0.14)] bg-[linear-gradient(180deg,rgba(29,31,35,0.94),rgba(22,24,29,0.98))] px-4 py-3.5 text-center shadow-[0_14px_34px_rgba(0,0,0,0.22)]">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a89f92]">
                    {isEn ? "Equation Core" : "แกนของสมการ"}
                  </div>
                  <div className="mt-2 font-mono text-[26px] font-bold tracking-[0.12em] sm:text-[30px]">
                    <span className="text-warm-amber">F</span>
                    <span className="mx-2 text-muted-foreground">=</span>
                    <span style={{ color: "#89B4C8" }}>D</span>
                    <sup className="text-[0.58em] align-super" style={{ color: "#C4745B" }}>I</sup>
                    <span className="mx-2 text-muted-foreground">×</span>
                    <span style={{ color: "#7B9E87" }}>A</span>
                  </div>
                </div>

                <div className="hidden items-center justify-center lg:flex">
                  <ChevronRight className="h-4 w-4 text-[#857a6d]" />
                </div>

                <div className="rounded-3xl border border-[rgba(176,150,111,0.14)] bg-white/4 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9f9488]">
                    {isEn ? "Intent delta" : "ผลต่างของ Intent"}
                  </div>
                  <div className="mt-2 font-mono text-lg font-bold text-[#e7a38d]">{intentReadout.multiplier}</div>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.84fr)]">
              <Accordion type="multiple" defaultValue={["snapshot", "blueprint"]} className="rounded-3xl border border-[rgba(176,150,111,0.14)] bg-[linear-gradient(180deg,rgba(33,30,28,0.82),rgba(21,20,18,0.96))] px-4 sm:px-5">
                <AccordionItem value="snapshot" className="border-[rgba(176,150,111,0.12)]">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-amber">{accordionLabels.snapshot}</div>
                      <div className="mt-1 text-sm text-[#c7bbab]">
                        {isEn ? "Short reading of the operating equation." : "คำอธิบายสั้นของสมการปฏิบัติการ"}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="rounded-3xl border border-[rgba(176,150,111,0.12)] bg-white/4 p-4">
                      <p className="text-sm leading-relaxed text-[#d7ccbe] sm:text-[15px]">
                        {isEn
                          ? "Future is not guessed in isolation. Data provides the substrate, Intent bends the curve, and Architect governs how execution stays aligned with reality."
                          : "Future ไม่ได้เกิดจากการเดาแยกส่วน แต่เกิดจาก Data ที่เป็นฐาน, Intent ที่เปลี่ยนเส้นโค้งของผลลัพธ์, และ Architect ที่กำกับให้การทำงานสอดคล้องกับโลกจริง"}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="blueprint" className="border-[rgba(176,150,111,0.12)]">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-amber">{accordionLabels.blueprint}</div>
                      <div className="mt-1 text-sm text-[#c7bbab]">
                        {isEn ? "Select a layer to update the live panel below." : "เลือกชั้นของระบบเพื่ออัปเดต panel ด้านล่าง"}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="grid gap-3 sm:grid-cols-4">
                      {railOrder.map((nodeId, index) => {
                        const node = nodes.find((entry) => entry.id === nodeId)

                        if (!node) {
                          return null
                        }

                        const selected = node.id === selectedId
                        const Icon = node.icon

                        return (
                          <div key={node.id} className="flex items-center gap-2 sm:contents">
                            <motion.button
                              type="button"
                              onClick={() => setSelectedId(node.id)}
                              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                              whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                              className="group relative flex w-full min-w-0 flex-col rounded-3xl border px-3.5 py-3.5 text-left transition-[border-color,background-color,box-shadow,transform] duration-200"
                              style={{
                                borderColor: selected ? node.color : "rgba(176,150,111,0.16)",
                                background: selected
                                  ? "linear-gradient(180deg, rgba(46,43,40,0.98), rgba(28,26,24,1))"
                                  : "linear-gradient(180deg, rgba(36,33,30,0.78), rgba(26,24,22,0.9))",
                                boxShadow: selected ? `0 12px 26px ${node.color}20` : undefined,
                              }}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 font-mono text-base font-bold"
                                  style={{ color: node.color, background: `${node.color}14` }}
                                >
                                  {node.letter}
                                </span>
                                <Icon className="h-4 w-4 text-[#998f82]" />
                              </div>
                              <div className="mt-2.5 text-sm font-semibold text-[#f4ede3]">{isEn ? node.label : node.labelTh}</div>
                              <div className="mt-1 text-xs leading-relaxed text-[#b5aa9a]">{isEn ? node.subtitle : node.subtitleTh}</div>
                            </motion.button>
                            {index < railOrder.length - 1 ? <div className="hidden items-center justify-center sm:flex"><ChevronRight className="h-4 w-4 text-[#857a6d]" /></div> : null}
                          </div>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="layer" className="border-[rgba(176,150,111,0.12)]">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-amber">{accordionLabels.layer}</div>
                      <div className="mt-1 text-sm text-[#c7bbab]">{isEn ? "Live detail for the currently selected node." : "รายละเอียดสดของ node ที่เลือกอยู่"}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="rounded-3xl border border-[rgba(176,150,111,0.14)] bg-white/4 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 font-mono text-lg font-bold" style={{ color: selectedNode.color, background: `${selectedNode.color}16` }}>
                            {selectedNode.letter}
                          </span>
                          <div>
                            <div className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: selectedNode.color }}>
                              {isEn ? selectedNode.visualRole : selectedNode.visualRoleTh}
                            </div>
                            <div className="text-lg font-semibold text-[#f4ede3]">{isEn ? selectedNode.label : selectedNode.labelTh}</div>
                          </div>
                        </div>
                        <div className="rounded-full border border-[rgba(176,150,111,0.16)] bg-black/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d6ccbf]">
                          {isEn ? selectedNode.chip : selectedNode.chipTh}
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-[#d2c7b9] sm:text-[15px]">{isEn ? selectedNode.description : selectedNode.descriptionTh}</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#b8ac9c] sm:text-[15px]">{isEn ? selectedNode.detail : selectedNode.detailTh}</p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {readinessCards.map((card) => (
                          <div key={card.title} className="rounded-[20px] border border-[rgba(176,150,111,0.12)] bg-[rgba(255,255,255,0.03)] px-3.5 py-3">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9f9488]">{card.title}</div>
                            <div className="mt-2 text-sm leading-relaxed text-[#eee7dd]">{card.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="exponent" className="border-[rgba(176,150,111,0.12)]">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-amber">{accordionLabels.exponent}</div>
                      <div className="mt-1 text-sm text-[#c7bbab]">{isEn ? "Compare low-intent and high-intent outcomes." : "เปรียบเทียบผลลัพธ์เมื่อ intent ต่ำและสูง"}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl border border-[rgba(176,150,111,0.12)] bg-white/4 px-4 py-3.5">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-amber">{isEn ? "Low intent" : "intent ต่ำ"}</div>
                        <div className="mt-2 font-mono text-[15px] text-[#d7ccbe]">85<sup>1</sup> × 1.5 = {intentReadout.lowIntent}</div>
                        <div className="mt-1 text-sm text-[#a79b8d]">{isEn ? "Behaves almost linearly." : "ให้ผลใกล้เคียงเชิงเส้น"}</div>
                      </div>
                      <div className="rounded-3xl border border-[rgba(176,150,111,0.12)] bg-white/4 px-4 py-3.5">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e7a38d]">{isEn ? "High intent" : "intent สูง"}</div>
                        <div className="mt-2 font-mono text-[15px] text-[#f0e6d8]">85<sup>10</sup> × 1.5 = {intentReadout.highIntent}</div>
                        <div className="mt-1 text-sm text-[#a79b8d]">{isEn ? "Creates non-linear lift across the system." : "สร้างแรงยกแบบไม่เป็นเส้นตรงให้ทั้งระบบ"}</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="multiple" defaultValue={[]} className="rounded-3xl border border-[rgba(176,150,111,0.14)] bg-[linear-gradient(180deg,rgba(31,29,26,0.8),rgba(20,19,18,0.96))] px-4 sm:px-5">
                <AccordionItem value="calculator" className="border-[rgba(176,150,111,0.12)]">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(176,150,111,0.16)] bg-black/15 text-[#d6ccbf]">
                        <Calculator className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-amber">{accordionLabels.calculator}</div>
                        <div className="mt-1 text-sm text-[#c7bbab]">{isEn ? "Expand when you want to manipulate the variables live." : "ขยายเมื่อผู้ใช้ต้องการปรับตัวแปรแบบสด"}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <FDIACalculatorPanel language={language} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="notes" className="border-[rgba(176,150,111,0.12)]">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-amber">{accordionLabels.notes}</div>
                      <div className="mt-1 text-sm text-[#c7bbab]">{isEn ? "Implementation behavior and usage guidance." : "พฤติกรรมของ implementation และแนวทางใช้งาน"}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="space-y-2.5">
                      {operationalNotes.map((note) => (
                        <div key={note} className="rounded-[20px] border border-[rgba(176,150,111,0.12)] bg-white/4 px-4 py-3 text-sm leading-relaxed text-[#d7ccbe]">
                          {note}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}