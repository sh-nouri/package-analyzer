import { Package } from '../db'
import semver from 'semver'


class Node {
  constructor({
    name,
    range,
    parentNode,
  }) {
    this.id = name + '@' + range
    this.name = name
    this.range = range
    this.depth = parentNode ? parentNode.depth + 1 : 0

    this.childNodes = []
    this.matched = null
    this.dependencies = []
    this.subNodes = 0
    this.errors = []

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
      errors: this.errors,
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

    this.matched =  this.pkg.getMatchedVersionPackage(this.range)
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

  addError(errorName) {
    this.errors.push(errorName)
  }

  analyze() {
    this.analyzeNodeSubNodes()
    this.analyzeNodeRange()
  }

  analyzeNodeSubNodes() {
    this.subNodes = this.childNodes.reduce((sum, child) => sum + child.subNodes || 0, 1)
  }

  analyzeNodeRange(node) {
    // const { pkg, matched } = node._data
    // semver.gt('1.2.3', '9.8.7')

    // if (!regex.match) {
      // node.errors.push('ERROR_BADE_RANGE')
      // return
    // }
  }
}



export default async function analyzePackage(name, range){
  const node = new Node({
    name,
    range
  })

  await node.fetch()

  return node.toJSON()
}
