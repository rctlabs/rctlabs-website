import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import ProtocolsClient from "./ProtocolsClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Open Protocols",
    "โปรโตคอลเปิด",
    "Open AI protocols by RCT Labs: JITNA RFC-001 multi-LLM communication standard, FDIA Equation (F = D^I × A) mathematical foundation, and RCT-7 Mental Model cognitive architecture.",
    "โปรโตคอล AI เปิดจาก RCT Labs: JITNA RFC-001 มาตรฐานการสื่อสาร Multi-LLM, สมการ FDIA (F = D^I × A) และ RCT-7 Mental Model สถาปัตยกรรมทางปัญญา",
    "/protocols",
    ["JITNA RFC-001", "FDIA equation", "RCT-7 mental model", "open AI protocols", "multi-LLM communication"]
  )
}

export default function ProtocolsPage() {
  return <ProtocolsClient />
}
