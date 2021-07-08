
/**
 * Render the formated js object returned by tojs in xml
 * @param {import("./internal/prototyping").XMLJS_LIGHT} obj 
 */
function render(obj) {
  const tag = obj.tag;
  if (tag === '' || tag === undefined) {
    return typeof obj == 'string' ? obj : obj.text
  }
  const params = obj.params
    ? Object.keys(obj.params).map((key) => `${key}="${obj.params[key]}"`).join(' ')
    : ''
  const children = obj.children ? obj.children.map(render).join('') : ''
  let ret = `<${obj.tag}`
  ret += params == '' ? '' : ` ${params}`
  ret += children == '' ? ' />' : `> ${children} </${tag}>`
  return ret
}

/**
 * Render the formated js object returned by tojs in xml
 * @param {import("./internal/prototyping").XMLJS_LIGHT} obj 
 */
function toXml(obj) {
  return render(obj)
}

module.exports = {
  toXml,
}