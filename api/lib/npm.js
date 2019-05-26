import Axios from 'axios'

const registryAPI = Axios.create({
  baseURL: 'https://registry.npmjs.org'
})

const npm = Axios.create({
  baseURL: 'https://api.npmjs.org'
})

export async function getPackage(name) {
  // https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md
  const { data } = await registryAPI.get(`/${name}`)

  let license = data.license || ''
  if (typeof license !== 'string') {
    license = data.license.type || ''
  }

  let githubRepoName
  if (data.repository && data.repository.url) {
    const m = new RegExp('github.com/([^/]+/[^/]+)').exec(data.repository.url)
    githubRepoName = (m && m[1]) || ''
    githubRepoName = githubRepoName.replace('.git', '')
  }

  return {
    ...data,
    license,
    githubRepoName
  }
}

export async function suggestions(text, size) {
  const { data } = await registryAPI.get('/-/v1/search', {
    params: {
      text,
      size
    }
  })

  return data.objects
}

export async function downloads(name) {
  const { data } = await npm.get(`/downloads/range/last-year/${name}`).catch((error) => {
    throw new Error(`Unable to get downloads for ${name}: ${error}`)
  })
  return data.downloads
}

export async function getScore(name) {
  const result = await suggestions(name)
  const item = result.find(s => s.package.name === name)
  if (item) {
    return item.score
  }
  return {}
}
