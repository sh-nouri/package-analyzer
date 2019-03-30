import Axios from 'axios'

// const axios = Axios.create({
//   baseURL: 'https://www.npmjs.com'
// })
//
// export async function suggestions(q) {
//   const { data } = await axios.get('/search/suggestions', {
//     params: {
//       q
//     }
//   })

const axios = Axios.create({
  baseURL: 'http://registry.npmjs.com'
})

export async function suggestions(text) {
  const { data } = await axios.get('/-/v1/search', {
    params: {
      text
    }
  })

  return data.objects
}
