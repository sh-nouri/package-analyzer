import NPMCrawler from './crawlers/npm'

async function main() {
  const crawler = new NPMCrawler()
  await crawler.crawl('nuxt7')
  console.log('crawl done!')
  process.exit(0)
}

main().catch(console.error)
