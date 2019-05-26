import PQueue from 'p-queue'
import consola from 'consola'
import { Package } from '../db'
import * as npm from './npm'
import * as github from './github'

export default class NPMCrawler {
  constructor(name, range) {
    this.name = name
    this.range = range

    this.queue = new PQueue({ concurrency: 4 })

    this.allTasks = 0
    this.doneTasks = 0

    this.status = {}
    this.errors = []
  }

  get progress() {
    return Math.round((this.doneTasks * 100) / (this.allTasks))
  }

  start() {
    return this.enqueue(this.name, this.range, 0)
  }

  async enqueue(name, range, depth) {
    const key = name + '@' + range

    if (this.status[key]) {
      return
    }

    this.status[key] = 'queue'
    this.allTasks++

    await this.queue.add(async () => {
      try {
        this.status[key] = 'crawling'
        await this.crawl(name, range, depth)
        this.status[key] = 'done'
      } catch (error) {
        this.errors.push(`[${name}@${range}] ${error}`)
        this.status[key] = 'error'
      }
      this.doneTasks++
    })
  }

  async crawl(name, range, depth = 0) {
    let pkg = await this.getPackage(name, true)

    let matched = pkg.getMatchedVersionPackage(range)

    if (!matched) {
      pkg = await this.getPackage(name, false)
      matched = pkg.getMatchedVersionPackage(range)
    }

    if (!matched) {
      throw new Error('Cannot match any version for ' + name + ' that satisfies ' + range)
    }

    for (const dependencyName in matched.dependencies) {
      const dependencyRange = matched.dependencies[dependencyName]
      this.enqueue(dependencyName, dependencyRange, depth + 1)
    }
  }

  async getPackage(name, useCache) {
    let pkg = useCache ? await Package.findOne({ name }) : null

    if (!pkg || pkg.githubRepo.stars === undefined) {
      consola.debug('Crawling ' + name + ' ...')

      const [rawPkg, score, downloads] = await Promise.all([
        npm.getPackage(name),
        npm.getScore(name),
        npm.downloads(name)
      ])

      let githubRepo = {}
      if (rawPkg.githubRepoName) {
        try {
          githubRepo = await github.getRepo(rawPkg.githubRepoName)
        } catch (e) {
          if (e.response.status === 404) {
            githubRepo = { stars: 0, issues: 0, openIssues: 0 }
          } else {
            console.error('Github rate limit!', e.response.headers['X-RateLimit-Reset'])
          }
        }
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
