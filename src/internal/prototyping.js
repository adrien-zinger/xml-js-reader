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
 *
 * @typedef XMLJS_LIGHT
 * @type {object}
 * @property {object} params Parameters in the xml balise
 * @property {string} tag Tag value
 * @property {XMLJS_LIGHT[]} children List of children
 * @property {string} text If child is plain text print this and the rest is empty
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

function corresponds(a, b) {
  if (a.params)
    for (const k of Object.keys(a.params)) if (a[k] !== b[k]) return false
  if (a.tag && a.tag !== b.tag) return false
  return true
}

module.exports = {
  reset(element) {
    this.params = element.params
    this.tag = element.tag
    this.xmlTag = element.xmlTag
    this.children = element.children
    this.text = element.text
  },
  toString() {
    return JSON.stringify(this, null, 2)
  },
  replace(element, to) {
    if (corresponds(element, this)) {
      if (to.length)
        throw Error('You cannot assign this with another structure')
      else return this.reset(to)
    }
    if (!to.length) to = [to]
    this.filter((el) => {
      for (var i = 0; el.children && i < el.children.length; ++i) {
        if (corresponds(element, el.children[i])) {
          el.children = [
            ...el.children.slice(0, i),
            ...to,
            ...el.children.slice(i + 1),
          ]
        }
      }
    })
  },
  filter(cb) {
    const ret = []
    let queue = [this]
    while (queue.length > 0) {
      const current = queue.pop()
      if (cb(current)) ret.push(current)
      queue = queue.concat(current.children.slice().reverse())
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
