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

    this.parentNode = parentNode
    this.depth = parentNode ? parentNode.depth + 1 : 0
    this.fetchedDependencies = parentNode ? parentNode.fetchedDependencies : new Set()

    this.dependencies = []
    this.childNodes = []
    this.analyze = null
    this.messages = []
    this.matched = null
    this.pkg = null
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      range: this.range,
      childNodes: this.childNodes.map(node => node.toJSON())
    }
  }

  async fetch() {
    this.pkg = await Package.findOne({
      name: this.name
    })

    if (!this.pkg) {
      return
    }

    this.matched = this.pkg.getMatchedVersionPackage(this.range)
    if (!this.matched) {
      return
    }
    this.version = this.matched.version
    this.dependencies = this.matched.dependencies || {}

    for (const depName in this.dependencies) {
      const depRange = this.dependencies[depName]

      // Prevent loops
      const key = depName + '@' + depRange
      if (this.fetchedDependencies.has(key)) {
        continue // LOOP
      }
      this.fetchedDependencies.add(key)

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

  addMessage(type, message, scope) {
    this.messages.push({
      type,
      scope,
      message
    })
  }

  addWarn(message, scope) {
    this.addMessage('warn', message, scope)
  }

  addError(message, scope) {
    this.addMessage('error', message, scope)
  }

  addPositive(message, scope) {
    this.addMessage('positive', message, scope)
  }

  doAnalyze() {
    const measurements = [
      {
        name: 'version',
        function: 'analyzeVersion',
        weight: 1
      },
      {
        name: 'downloads',
        function: 'analyzeDownloads',
        weight: 1
      },
      {
        name: 'star',
        function: 'analyzeStars',
        weight: 1
      },
      {
        name: 'issues',
        function: 'analyzeIssues',
        weight: 1
      },
      {
        name: 'updates',
        function: 'analyzeUpdates',
        weight: 1
      }

    ]

    let totalWeight = 0
    let totalScore = 0

    for (const measure of measurements) {
      // Measure score for node
      const nodeScore = this[measure.function]() || 0
      delete measure.function

      // Measure score for childs
      let minChildScore = nodeScore
      for (const child of this.childNodes) {
        const childScore = child.analyze ? child.analyze.measurements.find(m => m.name === measure.name).score : nodeScore
        if (childScore < minChildScore) {
          minChildScore = childScore
        }
      }

      // Measure score
      measure.score = 0.6 * nodeScore + 0.4 * minChildScore

      totalWeight += measure.weight
      totalScore += measure.score
    }

    return {
      score: totalScore / totalWeight,
      measurements
    }
  }

  analyzeStars() {
    return Math.min(1, this.pkg.githubRepo.stars / 500)
  }

  analyzeUpdates() {
    const updates = Object.values(this.pkg.time)
      .map(time => new Date(time))
      .sort((a, b) => b - a)

    let last = new Date()
    let sum = 0
    for (const update of updates) {
      sum += last - update
      last = update
    }
    const averageUpdate = Math.round((sum / updates.length) / (1000 * 60 * 60 * 24))

    if (averageUpdate > 365) {
      this.addError(`Average update is over one year!`, 'updates')
      return 0
    }

    if (averageUpdate > 6 * 30) {
      this.addWarn(`Average update is over 6 months!`, 'updates')
      return 0.3
    }

    if (averageUpdate < 30) {
      if (averageUpdate > 7) {
        this.addPositive(`Average update is ${averageUpdate} days`, 'updates')
        return 1
      } else {
        this.addWarn(`Average update is ${averageUpdate} days`, 'updates')
        return 0.7
      }
    }

    return 0.5
  }

  analyzeIssues() {
    if (this.pkg.githubRepo.issues) {
      return 1 - (this.pkg.githubRepo.openIssues / this.pkg.githubRepo.issues)
    } else return 1
  }

  analyzeDownloads() {
    let totalDownload = 0
    for (const download of this.pkg.downloads) {
      totalDownload = totalDownload + download.downloads
    }

    const averageDownload = totalDownload / this.pkg.downloads.length

    return Math.min(1, averageDownload / 500)
  }

  analyzeVersion() {
    if (this.depth === 0) {
      return 1
    }

    if (!validateVersion(this.range)) {
      return 0.5
    }

    const currentMajor = getMajor(this.matched.version)
    const latestMajor = getMajor(this.pkg.getLatest().version)
    const diff = latestMajor - currentMajor

    if (diff > 1) {
      this.addWarn(`There are ${diff} newer major versions!`, 'version')
    } else if (diff === 1) {
      this.addWarn(`There is one newer major version!`, 'version')
    }

    return Math.max(0, 1 - (diff / 5))
  }
}

function _getSummary(node, summary, path) {
  path = [...path, node.id]

  for (const message of node.messages) {
    summary.messages.push({
      ...message,
      depth: node.depth,
      id: node.id,
      path
    })
  }

  for (const child of node.childNodes) {
    _getSummary(child, summary, path)
  }
}

function getSummary(node) {
  const summary = {
    messages: []
  }

  _getSummary(node, summary, [])

  summary.messages = summary.messages.sort((a, b) => a.depth - b.depth)

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
    ...summary,
    analyze: rootNode.analyze,
    tree: rootNode.toJSON()
  }
}
