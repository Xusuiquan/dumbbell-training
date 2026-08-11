import { access, mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const STEP_WIDTH = 1024
const STEP_HEIGHT = 1280
const WEBP_OPTIONS = { quality: 88, effort: 4, smartSubsample: true }
const WHITE = { r: 255, g: 255, b: 255 }

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(scriptDirectory, '../../../..')
const options = parseArguments(process.argv.slice(2))

await requireReadableFile(options.sourcePath)
if (options.heroSource) await requireReadableFile(options.heroSource)

const exerciseRoot = join(options.outputRoot, options.exerciseId)
const stepRoot = join(exerciseRoot, 'steps')
await mkdir(stepRoot, { recursive: true })

if (options.replaceStep) {
  const destination = stepPath(options.replaceStep)
  await writeNormalizedStep(options.sourcePath, destination)

  if (options.replaceStep === options.heroStep) {
    await writeDerivedAssets(options.heroSource ?? destination)
  }

  console.log(`Replaced step ${options.replaceStep}: ${destination}`)
} else {
  const regions = await getStoryboardRegions(options.sourcePath, options.layout)

  await Promise.all(
    regions.map(async (region, index) => {
      const panel = await sharp(options.sourcePath).extract(region).png().toBuffer()
      await writeNormalizedStep(panel, stepPath(index + 1))
    }),
  )

  await writeDerivedAssets(options.heroSource ?? stepPath(options.heroStep))
  console.log(`Prepared six production assets in ${exerciseRoot}`)
}

function stepPath(stepNumber) {
  return join(stepRoot, `${String(stepNumber).padStart(2, '0')}.webp`)
}

async function writeNormalizedStep(input, destination) {
  const artwork = await normalizeArtwork(input, 936, 1152)
  const metadata = await sharp(artwork).metadata()
  const left = Math.round((STEP_WIDTH - metadata.width) / 2)
  const top = Math.round((STEP_HEIGHT - metadata.height) / 2)

  await sharp({
    create: {
      width: STEP_WIDTH,
      height: STEP_HEIGHT,
      channels: 3,
      background: WHITE,
    },
  })
    .composite([{ input: artwork, left, top }])
    .webp(WEBP_OPTIONS)
    .toFile(destination)
}

async function writeDerivedAssets(heroInput) {
  const thumbnailArtwork = await normalizeArtwork(heroInput, 472, 592)
  const thumbnailMetadata = await sharp(thumbnailArtwork).metadata()

  await sharp({
    create: { width: 512, height: 640, channels: 3, background: WHITE },
  })
    .composite([
      {
        input: thumbnailArtwork,
        left: Math.round((512 - thumbnailMetadata.width) / 2),
        top: Math.round((640 - thumbnailMetadata.height) / 2),
      },
    ])
    .webp(WEBP_OPTIONS)
    .toFile(join(exerciseRoot, 'thumbnail.webp'))

  const analysisArtwork = await normalizeArtwork(heroInput, 820, 952)
  const analysisMetadata = await sharp(analysisArtwork).metadata()

  await sharp({
    create: { width: 1536, height: 1024, channels: 3, background: WHITE },
  })
    .composite([
      {
        input: analysisArtwork,
        left: Math.max(20, Math.round((860 - analysisMetadata.width) / 2)),
        top: Math.round((1024 - analysisMetadata.height) / 2),
      },
    ])
    .webp(WEBP_OPTIONS)
    .toFile(join(exerciseRoot, 'analysis.webp'))
}

async function normalizeArtwork(input, maxWidth, maxHeight) {
  const trimmed = await sharp(input)
    .flatten({ background: WHITE })
    .trim({ background: WHITE, threshold: 10 })
    .png()
    .toBuffer()

  return sharp(trimmed)
    .resize({
      width: maxWidth,
      height: maxHeight,
      fit: 'inside',
      withoutEnlargement: false,
    })
    .png()
    .toBuffer()
}

async function getStoryboardRegions(sourcePath, layout) {
  const { width, height } = await sharp(sourcePath).metadata()
  if (!width || !height) fail(`Could not read storyboard dimensions: ${sourcePath}`)

  if (layout === 'horizontal') {
    if (width < height * 2) {
      fail('Horizontal storyboard should be substantially wider than it is tall')
    }

    const boundaries = partition(width, 4)
    return boundaries.map(({ start, size }) => ({
      left: start,
      top: 0,
      width: size,
      height,
    }))
  }

  if (width < 1024 || height < 1024) {
    fail(
      'Grid storyboard must be at least 1024 × 1024; generate at the highest practical square resolution',
    )
  }

  const columns = partition(width, 2)
  const rows = partition(height, 2)
  return [
    region(columns[0], rows[0]),
    region(columns[1], rows[0]),
    region(columns[0], rows[1]),
    region(columns[1], rows[1]),
  ]
}

function partition(total, count) {
  return Array.from({ length: count }, (_, index) => {
    const start = Math.floor((total * index) / count)
    const end = Math.floor((total * (index + 1)) / count)
    return { start, size: end - start }
  })
}

function region(column, row) {
  return { left: column.start, top: row.start, width: column.size, height: row.size }
}

function parseArguments(args) {
  const exerciseId = args.shift()
  const source = args.shift()

  if (!exerciseId || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(exerciseId) || !source) {
    usage()
  }

  const parsed = {
    exerciseId,
    sourcePath: resolve(source),
    layout: 'grid',
    heroStep: 3,
    heroSource: null,
    replaceStep: null,
    outputRoot: join(repoRoot, 'public/images/exercises'),
  }

  while (args.length) {
    const option = args.shift()
    const value = args.shift()
    if (!value) fail(`Missing value for ${option}`)

    if (option === '--layout') parsed.layout = value
    else if (option === '--hero-step') parsed.heroStep = parseStep(value, option)
    else if (option === '--hero-source') parsed.heroSource = resolve(value)
    else if (option === '--replace-step') parsed.replaceStep = parseStep(value, option)
    else if (option === '--output-root') parsed.outputRoot = resolve(value)
    else fail(`Unknown option: ${option}`)
  }

  if (!['grid', 'horizontal'].includes(parsed.layout)) {
    fail(`Unsupported layout '${parsed.layout}'. Use grid or horizontal.`)
  }

  return parsed
}

function parseStep(value, option) {
  const step = Number(value)
  if (!Number.isInteger(step) || step < 1 || step > 4) {
    fail(`${option} must be an integer from 1 to 4`)
  }
  return step
}

async function requireReadableFile(path) {
  try {
    await access(path)
  } catch {
    fail(`Image source does not exist or is unreadable: ${path}`)
  }
}

function usage() {
  fail(
    'Usage: node prepare-exercise-images.mjs <exercise-id> <source-image> [--layout grid|horizontal] [--hero-step 1-4] [--hero-source path] [--replace-step 1-4] [--output-root path]',
  )
}

function fail(message) {
  console.error(`ERROR: ${message}`)
  process.exit(1)
}
