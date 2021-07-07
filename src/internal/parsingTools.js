const helper = require('./prototyping')

/**
 * @typedef {nextXml}
 * @type {object}
 * @see popNextXmlStr
 * @property {string} xml_content new content
 * @property {string} xml_pop_object object pop from content
 * @property {string} xml_pop_text text pop from content
 */

/**
 * Pop the next xml object list of xml object
 * @param {string} children xml children
 * @returns {nextXml} An array composed of remaining xml object
 * in a xml string and a string containing the object
 */
function popNextXmlStr(content) {
  const indexOf = (str) => content.indexOf(str)
  const end = content.match(/^[\s]*<\//g)
  if (end) {
    return {
      xml_content: content
    }
  }
  const objStarts = content.match(/<[\w-]+/g)
  // Check if there is a text before
  if (objStarts === null) {
    if (content.length > 0) {
      const endtag = content.match(/<\/[\w-]+/g)
      return {
        xml_content: '',
        xml_pop_text: content.slice(0, content.indexOf(endtag)).trim()
      }
    }
    return { xml_content: '' } // nothing to return
  }
  if (content.indexOf(objStarts) > 0) {
    const text = content.slice(0, content.indexOf(objStarts)).trim()
    if (text !== '') {
      return {
        xml_content: content.slice(content.indexOf(objStarts)),
        xml_pop_text: text
      }
    }
  }
  // detect inline objects
  const objStart = objStarts[0]
  const inline = content.match(`${objStart}[^<]+\/>`)
  if (inline !== null && indexOf(inline[0]) === indexOf(objStart)) {
    return [content.slice(inline[0].length), inline[0]]
  }
  // Match a parent object
  const obj = content.match(`${objStart}[^]+?</${objStart.slice(1)}>`)
  if (obj === null) {
    throw Error(`Cannot completely pull the object ${objStart}`)
  }
  return {
    xml_content: content.slice(indexOf(objStart) + obj[0].length),
    xml_pop_object: obj[0]
  }
}

/**
 * This callback is displayed as part of the Requester class.
 * @callback mapEachChildren
 * @param {nextXml} next popped xml from "popNextXmlStr"
 * @returns {object} What do you want to push in the returned list for this
 */

/**
 * 
 * @param {*} xmlTag Tag of the given plain text xml
 * @param {string} xmlStr should be plain text xml
 * @param {mapEachChildren} cb 
 * @returns {Array} list of mapped
 */
function mapChildrenStr(xmlTag, xmlStr, cb) {
  let ret = []
  let children = xmlStr.slice(xmlTag.length)
  for (
    let next = popNextXmlStr(children);
    next.xml_pop_object != undefined || next.xml_pop_text != undefined;
    ret.push(cb(next)),
      children = next.xml_content,   // on peu wrap ces deux ligne ?
      next = popNextXmlStr(children)
  );
  return ret
}

function parseParams(str) {
  const params = {}
  if (str)
    for (const param of str) {
      const group = param.match(/([^=]+)="([^"]*)"/)
      if (group === null) {
        throw Error(`Parsing: Unable to parse a parameter ${param}`)
      }
      const [, key, value] = group
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

//@todo remove recursion (transform xmlToJsBuid to a generator)

/**
 * 
 * @param {nextXml} nextXml 
 */
function xmlToJsBuild(nextXml) {
  const ret = {}
  if (nextXml.xml_pop_text) {
    ret.params = {}
    ret.tag = ''
    ret.xmlTag = ''
    ret.text = nextXml.xml_pop_text
    ret.children = []
  } else {
    const pop = nextXml.xml_pop_object
    const { params, xmlTag, tag } = getParam(pop)
    ret.params = params
    ret.xmlTag = xmlTag
    ret.tag = tag
    ret.children = mapChildrenStr(ret.xmlTag, pop, xmlToJsBuild)
  }
  Object.setPrototypeOf(ret, helper)
  return ret
}

/**
 * 
 * @param {string} xmlStr XML string
 * @returns {import('./prototyping').XMLJS}
 */
function toJs(xmlStr) {
  return xmlToJsBuild({
    xml_pop_object: xmlStr,
  })
}

module.exports = {
  getParam,
  popNextXmlStr,
  toJs,
  mapChildrenStr,
}
