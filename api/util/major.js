const versionRegex = /^[~^]?\d+\.[x\d]+\.[x\d]+$/

export function validateVersion(version) {
  return versionRegex.test(version)
}

export function getMajor (version) {
  if(!validateVersion(version)) {
    return -1
  }
  return version.split('.')[0]
}
