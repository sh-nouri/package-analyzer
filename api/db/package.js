import mongoose, { Schema } from 'mongoose'
import semver from "semver";

const packageSchema = new Schema({
  _id: String,

  name: { type: String, index: true },
  description: String,
  readme: String,
  keywords: {},
  license: String,

  time: {},
  versions: {},
  'dist-tags': {},
  deprecated: String,
  score: {}
})

packageSchema.methods.getMatchedVersion = function(range) {
  for (const tag in this['dist-tags']) {
    if (tag === range) {
      return this['dist-tags'][tag]
    }
  }
  for (const version in this.versions) {
    if (semver.satisfies(version, range)) {
      return version
    }
  }
}

packageSchema.methods.getMatchedVersionPackage = function(range) {
  return this.versions[this.getMatchedVersion(range)]
}

export default mongoose.model('Package', packageSchema)


