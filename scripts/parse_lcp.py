import json
with open('lighthouse-report4.json', encoding='utf-8') as f:
    r = json.load(f)
audits = r.get('audits', {})
lbd = audits.get('lcp-breakdown-insight', {})
items = lbd.get('details', {}).get('items', [])
print('=== LCP Breakdown Phases ===')
for item in items:
    if isinstance(item, dict) and item.get('type') == 'table':
        for subitem in item.get('items', []):
            label = subitem.get('label','?')
            dur = subitem.get('duration', 0)
            print(f'  {label}: {dur:.0f}ms')
    elif isinstance(item, dict) and 'subpart' in item:
        print(f"  {item.get('label','?')}: {item.get('duration',0):.0f}ms")
    elif isinstance(item, dict) and 'type' in item and item['type'] == 'node':
        print(f"  LCP element: {item.get('snippet','?')[:100]}")
    else:
        print(' ITEM:', str(item)[:200])

# render blocking
rb = audits.get('render-blocking-insight', {})
rb_items = rb.get('details', {}).get('items', [])
print('\n=== Render Blocking Resources ===')
for item in rb_items:
    if isinstance(item, dict):
        url = item.get('url','?')
        ms = item.get('wastedMs', 0)
        kb = item.get('totalBytes', 0) / 1024
        print(f'  {url[-60:]} | {ms:.0f}ms blocked | {kb:.1f}KB')

# unused CSS
uc = audits.get('unused-css-rules', {})
print(f'\nunused-css: score={uc.get("score","?")} savings={uc.get("displayValue","")}')

# total blocking time
tbt = audits.get('total-blocking-time', {})
print(f'TBT: {tbt.get("displayValue","")} score={tbt.get("score","")}')
