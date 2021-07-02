module.exports = {
  findByTag(tag) {
    const ret = []
    let queue = [this]
    while (queue.length > 0) {
      const current = queue.pop()
      if (current.tag === tag) ret.push(current)
      queue = queue.concat(current.children)
    }
    return ret
  },
}
