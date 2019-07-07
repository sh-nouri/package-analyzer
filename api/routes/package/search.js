// import { pick } from 'lodash'
import * as npm from '../../lib/npm'

export default async (req, res) => {
  const { framework, sort } = JSON.parse(req.query.filters || '{}')

  const q = {}

  q.text = req.query.name || ''

  if (framework) {
    q.text += ' ' + framework
  }

  if (sort && sort !== 'overall') {
    q.quality = 0
    q.popularity = 0
    q.maintenance = 0
    q[sort] = 1
  }

  const results = await npm.suggestions(q)

  res.json({ results })
}
