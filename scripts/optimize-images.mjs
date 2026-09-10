import { readdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('../public/images', import.meta.url).pathname
const APP = new URL('../app', import.meta.url).pathname

const SKIP = new Set([
  'logo/favicon.png',
  'og.jpg'
])

function maxWidthFor(rel) {
  if (rel.startsWith('photos/') || rel.startsWith('team/')) return 1600
  if (rel === 'logo/mri-2026.png') return 512
  if (rel === 'logo/mri-blanc.png') return 360
  if (rel.startsWith('members/') || rel.startsWith('partners/') || rel.startsWith('logo/')) return 400
  return 1600
}

function isPhotoPng(rel) {
  return rel.startsWith('photos/') || rel.startsWith('team/')
}

async function walk(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, acc)
    else acc.push(full)
  }
  return acc
}

async function replaceInTree(dir, from, to) {
  let hits = 0
  const files = await walk(dir)
  for (const file of files) {
    if (!/\.(ts|vue|js|md|json)$/.test(file)) continue
    const before = await readFile(file, 'utf8')
    if (!before.includes(from)) continue
    await writeFile(file, before.split(from).join(to))
    hits++
  }
  return hits
}

const files = (await walk(ROOT)).filter((f) =>
  /\.(png|jpe?g|webp|bmp)$/i.test(f)
)

let saved = 0
const renamed = []

for (const file of files) {
  const rel = relative(ROOT, file).replaceAll('\\', '/')
  if (SKIP.has(rel) || rel.endsWith('/og.jpg')) continue

  const ext = extname(file).toLowerCase()
  if (ext === '.bmp') continue
  const before = (await readFile(file)).byteLength
  const maxW = maxWidthFor(rel)

  try {
    const img = sharp(file, { failOn: 'none' }).rotate()
    const meta = await img.metadata()
    if (ext === '.png' && isPhotoPng(rel)) {
      const out = file.replace(/\.png$/i, '.jpg')
      const buf = await img
        .resize({ width: maxW, withoutEnlargement: true })
        .flatten({ background: '#ffffff' })
        .toColorspace('srgb')
        .jpeg({ quality: 78, mozjpeg: true, progressive: true })
        .toBuffer()
      await writeFile(out, buf)
      await unlink(file)
      const from = `/images/${rel}`
      const to = `/images/${rel.replace(/\.png$/i, '.jpg')}`
      const hits = await replaceInTree(APP, from, to)
      renamed.push({ from, to, hits, before, after: buf.byteLength })
      saved += before - buf.byteLength
      continue
    }

    let pipeline = img.resize({ width: maxW, withoutEnlargement: true }).toColorspace('srgb')
    let buf
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.bmp') {
      buf = await pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true }).toBuffer()
    } else if (ext === '.webp') {
      buf = await pipeline.webp({ quality: 78 }).toBuffer()
    } else {
      buf = await pipeline.png({ compressionLevel: 9, quality: 80, effort: 10 }).toBuffer()
    }

    if (buf.byteLength >= before && (meta.width || 0) <= maxW && ext !== '.bmp') continue
    const dest = ext === '.bmp' ? file.replace(/\.bmp$/i, '.jpg') : file
    await writeFile(dest, buf)
    if (dest !== file) await unlink(file)
    saved += before - buf.byteLength
    console.log(
      `${(before / 1024).toFixed(1).padStart(8)} → ${(buf.byteLength / 1024).toFixed(1).padStart(7)} KB  ${rel}${dest !== file ? ' (→ jpg)' : ''}`
    )
  } catch (err) {
    console.error('skip', rel, err.message)
  }
}

console.log('\nPNG photos converted to JPEG:')
for (const r of renamed) {
  console.log(
    `  ${r.from} → ${r.to}  ${(r.before / 1024).toFixed(0)}→${(r.after / 1024).toFixed(0)} KB  (${r.hits} files)`
  )
}
console.log(`\nSaved ${(saved / 1024 / 1024).toFixed(2)} MB`)
