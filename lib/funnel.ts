type FunnelLanguage = "en" | "th"

type FunnelIntentDefinition = {
  key: string
  context: string
  title: Record<Language, string>
  description: Record<Language, string>
  subject: Record<Language, string>
  message: Record<Language, string>
}

const funnelIntentMap: Record<string, FunnelIntentDefinition> = {
  "pricing:rctlabs:sales": {
    key: "pricing:rctlabs:sales",
    context: "pricing:rctlabs:sales",
    title: {
      en: "RCTLabs pricing inquiry",
      th: "สอบถามราคา RCTLabs",
    },
    description: {
      en: "This contact came from the pricing page for the RCTLabs platform. Use this flow for enterprise quotes, procurement discussion, and technical qualification.",
      th: "คำขอนี้มาจากหน้า pricing ของแพลตฟอร์ม RCTLabs ใช้สำหรับคุยเรื่องใบเสนอราคา กระบวนการจัดซื้อ และการประเมินเชิงเทคนิคระดับองค์กร",
    },
    subject: {
      en: "RCTLabs enterprise pricing request",
      th: "ขอข้อมูลราคา RCTLabs สำหรับองค์กร",
    },
    message: {
      en: "We are evaluating RCTLabs and would like pricing, deployment options, implementation scope, and enterprise onboarding details.",
      th: "เรากำลังประเมิน RCTLabs และต้องการข้อมูลด้านราคา รูปแบบการ deploy ขอบเขต implementation และรายละเอียด onboarding สำหรับองค์กร",
    },
  },
  "pricing:artent-ai:sales": {
    key: "pricing:artent-ai:sales",
    context: "pricing:artent-ai:sales",
    title: {
      en: "Artent AI pricing inquiry",
      th: "สอบถามราคา Artent AI",
    },
    description: {
      en: "This contact came from the pricing page for Artent AI. Use this flow for creative automation evaluation, volume assumptions, and team workflow fit.",
      th: "คำขอนี้มาจากหน้า pricing ของ Artent AI ใช้สำหรับคุยเรื่องการประเมิน creative automation ปริมาณการใช้งาน และความเหมาะสมกับ workflow ของทีม",
    },
    subject: {
      en: "Artent AI enterprise pricing request",
      th: "ขอข้อมูลราคา Artent AI สำหรับองค์กร",
    },
    message: {
      en: "We are evaluating Artent AI and would like pricing, workflow integration details, usage assumptions, and support options.",
      th: "เรากำลังประเมิน Artent AI และต้องการข้อมูลด้านราคา การเชื่อม workflow สมมติฐานการใช้งาน และตัวเลือกการสนับสนุน",
    },
  },
  "pricing:signed-ai:sales": {
    key: "pricing:signed-ai:sales",
    context: "pricing:signed-ai:sales",
    title: {
      en: "SignedAI pricing inquiry",
      th: "สอบถามราคา SignedAI",
    },
    description: {
      en: "This contact came from the pricing page for SignedAI. Use this flow for verification, compliance, and high-risk deployment requirements.",
      th: "คำขอนี้มาจากหน้า pricing ของ SignedAI ใช้สำหรับคุยเรื่อง verification, compliance และข้อกำหนดของงานที่มีความเสี่ยงสูง",
    },
    subject: {
      en: "SignedAI enterprise pricing request",
      th: "ขอข้อมูลราคา SignedAI สำหรับองค์กร",
    },
    message: {
      en: "We are evaluating SignedAI and would like pricing, verification architecture details, compliance coverage, and rollout requirements.",
      th: "เรากำลังประเมิน SignedAI และต้องการข้อมูลด้านราคา สถาปัตยกรรมการตรวจสอบ ขอบเขต compliance และเงื่อนไขการนำไปใช้งาน",
    },
  },
  "whitepaper:evaluation-pack:request": {
    key: "whitepaper:evaluation-pack:request",
    context: "whitepaper:evaluation-pack:request",
    title: {
      en: "Whitepaper enterprise evaluation request",
      th: "ขอชุดเอกสารประเมิน Whitepaper สำหรับองค์กร",
    },
    description: {
      en: "This contact came from the whitepaper gate. Use this flow for deeper evaluation packs, procurement material, and enterprise review sessions.",
      th: "คำขอนี้มาจาก whitepaper gate ใช้สำหรับขอชุดเอกสารประเมินเชิงลึก วัสดุประกอบ procurement และการนัด review กับทีม",
    },
    subject: {
      en: "Request enterprise whitepaper evaluation pack",
      th: "ขอชุดเอกสาร Whitepaper สำหรับประเมินในองค์กร",
    },
    message: {
      en: "We reviewed the public whitepaper materials and would like the enterprise evaluation pack, architecture review notes, and next-step guidance.",
      th: "เราได้ตรวจสอบเอกสาร Whitepaper สาธารณะแล้ว และต้องการชุดเอกสารประเมินสำหรับองค์กร บันทึก architecture review และคำแนะนำขั้นถัดไป",
    },
  },
  "launch:request-access": {
    key: "launch:request-access",
    context: "launch:request-access",
    title: {
      en: "Request early access",
      th: "ขอสิทธิ์เข้าถึงล่วงหน้า",
    },
    description: {
      en: "This contact came from the public launch navbar. Use this flow for teams requesting product access, launch briefings, or a guided evaluation path.",
      th: "คำขอนี้มาจาก navbar ของเว็บ public launch ใช้สำหรับทีมที่ต้องการขอสิทธิ์เข้าถึง นัด brief การเปิดตัว หรือขอเส้นทางประเมินระบบแบบมีผู้ดูแล",
    },
    subject: {
      en: "Request early access to RCT Labs",
      th: "ขอสิทธิ์เข้าถึง RCT Labs ล่วงหน้า",
    },
    message: {
      en: "We are reviewing the public RCT Labs launch materials and would like early access, an evaluation path, and the next recommended steps for our team.",
      th: "เรากำลังตรวจสอบข้อมูล public launch ของ RCT Labs และต้องการขอสิทธิ์เข้าถึงล่วงหน้า แนวทางการประเมินระบบ และขั้นตอนถัดไปที่เหมาะกับทีมของเรา",
    },
  },
}

export function getFunnelIntent(language: FunnelLanguage, contextKey?: string | null) {
  if (!contextKey) return null
  const intent = funnelIntentMap[contextKey]
  if (!intent) return null

  return {
    context: intent.context,
    title: intent.title[language],
    description: intent.description[language],
    subject: intent.subject[language],
    message: intent.message[language],
  }
}

export function buildContactHref(language: FunnelLanguage, contextKey: string) {
  return `/${language}/contact?context=${encodeURIComponent(contextKey)}`
}