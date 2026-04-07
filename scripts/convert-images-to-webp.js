#!/usr/bin/env node
/**
 * convert-images-to-webp.js
 * Converts all PNG/JPG images in public/images/ to WebP using sharp.
 * Keeps originals as fallback. Skips files that already have a WebP counterpart.
 *
 * Usage: node scripts/convert-images-to-webp.js
 */

const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const PUBLIC_DIR = path.join(__dirname, '..', 'public')
const IMAGE_DIR = path.join(PUBLIC_DIR, 'images')

// Files to SKIP (favicon, apple-icon, system PNGs that must stay as PNG)
const SKIP_PATTERNS = [
  /apple-icon/,
  /icon-light/,
  /icon-dark/,
  /placeholder-logo/,
  /RCTmascot-test/,    // test folder — not production
  /proposed/,          // proposed assets — not in use
  /8bit-/,             // legacy non-cleaned originals
]

function shouldSkip(filePath) {
  return SKIP_PATTERNS.some(p => p.test(filePath))
}

function getAllFiles(dir, exts = ['.png', '.jpg', '.jpeg']) {
  const result = []
  if (!fs.existsSync(dir)) return result

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      result.push(...getAllFiles(full, exts))
    } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
      result.push(full)
    }
  }
  return result
}

async function convertToWebP(srcPath) {
  const ext = path.extname(srcPath).toLowerCase()
  const webpPath = srcPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp')

  // Skip if WebP already exists and is newer than source
  if (fs.existsSync(webpPath)) {
    const srcMtime = fs.statSync(srcPath).mtimeMs
    const webpMtime = fs.statSync(webpPath).mtimeMs
    if (webpMtime >= srcMtime) {
      return { path: webpPath, status: 'skipped' }
    }
  }

  const originalSize = fs.statSync(srcPath).size
  
  await sharp(srcPath)
    .webp({ quality: 90, effort: 6 })
    .toFile(webpPath)

  const newSize = fs.statSync(webpPath).size
  const savings = Math.round((1 - newSize / originalSize) * 100)
  
  return { 
    path: webpPath, 
    status: 'converted',
    originalSize: Math.round(originalSize / 1024),
    newSize: Math.round(newSize / 1024),
    savings,
  }
}

async function main() {
  console.log('🔄 Converting images to WebP...\n')
  
  const files = getAllFiles(IMAGE_DIR)
  const eligible = files.filter(f => !shouldSkip(f))
  
  console.log(`Found ${files.length} image(s), ${eligible.length} eligible for conversion.\n`)
  
  let converted = 0
  let skipped = 0
  let errors = 0
  let totalSavingsKB = 0

  for (const file of eligible) {
    const rel = path.relative(PUBLIC_DIR, file)
    try {
      const result = await convertToWebP(file)
      if (result.status === 'converted') {
        console.log(`✅ ${rel}`)
        console.log(`   ${result.originalSize}KB → ${result.newSize}KB  (-${result.savings}%)`)
        converted++
        totalSavingsKB += (result.originalSize - result.newSize)
      } else {
        console.log(`⏭  ${rel} (WebP up-to-date)`)
        skipped++
      }
    } catch (err) {
      console.error(`❌ ${rel}: ${err.message}`)
      errors++
    }
  }

  console.log(`\n📊 Summary:`)
  console.log(`   Converted: ${converted}`)
  console.log(`   Skipped:   ${skipped}`)
  console.log(`   Errors:    ${errors}`)
  console.log(`   Total savings: ~${totalSavingsKB}KB`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
