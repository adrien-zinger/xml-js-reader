const helper = require('./prototyping')

/**
 * Pop the next xml object list of xml object
 * @param {string} children xml children
 * @returns {Array} An array composed of remaining xml object
 * in a xml string and a string containing the object
 */
function popNextXmlStr(content) {
  const indexOf = (str) => content.indexOf(str)
  if (content.match(/^[\s]*<\//g)) return [content, null]
  const objStarts = content.match(/<[a-z]+/g)
  if (objStarts === null) return [content, null]
  // detect inline objects
  const objStart = objStarts[0]
  const inline = content.match(`${objStart}[^<]+\/>`)
  if (inline !== null && indexOf(inline[0]) === indexOf(objStart)) {
    return [content.slice(inline[0].length), inline[0]]
  }
  const obj = content.match(`${objStart}[^]+?</${objStart.slice(1)}>`)
  if (obj === null) {
    throw Error(`Cannot completely pull the object ${objStart}`)
  }
  return [content.slice(obj[0].length + 1), obj[0]]
}

function mapChildrenStr(xmlTag, xmlStr, cb) {
  let ret = []
  let children = xmlStr.slice(xmlTag.length)
  for (
    let next = popNextXmlStr(children);
    next[1] != null;
    ret.push(cb(next[1], next[0])),
      children = next[0],
      next = popNextXmlStr(children)
  );
  return ret
}

function parseParams(str) {
  const params = {}
  if (str)
    for (const param of str) {
      const [, key, value] = param.match(/([^=]+)="([^"]+)"/)
      params[key] = value
    }
  return params
}

function getParam(content) {
  const ret = {}
  const indexOf = (str) => content.indexOf(str)
  const objStarts = content.match(/<[a-z]+/g)
  if (objStarts === null) throw Error(`Cannot get info object ${content}`)
  // detect inline objects
  const objStart = objStarts[0]
  ret.tag = objStart.slice(1)
  const inline = content.match(`${objStart}[^<]*\/>`)
  if (inline !== null && indexOf(inline[0]) === indexOf(objStart)) {
    // inline case
    ret.params = parseParams(inline[0].match(/[^=\s]+="[^"]*?"/g))
    ret.xmlTag = inline[0]
  } else {
    // parent case
    let paramsStr = content.match(`${objStart}[^>]*?>`, 'g') // get the full tag
    ret.params = parseParams(paramsStr[0].match(/[^=\s]+="[^"]*?"/gm))
    ret.xmlTag = paramsStr[0]
  }
  return ret
}

//@todo remove recursion and get buffer instead of string in input

/**
 * 
 * @param {string} xmlStr XML string
 * @returns {import('./prototyping').XMLJS}
 */
function toJs(xmlStr) {
  const ret = {}
  const { params, xmlTag, tag } = getParam(xmlStr)
  ret.params = params
  ret.xmlTag = xmlTag
  ret.tag = tag
  ret.children = mapChildrenStr(ret.xmlTag, xmlStr, toJs)
  Object.setPrototypeOf(ret, helper)
  return ret
}

module.exports = {
  getParam,
  popNextXmlStr,
  toJs,
  mapChildrenStr,
}
