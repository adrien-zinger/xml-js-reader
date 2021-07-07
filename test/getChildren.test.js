const { getParam, mapChildrenStr } = require('../src/internal/parsingTools')

test('Check if we can get childen str 1', () => {
  const children = '<mo bar="ko" ma="ko"></mo>'
  const content = `<gu ok="one" nok="two">${children}</gu>`
  let params = getParam(content)
  const res = mapChildrenStr(
    params.xmlTag,
    content,
    ({ xml_pop_object }) => xml_pop_object
  )
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 2', () => {
  const children = '<mo bar="ko" ma="ko"><na/></mo>'
  const content = `<gu ok="one" nok="two"> ${children}  </gu>`
  let params = getParam(content)
  const res = mapChildrenStr(
    params.xmlTag,
    content,
    ({ xml_pop_object }) => xml_pop_object
  )
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 3', () => {
  const children = ''
  const content = `<gu ok="one" nok="two"/>`
  let params = getParam(content)
  const res = mapChildrenStr(
    params.xmlTag,
    content,
    ({ xml_pop_object }) => xml_pop_object
  )
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 4', () => {
  const children = ''
  const content = `<gu ok="one" nok="two"   />`
  let params = getParam(content)
  const res = mapChildrenStr(
    params.xmlTag,
    content,
    ({ xml_pop_object }) => xml_pop_object
  )
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 5', () => {
  const children =
    '<mo bar="ko" ma="ko"><na/></mo><mo bar="ko" ma="ko"><na/></mo>'
  const content = `<gu ok="one" nok="two" > ${children} </gu>`
  let params = getParam(content)
  const res = mapChildrenStr(
    params.xmlTag,
    content,
    ({ xml_pop_object }) => xml_pop_object
  )
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 6', () => {
  const children =
    '<mo bar="ko" ma="ko"><gu>fds</gu></mo><mo bar="ko" ma="ko"><na/></mo>'
  const content = `<gu ok="one" nok="two" > ${children} </gu><mama>nok</mama>`
  let params = getParam(content)
  const res = mapChildrenStr(
    params.xmlTag,
    content,
    ({ xml_pop_object }) => xml_pop_object
  )
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 7', () => {
  const children = ''
  const content = `<gu ok="one" nok="two"></gu>`
  let params = getParam(content)
  const res = mapChildrenStr(
    params.xmlTag,
    content,
    ({ xml_pop_object }) => xml_pop_object
  )
  expect(res.join('')).toBe(children)
})
