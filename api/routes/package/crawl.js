import NPMCrawler from '../../npm/NPMCrawler'

const jobs = {}

export default (req, res) => {
  const { name, version = 'latest' } = req.query

  if (!jobs[name]) {
    jobs[name] = new NPMCrawler(name, version)
    jobs[name].start().finally(() => {
      console.log('Job finished:', name)
    })
  }
  const job = jobs[name]

  // results = results.map(result => pick(result, ['name']))

  res.json({
    // dependencies: Array.from(job.fetchedPackages),
    // queue: Array.from(job.queue),
    progress: job.progress
  })
}
