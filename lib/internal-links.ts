export type InternalLink = {
  href: string
  label: string
  labelTh?: string
  description?: string
  descriptionTh?: string
}

export const PROTOCOL_LINKS: InternalLink[] = [
  {
    href: "/solutions",
    label: "Enterprise AI Solutions",
    labelTh: "โซลูชัน AI สำหรับองค์กร",
    description: "See how RCT protocols translate into production solutions.",
    descriptionTh: "ดูว่า RCT protocols แปลงเป็นโซลูชันระดับ production อย่างไร",
  },
  {
    href: "/research",
    label: "Research & Publications",
    labelTh: "งานวิจัยและสิ่งพิมพ์",
    description: "Peer into the published research behind the protocols.",
    descriptionTh: "เข้าถึงงานวิจัยที่ตีพิมพ์เบื้องหลัง protocols",
  },
  {
    href: "/architecture",
    label: "10-Layer Architecture",
    labelTh: "สถาปัตยกรรม 10 ชั้น",
    description: "Understand where each protocol fits in the full stack.",
    descriptionTh: "ทำความเข้าใจว่า protocol แต่ละตัวอยู่ที่ใดใน full stack",
  },
]

export const SOLUTION_LINKS: InternalLink[] = [
  {
    href: "/protocols",
    label: "Protocol Specifications",
    labelTh: "ข้อกำหนด Protocol",
    description: "Explore the technical protocols that power each solution.",
    descriptionTh: "สำรวจ protocols ทางเทคนิคที่ขับเคลื่อนแต่ละโซลูชัน",
  },
  {
    href: "/architecture",
    label: "10-Layer Architecture",
    labelTh: "สถาปัตยกรรม 10 ชั้น",
    description: "See the architectural foundation beneath each solution.",
    descriptionTh: "ดูรากฐานสถาปัตยกรรมเบื้องหลังแต่ละโซลูชัน",
  },
  {
    href: "/pricing",
    label: "Pricing & Plans",
    labelTh: "ราคาและแผน",
    description: "Get custom enterprise pricing for your deployment.",
    descriptionTh: "รับราคาสำหรับองค์กรแบบกำหนดเองสำหรับการ deploy ของคุณ",
  },
]

export const RESEARCH_LINKS: InternalLink[] = [
  {
    href: "/protocols",
    label: "Protocol Specifications",
    labelTh: "ข้อกำหนด Protocol",
    description: "The technical specifications backing our research claims.",
    descriptionTh: "ข้อกำหนดทางเทคนิคที่รองรับข้ออ้างงานวิจัยของเรา",
  },
  {
    href: "/whitepaper",
    label: "Whitepaper",
    labelTh: "เอกสาร Whitepaper",
    description: "Download the full architectural whitepaper.",
    descriptionTh: "ดาวน์โหลด whitepaper สถาปัตยกรรมฉบับสมบูรณ์",
  },
  {
    href: "/benchmark-summary",
    label: "Benchmark Summary",
    labelTh: "สรุป Benchmark",
    description: "Review the benchmark data and evaluation methodology.",
    descriptionTh: "ทบทวนข้อมูล benchmark และวิธีการประเมิน",
  },
]

export const ARCHITECTURE_LINKS: InternalLink[] = [
  {
    href: "/fdia",
    label: "FDIA Equation",
    labelTh: "สมการ FDIA",
    description: "The governing equation behind the architecture.",
    descriptionTh: "สมการหลักเบื้องหลังสถาปัตยกรรม",
  },
  {
    href: "/protocols/jitna-rfc-001",
    label: "JITNA Protocol RFC-001",
    labelTh: "JITNA Protocol RFC-001",
    description: "Just-In-Time Network Architecture specification.",
    descriptionTh: "ข้อกำหนด Just-In-Time Network Architecture",
  },
  {
    href: "/core-systems",
    label: "Core Systems",
    labelTh: "ระบบหลัก",
    description: "HexaCore, Intent Loop, Analysearch, and Delta Memory.",
    descriptionTh: "HexaCore, Intent Loop, Analysearch และ Delta Memory",
  },
]
