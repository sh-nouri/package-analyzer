import { Package } from '../db'
import { getMajor, validateVersion } from '../util/major'

class Node {
  constructor({
    name,
    range,
    parentNode
  }) {
    this.id = name + '@' + range
    this.name = name
    this.range = range
    this.depth = parentNode ? parentNode.depth + 1 : 0
    this.childNodes = []
    this.subNodes = 0
    this.messages = []
    this.analyze = null

    this._matched = null
    this._pkg = null
    this._parentNode = parentNode
    this._dependencies = []
    this._fetchedDependencies = parentNode ? parentNode._fetchedDependencies : new Set()
  }

  toJSON() {
    const json = {}
    for (const key in this) {
      if (key[0] !== '_') {
        json[key] = this[key]
      }
    }
    json.childNodes = json.childNodes.map(node => node.toJSON())
    return json
  }

  async fetch() {
    this._pkg = await Package.findOne({
      name: this.name
    })

    if (!this._pkg) {
      // TODO
      return
    }

    this._matched = this._pkg.getMatchedVersionPackage(this.range)
    if (!this._matched) {
      // TODO
      return
    }
    this.version = this._matched.version
    this._dependencies = this._matched.dependencies || {}

    for (const depName in this._dependencies) {
      const depRange = this._dependencies[depName]

      // Prevent loops
      const key = depName + '@' + depRange
      if (this._fetchedDependencies.has(key)) {
        continue // LOOP
      }
      this._fetchedDependencies.add(key)

      // Create child node
      this.childNodes.push(new Node({
        name: depName,
        range: depRange,
        parentNode: this
      }))
    }

    // Call fetch on all childNodes
    await Promise.all(this.childNodes.map(node => node.fetch()))

    // Analyze self
    this.analyze = this.doAnalyze()
  }

  addMessage(type, message) {
    this.messages.push({
      type,
      message
    })
  }

  addWarn(message) {
    this.addMessage('warn', message)
  }

  addError(message) {
    this.addMessage('error', message)
  }

  doAnalyze() {
    const measurements = [
      {
        name: 'range',
        function: 'analyzeNodeRange',
        weight: 1
      },
      {
        name: 'downloads',
        function: 'analyzeDownloads',
        weight: 1
      }
    ]

    let totalWeight = 0
    let totalScore = 0

    for (const measure of measurements) {
      measure.score = this[measure.function]()
      delete measure.function
      totalWeight += measure.weight
      totalScore += measure.score
    }

    const score = totalScore / totalWeight

    return {
      score,
      measurements
    }
  }

  analyzeDownloads() {

  }

  analyzeNodeRange() {
    if (this.depth > 0 && !validateVersion(this.range)) {
      this.addError(`Bad range for ${this._pkg.name}`, 0.3)
      return 0
    }

    const currentMajor = getMajor(this._matched.version)
    const latestMajor = getMajor(this._pkg.getLatest().version)

    if (latestMajor > currentMajor) {
      this.addWarn(`${this._pkg.name} package is outdated, there are ${latestMajor - currentMajor} major changes after this version`)
    }

    this.addMessage('info', JSON.stringify({ latestMajor, currentMajor }))

    return 1 - ((latestMajor - currentMajor) / 10)
  }
}

function getSummary(rootNode, summary = {}) {
  return summary
}

export default async function analyzePackage(name, range) {
  const rootNode = new Node({
    name,
    range
  })
  await rootNode.fetch()

  const summary = getSummary(rootNode)

  return {
    summary,
    tree: rootNode.toJSON()
  }
}
