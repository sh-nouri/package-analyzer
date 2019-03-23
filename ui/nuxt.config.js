export default {
  mode: 'spa',
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt'
  ],
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': 'http://localhost:3001'
  },
  css: [
    'font-awesome/css/font-awesome.css',
    '~/assets/index.scss'
  ]
}