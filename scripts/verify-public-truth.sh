#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-3010}"
BASE_URL="http://127.0.0.1:${PORT}"
SERVER_PID=""

ROUTES=(
  "/en/platform"
  "/en/docs"
  "/en/research"
  "/en/company"
  "/en/company/press"
  "/en/pricing"
  "/en/solutions"
  "/en/architecture"
  "/en/integration"
)

SOURCE_SCAN_TARGETS=(app components content messages lib)

STALE_PATTERN='99\.98%|v5\.4\.5|4,849|62 microservices|Production v[0-9]+\.[0-9]+\.[0-9]+'

cleanup() {
  if [[ -n "${SERVER_PID}" ]] && kill -0 "${SERVER_PID}" 2>/dev/null; then
    kill "${SERVER_PID}" >/dev/null 2>&1 || true
    wait "${SERVER_PID}" 2>/dev/null || true
  fi
}

trap cleanup EXIT

cd "${ROOT_DIR}"

echo "[verify:public] Building production bundle"
npm run build >/dev/null

echo "[verify:public] Restarting local preview on port ${PORT}"
fuser -k "${PORT}/tcp" >/dev/null 2>&1 || true
npm run start:host >/tmp/rctlabs-verify-public.log 2>&1 &
SERVER_PID=$!

for _ in {1..40}; do
  if curl -s -o /dev/null "${BASE_URL}/en/platform"; then
    break
  fi
  sleep 1
done

if ! curl -s -o /dev/null "${BASE_URL}/en/platform"; then
  echo "[verify:public] Preview server failed to start"
  cat /tmp/rctlabs-verify-public.log
  exit 1
fi

echo "[verify:public] Route health"
for route in "${ROUTES[@]}"; do
  code="$(curl -s -o /dev/null -w '%{http_code}' "${BASE_URL}${route}")"
  printf '  %s %s\n' "${route}" "${code}"
  if [[ "${code}" != "200" ]]; then
    echo "[verify:public] Route health check failed for ${route}"
    exit 1
  fi
done

echo "[verify:public] Token scan"
for route in "${ROUTES[@]}"; do
  matches="$(curl -sSf "${BASE_URL}${route}?ts=$(date +%s)" | grep -Eo "${STALE_PATTERN}" || true)"
  if [[ -n "${matches}" ]]; then
    printf '  %s STALE %s\n' "${route}" "$(echo "${matches}" | tr '\n' ' ' | sed 's/[[:space:]]\+$//')"
    exit 1
  fi
  printf '  %s CLEAN\n' "${route}"
done

echo "[verify:public] Source scan"
source_matches="$(grep -REn "${STALE_PATTERN}" "${SOURCE_SCAN_TARGETS[@]}" || true)"
if [[ -n "${source_matches}" ]]; then
  echo "${source_matches}"
  echo "[verify:public] Source scan found stale tokens"
  exit 1
fi

echo "[verify:public] All checks passed"