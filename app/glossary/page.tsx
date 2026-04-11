import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getDefinedTermSchema } from "@/lib/schema"

const glossaryTerms = [
  // ─── Core RCT Concepts ───────────────────────────────────────────
  {
    term: "FDIA Equation",
    termTh: "สมการ FDIA",
    definition: "F = (D^I) × A — A constitutional equation where Future output (F) is determined by Data quality (D) raised to the power of Intent (I), multiplied by Architect authorization (A). When A=0, F=0 always.",
    definitionTh: "F = (D^I) × A — สมการรัฐธรรมนูญที่กำหนดคุณภาพผลลัพธ์ (F) จากคุณภาพข้อมูล (D) ยกกำลัง Intent (I) คูณด้วยการอนุมัติของ Architect (A) เมื่อ A=0 ผลลัพธ์จะเป็นศูนย์เสมอ",
    entityHref: "/en/entity/fdia-equation",
  },
  {
    term: "JITNA Protocol",
    termTh: "โปรโตคอล JITNA",
    definition: "Just In Time Nodal Assembly — an open agent-to-agent communication protocol (RFC-001 v2.0) often called 'the HTTP of Agentic AI.' Defines PROPOSE → COUNTER → ACCEPT negotiation flow with Ed25519 signatures.",
    definitionTh: "Just In Time Nodal Assembly — โปรโตคอลสื่อสารระหว่าง AI Agents แบบ open standard (RFC-001 v2.0) มักเรียกว่า 'HTTP ของ Agentic AI' กำหนด flow PROPOSE → COUNTER → ACCEPT พร้อมลายเซ็น Ed25519",
    entityHref: "/en/entity/jitna-protocol",
  },
  {
    term: "SignedAI",
    termTh: "SignedAI",
    definition: "The multi-LLM consensus verification system of the RCT Ecosystem. Routes critical queries through 4–8 models simultaneously and requires agreement before releasing results. Achieves 0.3% hallucination rate vs 12–15% industry average.",
    definitionTh: "ระบบตรวจสอบ consensus หลาย LLM ของ RCT Ecosystem ส่งคำถามสำคัญผ่าน 4–8 โมเดลพร้อมกัน และต้องการ agreement ก่อนส่งผลลัพธ์ ลด hallucination rate เหลือ 0.3%",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "RCTDB",
    termTh: "RCTDB (ฐานข้อมูลหน่วยความจำ AI)",
    definition: "Universal memory schema with 8 dimensions: query_hash, fdia_scores, subject_uuid, model_chain, consensus_result, delta_chain, timestamp, provenance. Enables PDPA-compliant right to erasure via UUID tombstone pattern.",
    definitionTh: "Schema หน่วยความจำ AI ที่ครอบคลุม 8 มิติ: query_hash, fdia_scores, subject_uuid, model_chain, consensus_result, delta_chain, timestamp, provenance รองรับ right to erasure ตาม PDPA",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "Delta Engine",
    termTh: "Delta Engine (เครื่องยนต์เดลต้า)",
    definition: "Memory compression system that stores only incremental state changes (deltas) rather than full state snapshots. Achieves 74% average lossless compression with sub-1ms reconstruction, enabling warm recall under 50ms.",
    definitionTh: "ระบบบีบอัดหน่วยความจำที่เก็บเฉพาะการเปลี่ยนแปลง (deltas) แทนสถานะเต็ม บีบอัดได้ 74% แบบ lossless พร้อม warm recall ต่ำกว่า 50ms",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "HexaCore",
    termTh: "HexaCore (โครงสร้าง 7 โมเดล AI)",
    definition: "The 7-model AI infrastructure of the RCT Ecosystem: 3 Western models + 3 Eastern models + 1 Thai regional model (Typhoon v2). Provides 3.74x cost reduction vs single-model deployments through intelligent task routing.",
    definitionTh: "โครงสร้าง AI 7 โมเดลของ RCT Ecosystem: โมเดลตะวันตก 3 ตัว + ตะวันออก 3 ตัว + ไทย 1 ตัว (Typhoon v2) ลดต้นทุน 3.74 เท่าด้วย intelligent routing",
    entityHref: "/en/entity/governance-layer",
  },
  // ─── Constitutional AI Concepts ────────────────────────────────
  {
    term: "Constitutional AI",
    termTh: "Constitutional AI (AI แบบรัฐธรรมนูญ)",
    definition: "A governance-oriented approach where model behavior and system operation are shaped by explicit rules, review logic, and safety boundaries rather than by output generation alone.",
    definitionTh: "แนวทางการออกแบบระบบ AI ที่กำหนดพฤติกรรมผ่านกฎ ขอบเขตความปลอดภัย และตรรกะการตรวจทานอย่างชัดเจน",
  },
  {
    term: "Constitutional Kill Switch",
    termTh: "Constitutional Kill Switch (สวิตช์หยุดรัฐธรรมนูญ)",
    definition: "In the RCT Ecosystem, when the FDIA Architect variable (A) is set to 0, all AI output is unconditionally blocked — F=0 regardless of input quality. This is implemented as a hard mathematical gate, not a soft preference.",
    definitionTh: "ในระบบ RCT เมื่อตัวแปร Architect (A) ถูกตั้งเป็น 0 ผลลัพธ์ AI จะถูกบล็อกโดยสมบูรณ์ F=0 เสมอ ไม่ว่าคุณภาพข้อมูลจะเป็นเท่าไร",
    entityHref: "/en/entity/fdia-equation",
  },
  {
    term: "Deterministic AI",
    termTh: "Deterministic AI (AI แบบกำหนดได้แน่นอน)",
    definition: "An AI system property where identical inputs always produce identical outputs, or where safety constraints hold unconditionally regardless of model behavior. In the RCT Ecosystem, constitutional constraints (A=0→F=0) are deterministic.",
    definitionTh: "คุณสมบัติของระบบ AI ที่ input เดิมให้ output เดิม หรือ safety constraints ถูกบังคับใช้โดยไม่มีเงื่อนไข ใน RCT Ecosystem, A=0→F=0 เป็น deterministic",
  },
  {
    term: "Intent Operating System",
    termTh: "Intent Operating System (ระบบปฏิบัติการ Intent)",
    definition: "An AI orchestration layer that functions like an operating system — managing resource allocation (model routing), access control (FDIA gate), state management (RCTDB), and audit trails (provenance). The RCT Ecosystem is an Intent OS.",
    definitionTh: "ชั้น orchestration ของ AI ที่ทำหน้าที่เหมือน OS — จัดการ resource allocation, access control (FDIA), state management (RCTDB), และ audit trails",
  },
  // ─── AI Architecture Concepts ──────────────────────────────────
  {
    term: "Agentic AI",
    termTh: "Agentic AI (AI แบบมีตัวแทน)",
    definition: "AI systems that can autonomously plan, execute, and iterate on multi-step tasks without requiring step-by-step human instruction. Agentic AI requires inter-agent communication standards like JITNA.",
    definitionTh: "ระบบ AI ที่สามารถวางแผน ดำเนินการ และทำซ้ำในงานหลายขั้นตอนได้โดยอัตโนมัติ โดยไม่ต้องการคำสั่งมนุษย์ทีละขั้น",
    entityHref: "/en/entity/jitna-protocol",
  },
  {
    term: "Multi-LLM Consensus",
    termTh: "Multi-LLM Consensus (ฉันทามติหลาย LLM)",
    definition: "The practice of routing a query to multiple LLM providers simultaneously and requiring agreement between outputs before accepting results. Reduces hallucination by catching model-specific biases. Used in SignedAI (Tier 4/6/8).",
    definitionTh: "การส่ง query ไปยัง LLM หลายตัวพร้อมกัน และต้องการ agreement ระหว่างผลลัพธ์ก่อนยอมรับ ลด hallucination โดยตรวจจับ model-specific bias ใช้ใน SignedAI",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "Dynamic Routing",
    termTh: "Dynamic Routing (การจัดเส้นทางแบบพลวัต)",
    definition: "Choosing different model or workflow paths depending on risk, complexity, cost, latency, or evaluation requirements rather than sending every request through the same path.",
    definitionTh: "การเลือกโมเดลหรือ workflow คนละเส้นทางตามระดับความเสี่ยง ความซับซ้อน ต้นทุน latency หรือเงื่อนไขการประเมิน",
  },
  {
    term: "Hallucination Control",
    termTh: "Hallucination Control (การควบคุมการหลอนของ AI)",
    definition: "The system-level discipline of reducing unsupported or overconfident outputs through retrieval quality, memory design, routing, verification, and evaluation loops. RCT achieves 0.3% vs 12–15% industry average.",
    definitionTh: "วินัยระดับระบบในการลดผลลัพธ์ที่ไร้หลักฐานหรือมั่นใจเกินจริง ผ่าน retrieval quality, memory design, routing, verification และ evaluation loops — RCT ทำได้ 0.3%",
  },
  {
    term: "Verification Layer",
    termTh: "Verification Layer (ชั้นการตรวจสอบ)",
    definition: "A step that checks generated outputs against references, policies, rules, schemas, or second-pass evaluators before high-value actions are accepted.",
    definitionTh: "ขั้นตอนที่นำผลลัพธ์ไปตรวจเทียบกับแหล่งอ้างอิง policy rules schemas หรือ evaluator รอบที่สองก่อนยอมรับการใช้งานในงานมูลค่าสูง",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "Intent Operations",
    termTh: "Intent Operations (ปฏิบัติการที่ขับเคลื่อนด้วยเจตนา)",
    definition: "A framing for AI behavior that emphasizes understanding goals, context, and constraints before deciding what actions or outputs should follow.",
    definitionTh: "กรอบคิดสำหรับ AI ที่ให้ความสำคัญกับการเข้าใจเป้าหมาย บริบท และข้อจำกัดก่อนตัดสินใจว่าจะตอบหรือกระทำอะไรต่อ",
  },
  {
    term: "Prompt Injection",
    termTh: "Prompt Injection (การฉีดคำสั่ง)",
    definition: "A security attack where malicious text in user input attempts to override the system's intended behavior. RCT's JITNA Normalizer automatically strips known injection patterns on every request before LLM processing.",
    definitionTh: "การโจมตีที่ใช้ข้อความอันตรายใน input เพื่อ override พฤติกรรมที่ตั้งใจ JITNA Normalizer ของ RCT จะ strip injection patterns ทุกครั้งก่อนประมวลผล",
  },
  {
    term: "Consensus Threshold",
    termTh: "Consensus Threshold (เกณฑ์ฉันทามติ)",
    definition: "The minimum percentage of model agreement required before a SignedAI result is accepted. Tier 4 = 50%, Tier 6 = 67%, Tier 8 = 75%, Tier S = 100%. Higher consensus thresholds are used for higher-stakes decisions.",
    definitionTh: "เปอร์เซ็นต์ขั้นต่ำของ agreement ระหว่างโมเดลก่อนยอมรับผลลัพธ์ใน SignedAI: Tier 4 = 50%, Tier 6 = 67%, Tier 8 = 75%, Tier S = 100%",
    entityHref: "/en/entity/governance-layer",
  },
  // ─── Memory Concepts ───────────────────────────────────────────
  {
    term: "Warm Recall",
    termTh: "Warm Recall (การเรียกคืนแบบอุ่น)",
    definition: "Serving an AI response from the Delta Engine hot-zone semantic cache (similarity threshold 0.95) without calling an LLM. Achieves under 50 milliseconds response time. Only possible for queries semantically similar to cached responses.",
    definitionTh: "การตอบ query จาก hot-zone semantic cache ของ Delta Engine (similarity ≥ 0.95) โดยไม่ต้องเรียก LLM ตอบกลับได้ภายใน 50ms เท่านั้น",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "Cold Start",
    termTh: "Cold Start (การเริ่มต้นแบบเย็น)",
    definition: "A novel AI query that cannot be served from cache and must be fully processed through the LLM pipeline. Cold start time in the RCT Ecosystem is 3–5 seconds, compared to under 50ms for warm recall.",
    definitionTh: "Query ใหม่ที่ไม่พบใน cache และต้องประมวลผลผ่าน LLM pipeline ทั้งหมด Cold start ใน RCT ใช้เวลา 3–5 วินาที เทียบกับ warm recall ที่ต่ำกว่า 50ms",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "UUID Tombstone Pattern",
    termTh: "UUID Tombstone Pattern (รูปแบบ tombstone สำหรับ UUID)",
    definition: "A PDPA-compliant data erasure method where a subject's uuid is marked as 'tombstoned' rather than physically deleted, ensuring no data is retrievable while maintaining referential integrity. Used in RCTDB for right-to-erasure requests.",
    definitionTh: "วิธีลบข้อมูลแบบ PDPA compliant ที่ mark UUID ว่า tombstoned แทนการลบจริง ทำให้ไม่สามารถ retrieve ข้อมูลได้ แต่ยังคง referential integrity ใช้ใน RCTDB",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "Semantic Similarity",
    termTh: "Semantic Similarity (ความคล้ายคลึงทางความหมาย)",
    definition: "A numerical measure (typically 0.0–1.0) of how similar two text inputs are in meaning, regardless of exact wording. The Delta Engine uses a 0.95 similarity threshold to determine if cached responses can be served for new queries.",
    definitionTh: "ตัวเลขวัดความคล้ายของ 2 ข้อความในเชิงความหมาย Delta Engine ใช้ threshold 0.95 เพื่อตัดสินว่า query ใหม่สามารถใช้ผลลัพธ์ที่ cached ไว้ได้",
  },
  {
    term: "Hot Zone",
    termTh: "Hot Zone (โซนร้อน — หน่วยความจำเร็ว)",
    definition: "The fastest-access tier of the RCTDB memory hierarchy. Keeps most-frequently-accessed semantic cache entries in-memory for under 1ms access. Capacity-limited; entries migrate to warm and cold zones based on access frequency.",
    definitionTh: "ชั้นเข้าถึงเร็วที่สุดในลำดับชั้นหน่วยความจำ RCTDB เก็บ semantic cache ที่ใช้บ่อยไว้ใน memory เข้าถึงได้ในเวลาต่ำกว่า 1ms",
    entityHref: "/en/entity/memory-architecture",
  },
  // ─── Testing & Quality Concepts ────────────────────────────────
  {
    term: "Property-Based Testing",
    termTh: "Property-Based Testing (การทดสอบเชิงคุณสมบัติ)",
    definition: "A testing methodology where mathematical properties (invariants) are specified, and a framework like Python Hypothesis automatically generates thousands of test cases to find edge cases that violate those properties.",
    definitionTh: "วิธีทดสอบที่ระบุ mathematical properties (invariants) และ framework เช่น Hypothesis จะสร้าง test cases โดยอัตโนมัติเพื่อหา edge cases",
  },
  {
    term: "Chaos Engineering",
    termTh: "Chaos Engineering (วิศวกรรมความวุ่นวาย)",
    definition: "A testing discipline where controlled failure scenarios (server outage, network partition, service timeout) are deliberately injected into a system to discover failure modes before they occur in production.",
    definitionTh: "วินัยการทดสอบที่จงใจ inject failure scenarios เช่น server outage, network partition เพื่อค้นหา failure modes ก่อนจะเกิดใน production",
  },
  {
    term: "Vibe Testing",
    termTh: "Vibe Testing (การทดสอบแบบรู้สึก)",
    definition: "The informal practice of evaluating an AI system's quality by looking at its outputs and judging whether they 'feel right.' Not sufficient for enterprise AI deployments — formal evaluation harnesses are required.",
    definitionTh: "วิธีประเมินระบบ AI แบบไม่เป็นทางการโดยดูผลลัพธ์แล้วตัดสินว่า 'รู้สึกถูก' ไม่เพียงพอสำหรับ enterprise AI — ต้องใช้ formal evaluation harness",
  },
  {
    term: "Evaluation Harness",
    termTh: "Evaluation Harness (ชุดประเมินอัตโนมัติ)",
    definition: "A systematic, automated set of quality gates that an AI system must pass before deployment. The RCT Ecosystem runs 4,849 tests across 8 levels (Unit, Integration, Service, Contract, Performance, Security, Chaos, Property).",
    definitionTh: "ชุดทดสอบอัตโนมัติที่ระบบ AI ต้องผ่านก่อน deploy RCT Ecosystem รัน 4,849 tests ใน 8 ระดับ (Unit, Integration, Service, Contract, Performance, Security, Chaos, Property)",
  },
  {
    term: "Mathematical Invariant",
    termTh: "Mathematical Invariant (ค่าคงที่ทางคณิตศาสตร์)",
    definition: "A property that must hold unconditionally for all valid inputs, regardless of edge cases. Example: FDIA invariant — when A=0, F must equal exactly 0 for all possible D and I values.",
    definitionTh: "คุณสมบัติที่ต้องถือว่าจริงเสมอสำหรับ input ที่ถูกต้องทั้งหมด ตัวอย่าง: FDIA invariant — เมื่อ A=0, F ต้องเท่ากับ 0 สำหรับ D และ I ทุกค่า",
    entityHref: "/en/entity/fdia-equation",
  },
  // ─── PDPA & Compliance Concepts ────────────────────────────────
  {
    term: "PDPA Section 33",
    termTh: "PDPA มาตรา 33 (สิทธิ์ขอคำอธิบาย)",
    definition: "Thailand's Personal Data Protection Act Section 33 grants data subjects the right to request an explanation of automated decisions made about them. RCT's RCTDB provenance trail (dimension 8) automatically satisfies this requirement.",
    definitionTh: "มาตรา 33 ของ PDPA ไทย ให้สิทธิ์เจ้าของข้อมูลขอคำอธิบายสำหรับการตัดสินใจอัตโนมัติ RCTDB dimension 8 (provenance) ตอบสนองข้อกำหนดนี้โดยอัตโนมัติ",
  },
  {
    term: "PDPA Right to Erasure",
    termTh: "PDPA สิทธิ์ลบข้อมูล",
    definition: "The right of data subjects under PDPA (and GDPR) to request permanent deletion of their personal data. In RCTDB, this is implemented via the UUID tombstone pattern — marking subject data as erased without breaking referential integrity.",
    definitionTh: "สิทธิ์ของเจ้าของข้อมูลตาม PDPA (และ GDPR) ในการขอลบข้อมูลส่วนบุคคลถาวร ใน RCTDB ใช้ UUID tombstone pattern ที่ mark ข้อมูลว่าถูกลบโดยไม่ทำลาย referential integrity",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "Audit Trail",
    termTh: "Audit Trail (เส้นทางการตรวจสอบ)",
    definition: "A chronological record of all AI decisions, with sufficient detail to reconstruct what happened, when, and why. RCTDB's 8-dimensional schema automatically generates audit trails for every RCT Ecosystem query.",
    definitionTh: "บันทึกลำดับเวลาของการตัดสินใจ AI ทั้งหมด พร้อมรายละเอียดเพียงพอสำหรับ reconstruct ว่าเกิดอะไร เมื่อไร และทำไม RCTDB ทำสิ่งนี้โดยอัตโนมัติ",
    entityHref: "/en/entity/memory-architecture",
  },
  // ─── SEO & Authority Concepts ──────────────────────────────────
  {
    term: "E-E-A-T",
    termTh: "E-E-A-T (ประสบการณ์ ความเชี่ยวชาญ อำนาจ ความน่าเชื่อถือ)",
    definition: "Google's quality signal framework: Experience, Expertise, Authoritativeness, Trustworthiness. For AI content, E-E-A-T requires first-hand experience, verifiable credentials, transparent authorship, and fact-checked claims.",
    definitionTh: "กรอบ quality signal ของ Google: Experience, Expertise, Authoritativeness, Trustworthiness สำหรับ AI content ต้องมี first-hand experience, credentials ที่ verify ได้ authorship โปร่งใส และ claim ที่ตรวจสอบแล้ว",
  },
  {
    term: "Topical Authority",
    termTh: "Topical Authority (อำนาจเชิงหัวข้อ)",
    definition: "The degree to which a website is recognized by search engines as a comprehensive, reliable source on a specific subject. Built through content depth, internal linking between related articles, and entity-level structured data.",
    definitionTh: "ระดับที่ search engines ยอมรับ website ว่าเป็นแหล่งความรู้เชิงลึกและน่าเชื่อถือในหัวข้อเฉพาะ สร้างขึ้นผ่าน content depth, internal linking และ entity-level structured data",
  },
  {
    term: "AEO (Answer Engine Optimization)",
    termTh: "AEO (การปรับแต่งสำหรับ Answer Engine)",
    definition: "The practice of structuring content to be selected as direct answers by AI systems (ChatGPT, Perplexity, Google AI Overviews). Requires FAQPage JSON-LD schema, clear question-answer format, and verified factual claims.",
    definitionTh: "การออกแบบเนื้อหาเพื่อให้ถูกเลือกเป็นคำตอบโดย AI systems เช่น ChatGPT, Perplexity, Google AI Overviews ต้องใช้ FAQPage JSON-LD, Q&A format ชัดเจน และ claims ที่ verified",
  },
  {
    term: "FAQPage Schema",
    termTh: "FAQPage Schema (โครงสร้าง schema ถามตอบ)",
    definition: "A JSON-LD structured data format that marks up question-and-answer content with schema.org/FAQPage markup. Eligible for Google Featured Snippets and rich results, significantly improving click-through rates.",
    definitionTh: "รูปแบบ JSON-LD ที่ mark up เนื้อหา Q&A ด้วย schema.org/FAQPage มีสิทธิ์ได้ Google Featured Snippets และ rich results ทำให้ click-through rate เพิ่มขึ้นมาก",
  },
  {
    term: "DefinedTerm Schema",
    termTh: "DefinedTerm Schema (โครงสร้าง schema คำนิยาม)",
    definition: "A JSON-LD structured data type (schema.org/DefinedTerm) used to mark up glossary entries and technical terms. Helps search engines understand proprietary concepts and enables Knowledge Graph entity recognition.",
    definitionTh: "ประเภท JSON-LD (schema.org/DefinedTerm) สำหรับ mark up คำศัพท์และคำนิยามทางเทคนิค ช่วย search engines เข้าใจ proprietary concepts และ Knowledge Graph entity recognition",
  },
  {
    term: "Internal Linking",
    termTh: "Internal Linking (การเชื่อมโยงภายใน)",
    definition: "Hyperlinks between pages on the same website that distribute PageRank, help search engines discover content, and guide users through related topics. High-quality internal links include descriptive anchor text.",
    definitionTh: "ลิงก์ระหว่างหน้าในเว็บเดียวกัน กระจาย PageRank ช่วย search engines ค้นพบเนื้อหา และนำผู้ใช้ผ่านหัวข้อที่เกี่ยวข้อง ลิงก์ที่ดีมี anchor text อธิบายชัดเจน",
  },
  // ─── The 7 Genome System ──────────────────────────────────────
  {
    term: "Architect Genome",
    termTh: "Architect Genome (จีโนมสถาปนิก)",
    definition: "Creator's DNA — the foundational design genome of the RCT 7-Genome System. Encodes the architectural vision and structural patterns of the RCT Ecosystem.",
    definitionTh: "DNA ของผู้สร้าง — genome พื้นฐานของระบบ 7 Genome ของ RCT เข้ารหัสวิสัยทัศน์สถาปนิกและรูปแบบโครงสร้างของ RCT Ecosystem",
  },
  {
    term: "ARTENT Genome",
    termTh: "ARTENT Genome (จีโนมปัญญาการสร้างสรรค์)",
    definition: "Creation intelligence — the generative intelligence genome of the RCT 7-Genome System responsible for creative AI output capabilities.",
    definitionTh: "ปัญญาการสร้างสรรค์ — genome ปัญญาเชิงสร้างสรรค์ของระบบ 7 Genome ของ RCT ดูแลความสามารถในการสร้าง AI output เชิงสร้างสรรค์",
  },
  {
    term: "JITNA Genome",
    termTh: "JITNA Genome (จีโนมชั้น Protocol)",
    definition: "Protocol layer — the communication genome of the RCT 7-Genome System. Implements the JITNA Protocol standard for agent-to-agent communication.",
    definitionTh: "ชั้น Protocol — genome การสื่อสารของระบบ 7 Genome ของ RCT ใช้งาน JITNA Protocol standard สำหรับการสื่อสารระหว่าง agent",
    entityHref: "/en/entity/jitna-protocol",
  },
  {
    term: "Codex Genome",
    termTh: "Codex Genome (จีโนมคลังความรู้)",
    definition: "Knowledge vault — the long-term knowledge store genome of the RCT 7-Genome System. Manages structured knowledge retrieval and organization.",
    definitionTh: "คลังความรู้ — genome เก็บความรู้ระยะยาวของระบบ 7 Genome ของ RCT จัดการการดึงและจัดระเบียบความรู้เชิงโครงสร้าง",
  },
  {
    term: "SignedAI Genome",
    termTh: "SignedAI Genome (จีโนมชั้นการตรวจสอบ)",
    definition: "Verification layer — the trust and consensus genome of the RCT 7-Genome System. Implements multi-model consensus and cryptographic verification of all system outputs.",
    definitionTh: "ชั้นการตรวจสอบ — genome ความไว้วางใจและ consensus ของระบบ 7 Genome ของ RCT ใช้งาน multi-model consensus และการตรวจสอบแบบ cryptographic",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "RCT-KnowledgeVault Genome",
    termTh: "RCT-KnowledgeVault Genome (จีโนมสถาปัตยกรรมหน่วยความจำ)",
    definition: "Memory architecture — the persistent storage genome of the RCT 7-Genome System. Manages the RCTDB schema, Delta Engine compression, and the hot/warm/cold zone memory hierarchy.",
    definitionTh: "สถาปัตยกรรมหน่วยความจำ — genome จัดเก็บข้อมูลถาวรของระบบ 7 Genome ของ RCT จัดการ RCTDB schema, Delta Engine compression และลำดับชั้นหน่วยความจำ",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "RCT-7 Genome",
    termTh: "RCT-7 Genome (จีโนมพัฒนาต่อเนื่อง)",
    definition: "Continuous improvement — the meta-learning genome of the RCT 7-Genome System. Monitors system performance, identifies improvement opportunities, and governs the evolution of the entire ecosystem.",
    definitionTh: "การปรับปรุงต่อเนื่อง — genome meta-learning ของระบบ 7 Genome ของ RCT ตรวจสอบประสิทธิภาพระบบ ระบุโอกาสพัฒนา และกำกับดูแลวิวัฒนาการของ ecosystem ทั้งหมด",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Glossary — Constitutional AI, Routing, Memory, Verification, and Intent Operations",
    "Glossary — Constitutional AI, Routing, Memory, Verification และ Intent Operations",
    "A glossary of the core terms used across the RCT Labs ecosystem, covering constitutional AI, routing, memory, verification, intent operations, and hallucination control.",
    "คลังคำศัพท์ของแนวคิดหลักที่ใช้ในระบบนิเวศ RCT Labs ครอบคลุม constitutional AI, routing, memory, verification, intent operations และ hallucination control",
    "/glossary",
    ["AI glossary", "constitutional AI glossary", "enterprise AI terms"]
  )
}

export default async function GlossaryPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isTh ? "หน้าแรก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: isTh ? "อภิธานศัพท์" : "Glossary", url: `https://rctlabs.co${localePrefix}/glossary` },
  ])

  const definedTermsSchema = glossaryTerms.map((t) =>
    getDefinedTermSchema(isTh ? t.termTh : t.term, isTh ? t.definitionTh : t.definition, `https://rctlabs.co${localePrefix}/glossary#${t.term.toLowerCase().replace(/\s+/g, '-')}`)
  )

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermsSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{isTh ? "อภิธานศัพท์" : "Glossary"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh ? "หน้าคำศัพท์หลักสำหรับอธิบายระบบแนว Ecosystem / OS ของ RCT ให้ค้นหา เข้าใจ และเชื่อมโยงไปยังหน้า authority อื่นได้ง่ายขึ้น" : "A concept hub for the core terms used across the RCT ecosystem, designed to improve discoverability, comprehension, and internal linking."}
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {glossaryTerms.map((entry) => (
            <div key={entry.term} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground">{isTh ? entry.termTh : entry.term}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{isTh ? entry.definitionTh : entry.definition}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "อ่านต่อ" : "Continue exploring"}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/methodology`} className="rounded-full bg-warm-amber/10 px-4 py-2 font-medium text-warm-amber hover:underline">{isTh ? "วิธีวิทยา" : "Methodology"}</Link>
            <Link href={`${localePrefix}/evaluation`} className="rounded-full bg-warm-amber/10 px-4 py-2 font-medium text-warm-amber hover:underline">{isTh ? "ศูนย์กลางการประเมิน" : "Evaluation"}</Link>
            <Link href={`${localePrefix}/architecture`} className="rounded-full bg-warm-amber/10 px-4 py-2 font-medium text-warm-amber hover:underline">{isTh ? "สถาปัตยกรรม" : "Architecture"}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}