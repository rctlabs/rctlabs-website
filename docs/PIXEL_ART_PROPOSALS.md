# Pixel Art Proposals

These assets were created as proposal-only additions based on the requirements in `lib/pixel-art-governance.md`.

## Status

- Generated and saved under `public/images/pixel/proposed/`
- Not wired into `lib/pixel-icons.ts`
- Not used by any page or component yet

## Proposed Assets

1. `gear-matrix.png`
   - Intent: represent routing, algorithms, and HexaCore infrastructure
   - Suggested placements: core-systems cards, algorithms overviews, orchestration modules
2. `scroll-constitution.png`
   - Intent: represent Signed AI, governance, constraints, and constitutional logic
   - Suggested placements: Signed AI product pages, policy cards, FDIA principle callouts
3. `vector-node.png`
   - Intent: represent delta memory pathways, retrieval edges, and graph-like state transitions
   - Suggested placements: delta memory sections, retrieval cards, architecture maps

## Generation Notes

- Canvas size: `128x128`
- Rendering style: transparent PNG, 16x16 pixel grid scaled to `128x128`
- Generator: `scripts/generate_proposed_pixel_assets.py`
- Palette direction: warm amber, sage, terracotta, and blue accents aligned with the site token family

## Review Guidance

- Keep production usage within the existing `32x32` or `40x40` presentation bounds
- Avoid hero backgrounds and dense CTA buttons per governance rules
- Apply only after confirming the icon-to-surface mapping for the target sections