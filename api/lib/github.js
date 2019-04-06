import Axios from 'axios'

const githubAPI = Axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token 38908cb3c6c20db813051526c7765fe760ca84ae`
  }
})

export async function getRepo(name) {
  const { stargazers_count, open_issues_count } = await githubAPI.get(`/repos/${name}`)
    .then(r => r.data)

  const issues = await githubAPI.get(`/repos/${name}/issues?per_page=1`).then(r => r.data)

  return {
    stars: stargazers_count,
    issues: issues.length ? issues[0].number : 0,
    openIssues: open_issues_count
  }
}
