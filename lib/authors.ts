export type AuthorProfile = {
  id: string
  name: string
  nameLocal?: string
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
  isSoleDeveloper?: boolean
  foundingYear?: string
}

export const authorProfiles: AuthorProfile[] = [
  {
    id: "ittirit-saengow",
    name: "Ittirit Saengow",
    nameLocal: "อิทธิฤทธิ์ แซ่โง้ว",
    role: {
      en: "Founder and Architect, RCT Labs",
      th: "ผู้ก่อตั้งและสถาปนิกระบบ, RCT Labs",
    },
    bio: {
      en: "Ittirit Saengow (อิทธิฤทธิ์ แซ่โง้ว) is the founder, sole developer, and primary author of RCT Labs — a constitutional AI operating system platform built independently from architecture through publication. He conceived and developed the FDIA equation (F = (D^I) × A), the JITNA protocol specification (RFC-001), the 10-layer architecture, the 7-Genome system, and the RCT-7 process framework. The full platform — including bilingual infrastructure, enterprise SEO systems, 62 microservices, 41 production algorithms, and all published research — was built as a solo project in Bangkok, Thailand.",
      th: "อิทธิฤทธิ์ แซ่โง้ว คือผู้ก่อตั้ง นักพัฒนาเพียงคนเดียว และผู้เขียนหลักของ RCT Labs — แพลตฟอร์มระบบปฏิบัติการ AI แบบ constitutional ที่สร้างขึ้นอย่างอิสระตั้งแต่สถาปัตยกรรมจนถึงการเผยแพร่ เขาคิดค้นสมการ FDIA (F = (D^I) × A) ข้อกำหนดโปรโตคอล JITNA (RFC-001) สถาปัตยกรรม 10 ชั้น ระบบ 7-Genome และกระบวนการ RCT-7 แพลตฟอร์มทั้งหมด ทั้งโครงสร้างสองภาษา ระบบ SEO ระดับองค์กร ไมโครเซอร์วิส 62 ตัว อัลกอริทึม 41 ชุด และงานวิจัยทั้งหมดที่เผยแพร่ สร้างโดยคนเพียงคนเดียวในกรุงเทพฯ ประเทศไทย",
    },
    expertise: [
      "constitutional AI system design",
      "FDIA equation and framework",
      "JITNA protocol specification",
      "enterprise AI governance",
      "full-stack Next.js development",
      "bilingual AI platform architecture",
      "AI operating systems",
      "Thailand enterprise AI deployment",
    ],
    sameAs: [
      "https://www.linkedin.com/in/ittirit-saengow/",
      "https://github.com/ittirit720",
      "https://github.com/rctlabs",
    ],
    profileType: "person",
    isSoleDeveloper: true,
    foundingYear: "2025",
  },
  {
    id: "rct-research-desk",
    name: "RCT Labs Research Desk",
    role: {
      en: "Platform Research and Editorial",
      th: "งานวิจัยและบรรณาธิการของแพลตฟอร์ม",
    },
    bio: {
      en: "The RCT Labs Research Desk is the editorial voice for platform research, protocol documentation, and enterprise evaluation guidance. All content is produced and reviewed by Ittirit Saengow, founder of RCT Labs.",
      th: "RCT Labs Research Desk คือเสียงด้านบรรณาธิการสำหรับงานวิจัย เอกสารโปรโตคอล และแนวทางการประเมินระดับองค์กร เนื้อหาทั้งหมดจัดทำและตรวจทานโดย อิทธิฤทธิ์ แซ่โง้ว ผู้ก่อตั้ง RCT Labs",
    },
    expertise: ["AI governance", "editorial review", "benchmark framing", "enterprise evaluation"],
    sameAs: [
      "https://rctlabs.co/research",
      "https://rctlabs.co/about",
    ],
    profileType: "organization",
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