const {
  getParam,
  mapChildrenStr,
  toJs,
} = require('../src/internal/parsingTools')

test('Check if we can get a inline object', () => {
  let params = getParam('<gu ok="one" nok="two" />')
  expect(params.tag).toBe('gu')
  expect(params.params).toStrictEqual({ ok: 'one', nok: 'two' })
})

test('Check if we can get a inline object 2', () => {
  let params = getParam(`<gu ok="one"
    nok="two" />`)
  expect(params.tag).toBe('gu')
  expect(params.params).toStrictEqual({ ok: 'one', nok: 'two' })
})

test('Check if we can get a inline object 3', () => {
  let params = getParam(`<gu ok="one"
    nok="two"/>`)
  expect(params.tag).toBe('gu')
  expect(params.params).toStrictEqual({ ok: 'one', nok: 'two' })
})

test('Check if we can get a inline object 4', () => {
  let params = getParam(`<gu/>`)
  expect(params.tag).toBe('gu')
  expect(params.params).toStrictEqual({})
})

test('Check if we can get a parent object 1', () => {
  let params = getParam(
    '<gu ok="one" nok="two"><mo bar="ko" ma="ko"></mo></gu>'
  )
  expect(params.tag).toBe('gu')
  expect(params.params).toStrictEqual({ ok: 'one', nok: 'two' })
})

test('Check if we can get childen str 1', () => {
  const children = '<mo bar="ko" ma="ko"></mo>'
  const content = `<gu ok="one" nok="two">${children}</gu>`
  let params = getParam(content)
  const res = mapChildrenStr(params.xmlTag, content, (child) => child)
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 2', () => {
  const children = '<mo bar="ko" ma="ko"><na/></mo>'
  const content = `<gu ok="one" nok="two"> ${children}  </gu>`
  let params = getParam(content)
  const res = mapChildrenStr(params.xmlTag, content, (child) => child)
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 3', () => {
  const children = ''
  const content = `<gu ok="one" nok="two"/>`
  let params = getParam(content)
  const res = mapChildrenStr(params.xmlTag, content, (child) => child)
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 4', () => {
  const children = ''
  const content = `<gu ok="one" nok="two"   />`
  let params = getParam(content)
  const res = mapChildrenStr(params.xmlTag, content, (child) => child)
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 5', () => {
  const children =
    '<mo bar="ko" ma="ko"><na/></mo><mo bar="ko" ma="ko"><na/></mo>'
  const content = `<gu ok="one" nok="two" > ${children} </gu>`
  let params = getParam(content)
  const res = mapChildrenStr(params.xmlTag, content, (child) => child)
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 6', () => {
  const children =
    '<mo bar="ko" ma="ko"><gu>fds</gu></mo><mo bar="ko" ma="ko"><na/></mo>'
  const content = `<gu ok="one" nok="two" > ${children} </gu><mama>nok</mama>`
  let params = getParam(content)
  const res = mapChildrenStr(params.xmlTag, content, (child) => child)
  expect(res.join('')).toBe(children)
})

test('Check if we can get childen str 7', () => {
  const children = ''
  const content = `<gu ok="one" nok="two"></gu>`
  let params = getParam(content)
  const res = mapChildrenStr(params.xmlTag, content, (child) => child)
  expect(res.join('')).toBe(children)
})

test('Check if we can transform to js 1', () => {
  const content = `<gu ok="one" nok="two"/>`
  const js = toJs(content)
  expect(js).toStrictEqual({
    tag: 'gu',
    xmlTag: content,
    params: { ok: 'one', nok: 'two' },
    children: [],
  })
})

test('Check if we can transform to js 2', () => {
  const content = `<gu ok="one" nok="two"><ma ok="three" nok="four"></ma></gu>`
  const js = toJs(content)
  expect(js).toStrictEqual({
    tag: 'gu',
    xmlTag: '<gu ok="one" nok="two">',
    params: { ok: 'one', nok: 'two' },
    children: [
      {
        tag: 'ma',
        xmlTag: '<ma ok="three" nok="four">',
        params: { ok: 'three', nok: 'four' },
        children: [],
      },
    ],
  })
})
