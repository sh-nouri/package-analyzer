import PQueue from 'p-queue'
import uniq from 'lodash/uniq'
import axios from 'axios'
import NPMCrawler from '../api/lib/crawler'

async function getDependants(name, skip = 0, limit = 10000) {
  const { data: { rows } } = await axios({
    method: 'get',
    timeout: 3000,
    url: 'https://skimdb.npmjs.com/registry/_design/app/_view/dependedUpon',
    params: {
      group_level: 2,
      startkey: [name],
      endkey: [name],
      skip: skip,
      limit: limit
    }
  })
  return uniq(rows.map(r => r.key[1]).filter(Boolean))
}

async function main() {
  const [mainPkgName, skip, limit] = process.argv.splice(2)
  console.log('Fetching dependants of ' + mainPkgName)
  const dependents = await getDependants(mainPkgName, skip, limit)

  const queue = new PQueue({ concurrency: 4 })

  const active = new Set()
  const done = new Set()

  function log() {
    process.stdout.write('\r ' + `(${done.size} / ${dependents.length}) ` + 'Crawiling: ' + Array.from(active).sort().join(', '))
  }

  log()

  await queue.addAll(dependents.map(name => async () => {
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
