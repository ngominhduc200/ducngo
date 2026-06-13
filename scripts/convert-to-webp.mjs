import sharp from 'sharp'
import { readdir, unlink, readFile, writeFile } from 'fs/promises'
import { join, extname, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const IMG_DIR = join(ROOT, 'public/images')

const EXTS = new Set(['.png', '.jpg', '.jpeg'])
const QUALITY = 82

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...await walk(full))
    else if (EXTS.has(extname(e.name).toLowerCase())) files.push(full)
  }
  return files
}

async function convertImages() {
  const files = await walk(IMG_DIR)
  console.log(`Found ${files.length} images to convert\n`)

  const renames = [] // { from: '/images/foo.png', to: '/images/foo.webp' }

  for (const file of files) {
    const ext = extname(file).toLowerCase()
    const webpPath = file.slice(0, -ext.length) + '.webp'
    const rel = file.replace(join(ROOT, 'public'), '')
    const relWebp = webpPath.replace(join(ROOT, 'public'), '')

    try {
      await sharp(file).webp({ quality: QUALITY }).toFile(webpPath)
      const origSize = (await import('fs')).statSync(file).size
      const webpSize = (await import('fs')).statSync(webpPath).size
      const saved = Math.round((1 - webpSize / origSize) * 100)
      console.log(`✓ ${basename(file)} → ${basename(webpPath)}  (${saved}% smaller)`)
      await unlink(file)
      renames.push({ from: rel, to: relWebp })
    } catch (err) {
      console.error(`✗ ${rel}: ${err.message}`)
    }
  }

  return renames
}

async function updateCodeRefs(renames) {
  const CODE_DIRS = ['app', 'components', 'scripts']
  const CODE_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css'])

  async function walkCode(dir) {
    let entries
    try { entries = await readdir(dir, { withFileTypes: true }) } catch { return [] }
    const files = []
    for (const e of entries) {
      if (e.name === 'node_modules' || e.name === '.next') continue
      const full = join(dir, e.name)
      if (e.isDirectory()) files.push(...await walkCode(full))
      else if (CODE_EXTS.has(extname(e.name))) files.push(full)
    }
    return files
  }

  const codeFiles = (await Promise.all(CODE_DIRS.map(d => walkCode(join(ROOT, d))))).flat()
  let updatedCount = 0

  for (const file of codeFiles) {
    let src = await readFile(file, 'utf8')
    let changed = false
    for (const { from, to } of renames) {
      if (src.includes(from)) {
        src = src.replaceAll(from, to)
        changed = true
      }
    }
    if (changed) {
      await writeFile(file, src)
      updatedCount++
    }
  }

  console.log(`\nUpdated ${updatedCount} source files with new .webp paths`)
}

const renames = await convertImages()
await updateCodeRefs(renames)
console.log('\nDone.')
