import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://www.npmjs.com'
})

export async function suggestions(q) {
  const { data } = await axios.get('/search/suggestions', {
    params: {
      q
    }
  })

  return data
}