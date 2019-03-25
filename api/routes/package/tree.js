import { Package } from '../../db'

async function getPkg(name, range) {
  const node = {
    meta: {
      name,
      range
    },
    children: []
  }

  const pkg = await Package.findOne({ name })
  if (!pkg) {
    return node
  }

  const matched = pkg.getMatchedVersionPackage(range)
  if (!matched) {
    return node
  }
  node.meta.version = matched.version

  const dependencies = matched.dependencies || {}

  await Promise.all(Object.entries(dependencies)
    .map(async ([depName, depRange]) => {
      const pkg = await getPkg(depName, depRange)
      node.children.push(pkg)
  }))

  return node
}


export default async (req, res) => {
  const { name, range = 'latest' } = req.query
  const node = await getPkg(name, range)
  res.json(node)
}
