import analyzePackage from '../../lib/analyze'

export default async (req, res) => {
  const { name, version = 'latest' } = req.query

  const result = await analyzePackage(name, version)

  res.json({
    result
  })
}
