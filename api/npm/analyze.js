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
    this.matched = null
    this.dependencies = []
    this.subNodes = 0
    this.messages = []

    this._parentNode = parentNode
    this._fetchedDependencies = parentNode ? parentNode._fetchedDependencies : new Set()
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      range: this.range,
      version: this.version,
      depth: this.depth,
      subNodes: this.subNodes,
      messages: this.messages,
      childNodes: this.childNodes.map(node => node.toJSON())
    }
  }

  async fetch() {
    this.pkg = await Package.findOne({
      name: this.name
    })

    if (!this.pkg) {
      // TODO
      return
    }

    this.matched = this.pkg.getMatchedVersionPackage(this.range)
    if (!this.matched) {
      // TODO
      return
    }
    this.version = this.matched.version
    this.dependencies = this.matched.dependencies || {}

    for (const depName in this.dependencies) {
      const depRange = this.dependencies[depName]

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
    await this.analyze()
  }

  addMessages(type, message, impact) {
    this.messages.push({
      type,
      message,
      impact
    })
  }

  addWarn(message, impact) {
    this.addMessages('warn', message, impact)
  }

  addError(message, impact) {
    this.addMessages('error', message, impact)
  }

  analyze() {
    this.analyzeNodeSubNodes()
    this.analyzeNodeRange()
  }

  analyzeNodeSubNodes() {
    this.subNodes = this.childNodes.reduce((sum, child) => sum + child.subNodes || 0, 1)
  }

  analyzeNodeRange() {
    if (!validateVersion(this.range)) {
      this.addError(`Bad range for ${this.pkg.name}`, 0.3)
      return
    }

    const currentMajor = getMajor(this.matched.version)
    const latestMajor = getMajor(this.pkg.getLatest().version)

    if (latestMajor > currentMajor) {
      this.addError(`${this.pkg.name} package is outdated, there are ${latestMajor - currentMajor} major changes after this version`,
        (latestMajor - currentMajor) / 10)
    }
  }
}

export default async function analyzePackage(name, range) {
  const node = new Node({
    name,
    range
  })

  await node.fetch()

  return node.toJSON()
}
