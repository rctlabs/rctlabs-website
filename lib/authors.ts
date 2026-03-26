export type AuthorProfile = {
  id: string
  name: string
  role: {
    en: string
    th: string
  }
  bio: {
    en: string
    th: string
  }
  expertise: string[]
  sameAs?: string[]
  profileType: "person" | "organization"
}

export const authorProfiles: AuthorProfile[] = [
  {
    id: "ittirit-saengow",
    name: "Ittirit Saengow",
    role: {
      en: "Founder and Architect, RCT Labs",
      th: "ผู้ก่อตั้งและสถาปนิกระบบ, RCT Labs",
    },
    bio: {
      en: "Founder of RCT Labs and architect of the public constitutional AI platform narrative, platform roadmap, and enterprise operating model.",
      th: "ผู้ก่อตั้ง RCT Labs และผู้ออกแบบภาพรวม constitutional AI, roadmap สาธารณะ และแนวทางการใช้งานระดับองค์กรของแพลตฟอร์ม",
    },
    expertise: ["constitutional AI", "platform architecture", "enterprise AI governance", "AI operating systems"],
    sameAs: [
      "https://www.linkedin.com/in/ittirit-saengow/",
      "https://github.com/rctlabs",
    ],
    profileType: "person",
  },
  {
    id: "rct-research-desk",
    name: "RCT Labs Research Desk",
    role: {
      en: "Editorial and Research Team",
      th: "ทีมบรรณาธิการและวิจัย",
    },
    bio: {
      en: "Organization-backed research desk synthesizing external frameworks, public-safe technical analysis, and buyer-facing evaluation guidance for RCT Labs.",
      th: "ทีมวิจัยที่สังเคราะห์กรอบภายนอก การวิเคราะห์เชิงเทคนิคแบบ public-safe และแนวทางการประเมินสำหรับผู้ซื้อของ RCT Labs",
    },
    expertise: ["AI governance", "editorial review", "benchmark framing", "enterprise evaluation"],
    sameAs: [
      "https://rctlabs.co/research",
      "https://rctlabs.co/company/press",
    ],
    profileType: "organization",
  },
  {
    id: "alex-patel",
    name: "Dr. Alex Patel",
    role: {
      en: "Contributing Research Author",
      th: "ผู้เขียนงานวิจัยร่วม",
    },
    bio: {
      en: "Contributing author focused on intent systems, JITNA framing, and early conceptual material in the RCT Labs blog library.",
      th: "ผู้เขียนร่วมที่เน้นด้าน intent systems, กรอบคิด JITNA และบทความแนวคิดช่วงต้นของคลังความรู้ RCT Labs",
    },
    expertise: ["JITNA", "intent systems", "AI language design"],
    profileType: "person",
  },
  {
    id: "sarah-chen",
    name: "Dr. Sarah Chen",
    role: {
      en: "Research Contributor",
      th: "ผู้ร่วมเขียนงานวิจัย",
    },
    bio: {
      en: "Research contributor focused on intent operations, conceptual framing, and enterprise interpretation of RCT methods.",
      th: "ผู้ร่วมเขียนที่เน้น intent operations กรอบแนวคิด และการตีความ RCT methods ในบริบทธุรกิจ",
    },
    expertise: ["intent operations", "AI strategy", "conceptual models"],
    profileType: "person",
  },
  {
    id: "james-wilson",
    name: "Prof. James Wilson",
    role: {
      en: "Methodology Contributor",
      th: "ผู้ร่วมพัฒนาด้านวิธีวิทยา",
    },
    bio: {
      en: "Methodology contributor for research-process explanations and structured evaluation guidance in the RCT content library.",
      th: "ผู้ร่วมพัฒนาด้านวิธีวิทยาสำหรับบทความอธิบาย research process และแนวทางการประเมินอย่างเป็นระบบในคลังเนื้อหา RCT",
    },
    expertise: ["research methodology", "evaluation", "process design"],
    profileType: "person",
  },
]

const authorById = new Map(authorProfiles.map((profile) => [profile.id, profile]))
const authorIdByName = new Map(authorProfiles.map((profile) => [profile.name, profile.id]))

export function getAuthorProfileById(id?: string | null) {
  if (!id) return null
  return authorById.get(id) ?? null
}

export function getAuthorProfileByName(name?: string | null) {
  if (!name) return null
  const id = authorIdByName.get(name)
  if (!id) return null
  return getAuthorProfileById(id)
}

export function getAllAuthorProfiles() {
  return authorProfiles
}