# Navbar UX Blueprint

## Direction

This blueprint translates the public UX principles observable on mistral.ai into an RCT-specific navigation system.

The goal is not to clone Mistral's implementation. The goal is to adopt the same discipline:

- keep the top-level navigation light
- make CTA intent clear
- move depth into guided panels instead of dense dropdown walls
- make mobile navigation a drill-down system instead of a compressed desktop clone

## Phase 1: Information Architecture

### Primary navigation

The header is reduced to five top-level groups:

1. Products
2. Solutions
3. Technology
4. Resources
5. Company

### Secondary navigation

Secondary links remain inside each group panel:

- Solutions: hallucination prevention, memory, routing
- Products: platform surfaces, pricing, product variants
- Technology: architecture, algorithms, benchmark, protocols, demo
- Company: about, press, FAQ, contact

### Utility navigation

Utility actions are intentionally separated from browse actions:

- search
- locale switcher
- theme toggle
- CTA and contact via user profile menu

### Task-based resource model

Resources are grouped by user jobs instead of by content type wall:

1. Learn
2. Validate
3. Evaluate
4. Build
5. Track
6. Adopt

Each track only reveals the items needed for that task. This keeps first-scan complexity low while preserving the depth of the resource ecosystem.

## Phase 2: UX Wireframe

### Desktop header

- brand on the left
- five primary groups centered
- utility actions and CTA on the right
- translucent fixed header with restrained active state

### Desktop resources panel

- left rail shows resource tasks
- right detail panel shows only the selected task
- one active task at a time
- task switch via hover, focus, or click

### Mobile drawer level 1

- top-level groups only
- each group presented as a single card row with summary
- no nested accordion wall on first open

### Mobile resources level 2

- separate resources view
- task list first
- selected task detail below
- this keeps resource density out of the root drawer view

### CTA and utility behavior

- search is accessible on desktop and mobile
- locale switch is always visible as a compact segmented control
- theme toggle remains available but no longer competes with core browse flows
- CTA remains in the user profile menu area

## Phase 3: Visual System

### Spacing scale

- top-level trigger height: 44px minimum
- dropdown outer radius: 28px
- nav card radius: 20px to 24px
- panel padding: 20px on desktop, 16px on mobile

### Typography scale

- trigger label: 13px medium
- eyebrow label: 11px uppercase with tracking
- helper copy: 14px to 15px with generous line-height
- primary panel title: 24px semibold

### State colors

- warm amber reserved for active accent and eyebrow markers
- active route background uses a low-contrast sand or dark-surface tint
- hover states stay subtle and functional

### Overlay and backdrop

- header uses blur and controlled translucency
- dropdown panels use one continuous surface instead of many equal-weight cards

### Dropdown envelope system

- every desktop dropdown fits one of three envelope tiers: S, M, or L
- panels align semantically using start, center, or end anchors instead of one-off translate offsets
- panel height is capped so dropdowns stay preview surfaces rather than expanding content containers
- long copy is trimmed with line clamps before panels are allowed to grow

### Group-specific desktop envelopes

- Solutions: tier M, start aligned, compact feature rail, single list column
- Products: tier M, start aligned, compact feature rail, single list column
- Technology: tier L, center aligned, compact feature rail, two list columns
- Resources: tier L, center aligned, bounded task/detail panel with compressed supporting copy
- Company: tier S, end aligned, compact feature rail, single list column

### Motion rules

- dropdown enter and exit under 180ms
- small translate plus fade
- no ornamental motion

## Phase 4: Component Architecture

### Nav config layer

Implemented in [lib/navigation.ts](../lib/navigation.ts)

- centralizes group definitions
- centralizes resource tracks
- centralizes localized copy
- generates search index data

### DesktopNav

Implemented in [components/navigation/desktop-nav.tsx](../components/navigation/desktop-nav.tsx)

- renders top-level groups
- renders standard dropdown panels using config-driven envelope tiers and alignment
- renders guided resources panel
- keeps all links available while reducing visual density through description budgeting

### ResourcesPanel

Implemented in [components/navigation/resources-panel.tsx](../components/navigation/resources-panel.tsx)

- left rail of tasks
- right detail panel
- tab-like keyboard-friendly structure
- hard max height with compact item budgets and clamped supporting copy

### MobileNavDrawer

Implemented in [components/navigation/mobile-nav-drawer.tsx](../components/navigation/mobile-nav-drawer.tsx)

- root-level group list
- separate group detail views
- separate resources task view

### UtilityActions

Implemented in [components/navigation/utility-actions.tsx](../components/navigation/utility-actions.tsx)

- search
- locale segmented control
- theme toggle
- desktop CTA surface

### Analytics hooks

Implemented in [components/navigation/use-nav-analytics.ts](../components/navigation/use-nav-analytics.ts)

- group open events
- leaf click events
- resource task selection events
- utility action events

## Phase 5: Validation Checklist

### Keyboard navigation

- focus can open desktop groups
- resource task buttons expose tab semantics
- escape closes active overlays

### Bilingual truncation

- labels kept short at config level
- helper text constrained to one or two concise lines in cards
- Thai and English supporting copy must compress before layout expands

### Touch target sizing

- all mobile actions use 44px+ minimum touch target

### Breakpoint behavior

- desktop navigation starts at large screens
- mobile drawer handles all smaller breakpoints

### Click analytics

- event surfaces added for group open, leaf click, task switch, and utility actions

### Route discoverability tests

- each task path maps to a focused set of links
- current route keeps the matching resource task selected
- compact desktop panels must preserve direct access to every leaf link

## Final Recommendation

The final direction for RCT should remain:

1. use the restraint and navigational discipline seen on Mistral
2. preserve RCT's task-based resource taxonomy
3. replace taxonomy-wall presentation with a guided panel
4. treat the header as a navigation system, not as a mini content page
5. make mobile a true drill-down experience, not a compressed desktop replica

This direction keeps RCT's depth intact while materially improving first-scan UX.
