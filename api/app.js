import express from 'express'
import bodyParser from 'body-parser'
import router from './router'
import './lib/keep-alive'

const app = express()

app.use(bodyParser.json())

app.use('/api', router)

app.listen(3001, (error) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }
  console.log('API Running: ' + 'http://localhost:3001')
})
