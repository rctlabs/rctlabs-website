"use client";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "../../lib/i18n";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";

export default function HallucinationArticlePage() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname) ?? "en";
  const th = locale !== "en";
  // --- TechArticle Schema for SEO ---
  // This schema is injected as a <script type="application/ld+json"> block for rich results
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": th ? "วิธีลด AI Hallucination" : "How to Reduce AI Hallucination",
    "description": th
      ? "คู่มือทีละขั้นตอนสำหรับการลด AI Hallucination ใน LLMs ด้วยสมการ FDIA และ memory พร้อมกลยุทธ์ ประเมินความเสี่ยง และการทดสอบต่อเนื่อง"
      : "Step-by-step guide to reducing AI hallucination in production LLMs using the FDIA equation and memory. Practical strategies, risk assessment, and continuous testing.",
    "url": "https://rctlabs.ai/blog/how-to-reduce-ai-hallucination",
    "author": {
      "@type": "Organization",
      "name": "RCT Labs",
      "url": "https://rctlabs.ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "RCT Labs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rctlabs.ai/logo.png"
      }
    }
  };
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main id="main-content" className="min-h-[60vh] bg-warm-sand text-warm-ink py-12 px-4 md:px-0">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-warm-amber">{th ? "วิธีลด AI Hallucination" : "How to Reduce AI Hallucination"}</h1>
          <ol className="list-decimal ml-6 space-y-2 text-base">
            <li>{th ? "วิเคราะห์ประเภท Hallucination ที่เกิดขึ้น" : "Analyze the types of hallucination occurring."}</li>
            <li>{th ? "ใช้สมการ FDIA เพื่อประเมินความเสี่ยง" : "Use the FDIA equation to assess risk."}</li>
            <li>{th ? "เพิ่ม AI memory สำหรับข้อมูลสำคัญ" : "Add AI memory for critical information."}</li>
            <li>{th ? "ทดสอบและวัดผลอย่างต่อเนื่อง" : "Continuously test and measure outcomes."}</li>
            <li>{th ? "ปรับแต่ง prompt และ context ให้เหมาะสม" : "Tune prompts and context appropriately."}</li>
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
