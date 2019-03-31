// import { pick } from 'lodash'
import * as npm from '../../lib/npm'

export default async (req, res) => {
  const results = await npm.suggestions(req.query.name)

  // results = results.map(result => pick(result, ['name']))

  res.json({
    results
  })
}
