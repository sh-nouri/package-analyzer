import mongoose, { Schema } from 'mongoose'
import semver from 'semver'

const packageSchema = new Schema({
  _id: String,

  virtual: Boolean,

  name: { type: String, index: true },
  description: String,
  readme: String,
  keywords: {},
  license: String,
  maintainers: [{
    name: String,
    email: String
  }],
  time: {},
  versions: {},
  'dist-tags': {},
  deprecated: String,
  score: {},
  downloads: {},
  githubRepoName: String,
  githubRepo: {}
})

packageSchema.methods.getMatchedVersion = function (range) {
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

packageSchema.methods.getMatchedVersionPackage = function (range) {
  const matchedVersion = this.getMatchedVersion(range)

  if (!matchedVersion) {
    return
  }

  return this.versions[matchedVersion]
}

packageSchema.methods.getLatest = function () {
  const latestVersion = this['dist-tags'].latest
  return this.versions[latestVersion]
}

export default mongoose.model('Package', packageSchema)
