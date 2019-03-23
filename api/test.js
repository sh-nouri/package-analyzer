import NPMCrawler from './crawlers/npm'

async function main() {
  const npmCrawler = new NPMCrawler();
  await npmCrawler.crawl('nuxt7');
  console.log('crawl done!');
  process.exit(0)
}

main().catch(console.error);
