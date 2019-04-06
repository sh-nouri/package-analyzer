const HTTP = require('http')
const HTTPS = require('https')
const Agent = require('agentkeepalive')

HTTP.globalAgent = new Agent()
HTTPS.globalAgent = new Agent.HttpsAgent()
