import { pick } from 'lodash'
import * as NPMAPI from '../../npm/api'

export default async (req, res) => {
  let results = await NPMAPI.suggestions(req.query.name)

  // results = results.map(result => pick(result, ['name']))

  res.json({
    results
  })
}
