import mongoose, { Schema } from 'mongoose'

export default mongoose.model('Package', new Schema({
  _id: String,
  name: String,
  version: String,
  license: String,
  dependencies: []
}))

