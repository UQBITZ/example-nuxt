import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'

async function releaseMarker() {
  try {
    return (await readFile('release-marker.txt', 'utf8')).trim()
  } catch {
    return 'absent'
  }
}

// Runs on the server for every request: nothing here is prerendered.
export default defineEventHandler(async (event) => ({
  renderedAt: new Date().toISOString(),
  requestId: randomUUID(),
  probe: getHeader(event, 'x-uqbitz-probe') ?? 'none',
  release: await releaseMarker(),
  runtime: `node ${process.version}`
}))
