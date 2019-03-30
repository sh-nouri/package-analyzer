import mongoose from 'mongoose'

console.log('Connecting to DB...')
mongoose.connect('mongodb://127.0.0.1:27017/package_analyzer', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => { console.log('Connected!') })
  .catch(console.error)

export { default as Package } from './package'
