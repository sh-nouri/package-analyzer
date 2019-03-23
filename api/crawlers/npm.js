import axios from 'axios'
import { Package } from '../db'

export default class NPMCrawler {
  constructor() {
    this.fetchedPackages = new Set()
    this.maxDepth = 4
  }

  async crawl(packageName, depth = 1) {
    if (this.fetchedPackages.has(packageName) || depth > this.maxDepth) {
      return
    }

    this.fetchedPackages.add(packageName)

    // Get package from NPM
    const url = 'https://registry.npmjs.org/' + packageName + '/' + 'latest'
    console.log('Fetching ' + url)
    const rawPkg = await axios.get(url)
      .then(r => r.data)
      .catch(e => {
        throw new Error('Error while fetching ' + packageName + ': ' + e)
      })

    // Save in DB
    const pkg = await Package.findOneAndUpdate({
     _id: rawPkg.name
    }, {
        _id: rawPkg.name,
        name: rawPkg.name,
        version: rawPkg.version,
        dependencies: Object.keys(rawPkg.dependencies || {}),
        license: rawPkg.license
      }, {
        upsert: true,
        new: true
      })

    // Crawl dependencies in parallel
    await Promise.all(pkg.dependencies.map(dependencyName =>
      this.crawl(dependencyName, depth + 1)
    ))
  }
}
