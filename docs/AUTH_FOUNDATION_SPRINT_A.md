# Sprint A Auth Foundation

## Current State
- Public marketing site is live-first.
- `lib/supabase.ts` currently exposes only an admin-only service client for form ingestion.
- `proxy.ts` blocks internal route prefixes in production, but this is not session-aware auth.
- `components/user-profile-menu.tsx` is still a shell with placeholder authenticated behavior.

## Foundation Added In This Pass
- `lib/auth/config.ts`
  - centralizes Supabase env selection for browser, server, and admin runtimes.
- `lib/auth/browser-client.ts`
  - defines the future browser entry point for session-aware Supabase auth.
- `lib/auth/server-client.ts`
  - defines the future request-side entry point for protected route loaders and route handlers.
- `lib/auth/policy.ts`
  - defines protected route groups and role expectations in one place.
- `proxy.ts`
  - can now consume shared route policy instead of hardcoding prefix logic.

## Intended Architecture
1. Browser auth client
   - Sign in, sign out, session refresh, auth callbacks.
   - Used by member-facing UI and gated application shells.
2. Server auth client
   - Reads request context and verifies user/session before rendering protected pages.
   - Used by server components, route handlers, and middleware handoff.
3. Admin client
   - Remains isolated to privileged backend tasks like form ingestion, background jobs, and operational writes.
   - Must never be imported into client components.

## Route Model
- Public:
  - Marketing pages, docs, benchmark, whitepapers, contact forms.
- Member:
  - `/test-console`, `/websocket`
- Admin:
  - `/admin`, `/monitor`, `/analytics`
- Owner:
  - `/owner`

## Next Integration Steps
1. Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` to all environments.
2. Introduce session cookie handling with `@supabase/ssr` or an equivalent request-bound auth adapter.
3. Replace the current proxy block-only behavior with role-aware middleware checks.
4. Wire `components/user-profile-menu.tsx` to real session state.
5. Add dedicated sign-in, auth callback, and sign-out routes.
6. Move protected dashboards onto explicit role checks instead of prefix-only hiding.

## Guardrails
- Never expose `SUPABASE_SERVICE_KEY` outside server-only modules.
- Keep marketing funnel APIs separated from member auth flows.
- Treat route protection and navigation state as separate concerns: hidden navigation is not authorization.
