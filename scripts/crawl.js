import PQueue from 'p-queue'
import { suggestions } from '../api/lib/npm'
import NPMCrawler from '../api/lib/crawler'

async function main() {
  const [name] = process.argv.splice(2)
  console.log('Query: ' + name)
  const pkgs = await suggestions(name, 100).then(results => results.map(r => r.package.name))

  const queue = new PQueue({ concurrency: 4 })

  const active = new Set()
  const done = new Set()

  function log() {
    process.stdout.write('\r ' + `(${done.size} / ${pkgs.length}) ` + 'Crawiling: ' + Array.from(active).sort().join(', '))
  }

  log()

  await queue.addAll(pkgs.map(name => async () => {
    active.add(name)
    log()

    try {
      const crawler = new NPMCrawler(name, 'latest')
      await crawler.start()
    } catch (err) {
      console.error(name, err)
    }

    active.delete(name)
    done.add(name)
    log()
  }))

  await queue.start()

  console.log(`\rCrawled ${done.size} packages!`)
  process.exit(0)
}

main().catch(console.error)
