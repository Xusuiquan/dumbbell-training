import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const exerciseId = process.argv[2]

if (!exerciseId || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(exerciseId)) {
  fail('Usage: node validate-exercise.mjs <lowercase-kebab-case-exercise-id>')
}

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(scriptDirectory, '../../../..')
const dataPath = join(repoRoot, 'src/data/exercises/dumbbell.ts')
const source = readFileSync(dataPath, 'utf8')
const marker = `id: '${exerciseId}'`
const recordStart = source.indexOf(marker)

if (recordStart < 0) fail(`Exercise '${exerciseId}' is not registered in ${dataPath}`)

const nextRecord = source.indexOf("\n  {\n    id: '", recordStart + marker.length)
const record = source.slice(recordStart, nextRecord < 0 ? source.length : nextRecord)

if (!record.includes('detail: {')) fail(`Exercise '${exerciseId}' has no structured detail content`)

const detailRecord = record.slice(record.indexOf('detail: {'))

assertSectionCount(detailRecord, 'steps: [', 'keyPoints:', 'imageAlt:', 4, 'steps')
assertSectionCount(detailRecord, 'keyPoints: [', 'mistakes:', 'icon:', 4, 'key points')
assertSectionCount(detailRecord, 'mistakes: [', 'prescription:', 'icon:', 3, 'mistakes')
assertSectionCount(detailRecord, 'prescription: [', null, 'icon:', 3, 'prescription items')

const assetRoot = join(repoRoot, 'public/images/exercises', exerciseId)

if (existsSync(assetRoot)) {
  requireFile(join(assetRoot, 'analysis.webp'))
  requireFile(join(assetRoot, 'thumbnail.webp'))
  const stepRoot = join(assetRoot, 'steps')
  const expected = ['01.webp', '02.webp', '03.webp', '04.webp']
  expected.forEach((file) => requireFile(join(stepRoot, file)))
  const webpSteps = existsSync(stepRoot)
    ? readdirSync(stepRoot).filter((file) => /^\d\d\.webp$/.test(file))
    : []
  if (webpSteps.length !== 4) fail(`Expected exactly 4 WebP step files, found ${webpSteps.length}`)
} else if (exerciseId === 'bent-over-reverse-fly') {
  ;['1.png', '2.png', '4.png', '5.png'].forEach((file) =>
    requireFile(join(repoRoot, '俯身飞鸟', file)),
  )
  console.log('Asset check: accepted the reverse-fly legacy PNG set')
} else {
  fail(`Missing standardized asset directory: ${assetRoot}`)
}

console.log(`OK: ${exerciseId} has 4 steps, 4 key points, 3 mistakes, and 3 metrics`)

function assertSectionCount(recordText, startToken, endToken, countToken, expected, label) {
  const start = recordText.indexOf(startToken)
  if (start < 0) fail(`Missing ${label} section`)
  const end = endToken ? recordText.indexOf(endToken, start) : recordText.length
  if (end < 0) fail(`Could not determine the end of the ${label} section`)
  const section = recordText.slice(start, end)
  const count = section.split(countToken).length - 1
  if (count !== expected) fail(`Expected ${expected} ${label}, found ${count}`)
}

function requireFile(path) {
  if (!existsSync(path)) fail(`Missing required asset: ${path}`)
}

function fail(message) {
  console.error(`ERROR: ${message}`)
  process.exit(1)
}
