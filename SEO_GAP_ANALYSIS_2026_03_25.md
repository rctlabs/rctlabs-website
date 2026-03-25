# SEO Gap Analysis 2026-03-25

## Scope

This audit maps the current public marketing site against the publish priorities shown in the reference image:

- SEO on-page
- Off-page
- Content / articles
- E-E-A-T
- AEO
- AIO / AI search

## Current Technical Strengths

- Next.js metadata, canonical, hreflang, robots, sitemap, and OG image routes are already in place.
- Public trust issues were cleaned up by removing misleading auth and notification UI.
- Search verification tags are now environment-driven instead of hard-coded.
- Key launch funnel forms already work against the backend.
- Several high-cost client components are now lazy-loaded or deferred.
- The Stardew Valley case study now exposes clearer architecture, FAQ, and structured data for retrieval systems.

## Gap Map

### 1. On-Page SEO

Status: Good foundation, still uneven depth.

What is already strong:

- Canonical and alternates exist.
- Metadata and OG paths exist.
- Technical case-study pages now have clearer headings and schema.

What is still missing:

- Several top-level pages still rely on visually strong sections without enough query-matching copy.
- Internal linking between protocols, use cases, research, and solution pages is not yet dense enough.
- Some pages still spend too much page weight on motion instead of indexable explanatory content.

Recommended next changes:

- Add concise answer-first summaries near the top of key landing pages.
- Add related protocol, related use case, and related research link clusters.
- Expand unique intro copy on product, platform, solution, and research pages.

### 2. Off-Page Readiness

Status: Weak inside the codebase because off-page authority is mostly operational, not technical.

Current limitation:

- The site does not yet expose a clear press kit, author profile hub, citation page, or partnership proof page that external publishers can reference.

Recommended next changes:

- Create a press and brand page.
- Create founder / team authority pages with project history and credentials.
- Publish a citation-ready research references page for outreach and backlinking.

### 3. Content and Article Depth

Status: Medium.

What exists:

- Strong protocol and technical positioning.
- Good conceptual differentiation.

What is missing:

- There are not yet enough long-form, query-oriented pages answering evaluative questions buyers and AI systems ask.
- The site needs more pages that target concrete intents such as What is FDIA, How does JITNA compare to agent orchestration, How does RCT integrate with existing systems, and What makes deterministic agents auditable.

Recommended next changes:

- Publish a knowledge cluster around FDIA, JITNA, governance, memory, deterministic agents, and game/simulation integration.
- Add comparison pages, glossary pages, and implementation explainers.

### 4. E-E-A-T

Status: Technical expertise is visible, trust proof is still incomplete.

What exists:

- Distinct technical language and system architecture.
- Real implementation details and protocol framing.

What is still weak:

- Limited explicit author identity on technical pages.
- Limited who built this and why this is credible proof.
- Limited external trust cues such as case-study evidence, testing summaries, and implementation history pages.

Recommended next changes:

- Add author blocks and editorial ownership to research and protocol pages.
- Publish an engineering validation page with benchmarks, testing approach, and architecture decisions.
- Add company/about content that ties the work to named builders, not just the brand.

### 5. AEO

Status: Improving, not complete.

What exists:

- FAQ schema helpers already exist.
- The revised case-study page now answers direct technical questions.

What is still missing:

- Not enough pages use explicit question-answer blocks.
- Some landing pages are still optimized for narrative flow instead of answer extraction.

Recommended next changes:

- Add short FAQ sections to solution, platform, protocol, and whitepaper-adjacent pages.
- Lead pages with one-sentence definitions and one-paragraph summaries.
- Ensure every important topic has a page that answers one dominant query clearly.

### 6. AIO / AI Search

Status: Good trajectory, still early.

What exists:

- Structured metadata foundation.
- Distinct vocabulary that is not generic SaaS copy.
- Technical nouns, formulas, and protocol names that are easy to retrieve.

What is still missing:

- More cross-linked entity pages are needed so AI systems can connect protocols, case studies, industries, and system claims.
- More evidence pages are needed to support factual retrieval.
- Some content is still too animation-heavy relative to its factual density.

Recommended next changes:

- Add entity pages for FDIA, JITNA, RCT Kernel, Intent Profiles, Governance Layer, and Memory Architecture.
- Add evidence blocks with metrics, constraints, test counts, and implementation boundaries.
- Keep reducing non-essential client JS on content-heavy pages.

## Priority Before Publish

1. Finish performance pass on remaining high-hydration marketing pages.
2. Add answer-first blocks and FAQ coverage to the highest-value landing pages.
3. Add internal link clusters between protocols, use cases, whitepaper, research, and solutions.
4. Publish at least one authority page for team or research credibility.
5. Run Lighthouse repeatedly in CI and use the reports to remove remaining regressions.

## Immediate Wins Already Landed In This Pass

- FDIA calculator was isolated into a lazy client island.
- FDIA infographic disclosure was simplified to native details/summary.
- Stardew Valley case study was converted into a server-rendered, structured, FAQ-backed page.
- Lighthouse CI workflow was added so browser-based audits can run in GitHub Actions.
