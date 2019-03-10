import express from 'express'

const app = express()

app.listen(3001)
console.log('API Running: ' + 'http://localhost:3001')

app.get('/api/test', (req, res) => {
  res.json({ Shabnam: 'works!' })
})