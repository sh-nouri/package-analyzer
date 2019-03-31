import { Package } from '../db'
import * as npm from './npm'
import * as github from './github'

export default class NPMCrawler {
  constructor(name, version, useCache = true) {
    this.fetchedPackages = new Set()
    this.queue = new Set()

    this.maxDepth = 4 // d
    this.averagePaths = 3 // p
    this.currentDepth = 0

    this.name = name
    this.version = version
  }

  _countNodes(d, p) {
    return p ** (d + 1) - 1
  }

  get progress() {
    const queueSize = this.queue.size
    const fetchedPackagesSize = this.fetchedPackages.size

    if (queueSize === 0 && fetchedPackagesSize === 0) {
      return 0
    }

    const total = 1 + fetchedPackagesSize + queueSize
    const current = 1 + fetchedPackagesSize

    const p = (current * 100) / (total)

    if (p < 40) {
      const expectCurrent = this._countNodes(this.currentDepth, this.averagePaths)
      const expectedTotal = this._countNodes(this.maxDepth, this.averagePaths)
      return expectCurrent / expectedTotal
    }

    return p
  }

  async start() {
    await this.crawl(this.name, this.version, 0, true)
  }

  async crawl(name, range, depth = 0, useCache = true) {
    if (this.fetchedPackages.has(name + '@' + range) || depth > this.maxDepth) {
      return
    }

    if (this.currentDepth < depth) {
      this.currentDepth = depth
    }

    let pkg = await this.getPackage(name, useCache)
    let matched = pkg.getMatchedVersionPackage(range)
    if (!matched && useCache) {
      pkg = await this.getPackage(name, false)
      matched = pkg.getMatchedVersionPackage(range)
    }
    if (!matched) {
      throw new Error('Cannot match any version for ' + name + ' that satisfies ' + range)
    }

    this.fetchedPackages.add(name + '@' + range)

    await Promise.all(Object.entries(matched.dependencies || {})
      .map(async ([dependencyName, dependencyRange]) => {
        const queueId = dependencyName + '@' + dependencyRange
        this.queue.add(queueId)
        // console.log(queueId)
        await this.crawl(dependencyName, dependencyRange, depth + 1)
        this.queue.delete(queueId)
      }))
  }

  async getPackage(name, useCache) {
    let pkg = useCache ? await Package.findOne({ name }) : null

    if (!pkg) {
      console.log('Crawling ' + name + ' ...')
      const [rawPkg, score, downloads] = await Promise.all([
        npm.getPackage(name),
        npm.getScore(name),
        npm.downloads(name)
      ])

      let githubRepo = {}
      if (rawPkg.githubRepoName) {
        githubRepo = await github.getRepo(rawPkg.githubRepoName)
      }

      pkg = await Package.findOneAndUpdate({ name }, {
        ...rawPkg,
        score,
        downloads,
        githubRepo
      }, {
        new: true,
        upsert: true
      })
    }

    return pkg
  }
}
