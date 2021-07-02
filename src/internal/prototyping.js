/**
 * 
 * @typedef XMLJS
 * @type {object}
 * @property {object} params Parameters in the xml balise
 * @property {string} tag Tag value
 * @property {string} xmlTag String containing the parsed xml balise
 * @property {XMLJS[]} children List of children
 * @property {filter} filter Filter a list of XMLJS from this root
 * @property {findByTag} findByTag Filter a list of XMLJS by tag from this root
 * @property {findByParam} findByParam Filter a list of XMLJS by tag from this root
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
    return this.filter((obj) => obj.params && obj.params[key] && obj.params[key] === value)
  }
}
