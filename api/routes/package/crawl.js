import NPMCrawler from '../../lib/crawler'

const jobs = {}

export default (req, res) => {
  const { name, range = 'latest' } = req.query
  const key = name + '@' + range

  let job = jobs[key]
  if (!job) {
    job = jobs[key] = new NPMCrawler(name, range)
    job.start()
  }

  res.json({
    progress: job.progress,
    status: job.status,
    errors: job.errors.map(e => (e + '').replace('Error: ', ''))
  })
}
