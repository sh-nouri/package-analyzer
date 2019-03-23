import axios from 'axios'
import { Package } from '../db'

export default class githubCrawler {
  constructor() {
    this.fetchedPackages = new Set()
  }

  async crawl(packageName, lang) {
    if (this.fetchedPackages.has(packageName)) {
      return
    }

    this.fetchedPackages.add(packageName);

    // Get packages from github
    const url = `https://github.com/search?l=${lang}&q=${packageName}+in%3Aname&type=Repositories`
    console.log('Fetching ' + url);
    const rawPkg = await axios.get(url)
      .then(r => r.data)
      .catch(e => {
        throw new Error('Error while fetching ' + packageName + ': ' + e)
      })
    console.log('raw', rawPkg);
    // Save in DB
    // const pkg = await Package.findOneAndUpdate({
    //   _id: rawPkg.name
    // }, {
    //   _id: rawPkg.name,
    //   name: rawPkg.name,
    //   version: rawPkg.version,
    //   dependencies: Object.keys(rawPkg.dependencies || {}),
    //   license: rawPkg.license
    // }, {
    //   upsert: true,
    //   new: true
    // })

    // Crawl dependencies in parallel
    // await Promise.all(pkg.dependencies.map(dependencyName =>
    //   this.crawl(dependencyName, depth + 1)
    // ))
  }
}
