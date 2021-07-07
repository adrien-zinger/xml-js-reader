/**
 *
 * @typedef XMLJS
 * @type {object}
 * @property {object} params Parameters in the xml balise
 * @property {string} tag Tag value
 * @property {string} xmlTag String containing the parsed xml balise
 * @property {XMLJS[]} children List of children
 * @property {string} text If child is plain text print this and the rest is empty
 * @property {filter} filter Filter a list of XMLJS from this root
 * @property {findByTag} findByTag Filter a list of XMLJS by tag from this root
 * @property {findByParam} findByParam Filter a list of XMLJS by tag from this root
 * @property {findByPath} findByPath Filter a list of XMLJS by tag path from this root
 */

/**
 * @callback filter
 * @param {function} cb return true if you want the value, false otherwise
 * @returns {XMLJS[]}
 */

/**
 * @callback findByTag
 * @param {string} tag
 * @returns {XMLJS[]}
 */

/**
 * @callback findByParam
 * @param {string} key
 * @param {string} value
 * @returns {XMLJS[]}
 */

/**
 * @callback findByPath
 * @param {Array<string>} path Array of tags
 * @returns {XMLJS[]}
 */

module.exports = {
  filter(cb) {
    const ret = []
    let queue = [this]
    while (queue.length > 0) {
      const current = queue.pop()
      if (cb(current)) ret.push(current)
      queue = queue.concat(current.children)
    }
    return ret
  },
  findByTag(tag) {
    return this.filter((obj) => obj.tag === tag)
  },
  findByParam(key, value) {
    return this.filter(
      (obj) => obj.params && obj.params[key] && obj.params[key] === value
    )
  },
  findByPath(path) {
    const ret = []
    let queue = [this]
    const paths = new WeakMap()
    paths.set(this, [])
    while (queue.length > 0) {
      const current = queue.pop()
      const currentPath = paths.get(current)
      currentPath.push(current.tag)
      if (currentPath.length > path.length) continue
      let equals = true
      for (let i = 0; equals && i < path.length; ++i)
        equals = path[i] === currentPath[i]
      if (equals && currentPath.length == path.length) {
        ret.push(current)
        continue
      }
      paths.set(current, currentPath)
      for (const child of current.children) paths.set(child, [...currentPath])
      queue = queue.concat(current.children)
    }
    return ret
  },
}
