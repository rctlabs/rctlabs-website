"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, Circle, ArrowRight } from "lucide-react"

interface Step {
  id: number
  title: string
  titleTh: string
  description: string
  descriptionTh: string
  details: string
  detailsTh: string
  icon: string
  color: string
}

const steps: Step[] = [
  {
    id: 1,
    title: "Intent Extraction",
    titleTh: "การสกัดเจตนา",
    description: "Identify and clarify the core intent",
    descriptionTh: "ระบุและชี้แจ้งเจตนาหลัก",
    details: "Extract the fundamental goal, values, and constraints that drive decision-making.",
    detailsTh: "สกัดเป้าหมายหลัก คุณค่า และข้อจำกัดที่ขับเคลื่อนการตัดสินใจ",
    icon: "Search",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Data Analysis",
    titleTh: "การวิเคราะห์ข้อมูล",
    description: "Gather relevant contextual information",
    descriptionTh: "รวบรวมข้อมูลบริบทที่เกี่ยวข้อง",
    details: "Collect historical data, patterns, and environmental signals. Create a comprehensive picture.",
    detailsTh: "รวบรวมข้อมูลประวัติ รูปแบบ และสัญญาณสิ่งแวดล้อม สร้างภาพรวมที่ครอบคลุม",
    icon: "Database",
    color: "from-cyan-500 to-teal-500"
  },
  {
    id: 3,
    title: "Intent Mapping",
    titleTh: "การทำแผนที่เจตนา",
    description: "Align data with intentional outcomes",
    descriptionTh: "จัดรูปแบบข้อมูลให้สอดคล้องกับผลลัพธ์",
    details: "Create explicit connections between available data and desired intent. Define the relationship matrix.",
    detailsTh: "สร้างความเชื่อมโยงที่ชัดเจนระหว่างข้อมูลที่มีอยู่กับเจตนาที่ต้องการ กำหนดเมทริกซ์ความสัมพันธ์",
    icon: "GitBranch",
    color: "from-teal-500 to-green-500"
  },
  {
    id: 4,
    title: "Solution Architecture",
    titleTh: "สถาปัตยกรรมโซลูชัน",
    description: "Design the system to compute F = (D^I) × A",
    descriptionTh: "ออกแบบระบบเพื่อคำนวณ F = (D^I) × A",
    details: "Build the computational model that transforms data through intent to generate aligned actions.",
    detailsTh: "สร้างแบบจำลองการคำนวณที่เปลี่ยนข้อมูลผ่านเจตนาเพื่อสร้างการกระทำที่สอดคล้อง",
    icon: "Layers",
    color: "from-green-500 to-lime-500"
  },
  {
    id: 5,
    title: "Implementation",
    titleTh: "การนำไปใช้",
    description: "Deploy into production",
    descriptionTh: "Deploy เข้าสู่การผลิต",
    details: "Integrate with existing systems, configure parameters, and establish feedback mechanisms.",
    detailsTh: "บูรณาการกับระบบที่มีอยู่ กำหนดค่าพารามิเตอร์ และสร้างกลไกตอบกลับ",
    icon: "Rocket",
    color: "from-lime-500 to-yellow-500"
  },
  {
    id: 6,
    title: "Validation",
    titleTh: "การตรวจสอบ",
    description: "Verify alignment with intent",
    descriptionTh: "ยืนยันความสอดคล้องกับเจตนา",
    details: "Run comprehensive tests to ensure actions generated are truly aligned with stated intentions.",
    detailsTh: "รันการทดสอบที่ครอบคลุมเพื่อให้แน่ใจว่าการกระทำที่สร้างขึ้นสอดคล้องกับเจตนาที่ระบุ",
    icon: "CheckCircle",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 7,
    title: "Continuous Refinement",
    titleTh: "การปรับปรุงต่อเนื่อง",
    description: "Monitor, learn, and improve",
    descriptionTh: "ติดตาม เรียนรู้ และปรับปรุง",
    details: "Gather feedback, adjust parameters, and evolve the system to better understand and serve intent.",
    detailsTh: "รวบรวมข้อมูลป้อนกลับ ปรับพารามิเตอร์ และพัฒนาระบบให้เข้าใจและ serv เจตนาได้ดีขึ้น",
    icon: "RefreshCw",
    color: "from-orange-500 to-red-500"
  }
]

export function RCT7Timeline({ locale = "en" }: { locale?: "en" | "th" }) {
  const [activeStep, setActiveStep] = useState<number>(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const t = (en: string, th: string) => locale === "th" ? th : en

  const toggleStep = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId))
    } else {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
          {t("RCT-7 Process", "กระบวนการ RCT-7")}
        </h2>
        <p className="text-muted-foreground">
          {t(
            "Seven-step methodology for building intent-driven systems",
            "วิธีการ 7 ขั้นตอนสำหรับการสร้างระบบที่ขับเคลื่อนด้วยเจตนา"
          )}
        </p>
      </div>

      {/* Progress Overview */}
      <div className="mb-8 rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {t("Progress", "ความคืบหน้า")}: {completedSteps.length}/7 {t("steps", "ขั้นตอน")}
          </span>
          <span className="text-sm font-medium text-accent">
            {Math.round((completedSteps.length / 7) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${(completedSteps.length / 7) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-muted hidden md:block" />

        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id)
            const isActive = activeStep === step.id

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative rounded-lg border p-6 transition-all duration-300",
                  isActive 
                    ? "border-accent bg-accent/5" 
                    : isCompleted
                      ? "border-green-500/50 bg-green-500/5"
                      : "border-border bg-card hover:border-accent/30"
                )}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Step Number & Icon */}
                  <div className="flex items-center gap-4 md:w-48 flex-shrink-0">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={cn(
                        "w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300",
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                            ? cn("bg-gradient-to-br", step.color, "text-white")
                            : "bg-muted text-muted-foreground hover:bg-accent/20"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8" />
                      ) : (
                        <span className="text-2xl font-bold">{step.id}</span>
                      )}
                    </button>
                    <div className="md:hidden">
                      <h3 className="font-semibold text-foreground">{t(step.title, step.titleTh)}</h3>
                      <p className="text-sm text-muted-foreground">{t(step.description, step.descriptionTh)}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 hidden md:block">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{t(step.title, step.titleTh)}</h3>
                        <p className="text-accent font-medium text-sm mb-2">{t(step.description, step.descriptionTh)}</p>
                        <p className="text-sm text-muted-foreground">{t(step.details, step.detailsTh)}</p>
                      </div>
                      <button
                        onClick={() => setActiveStep(isActive ? 0 : step.id)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <ArrowRight 
                          className={cn(
                            "w-5 h-5 transition-transform",
                            isActive && "rotate-90"
                          )} 
                        />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Content */}
                  <div className="md:hidden">
                    <p className="text-sm text-muted-foreground">{t(step.details, step.detailsTh)}</p>
                  </div>
                </div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute left-16 -bottom-4 z-10">
                    <div className="w-8 h-8 rounded-full bg-background border-2 border-muted flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Getting Started Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="rounded-lg border bg-card p-6">
          <h4 className="font-semibold mb-4 text-foreground">
            {t("For Individuals", "สำหรับบุคคล")}
          </h4>
          <ul className="space-y-2">
            {[
              t("Clarify your personal intent", "ชี้แจ้งเจตนาส่วนตัว"),
              t("Map your data resources", "ทำแผนที่ทรัพยากรข้อมูล"),
              t("Design decision process", "ออกแบบกระบวนการตัดสินใจ"),
              t("Implement and iterate", "นำไปใช้และปรับปรุง")
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h4 className="font-semibold mb-4 text-foreground">
            {t("For Organizations", "สำหรับองค์กร")}
          </h4>
          <ul className="space-y-2">
            {[
              t("Align stakeholders on intent", "จัดสอดคล้องผู้มีส่วนได้ส่วนเสีย"),
              t("Audit existing systems", "ตรวจสอบระบบที่มีอยู่"),
              t("Design architecture", "ออกแบบสถาปัตยกรรม"),
              t("Deploy organization-wide", "Deploy ทั่วทั้งองค์กร")
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
