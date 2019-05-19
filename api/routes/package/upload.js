import { Package } from '../../db'

export default async (req, res) => {
  const _pkg = req.body
  const pkg = new Package({
    _id: _pkg.name,
    name: _pkg.name,
    virtual: true,
    'dist-tags': {
      latest: '_'
    },
    versions: {
      '_': _pkg
    }
  })

  await pkg.save()

  res.json(pkg)
}
