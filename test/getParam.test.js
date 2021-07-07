const {
  getParam,
} = require('../src/internal/parsingTools')

test('Check if we can get a inline object', () => {
  let params = getParam('<gu ok="one" nok="two" />')
  expect(params.tag).toBe('gu')
  expect(params.params).toStrictEqual({ ok: 'one', nok: 'two' })
})

test('Check if we can get a parent object 1', () => {
  let params = getParam(
    '<gu ok="one" nok="two"><mo bar="ko" ma="ko"></mo></gu>'
  )
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

test('Check if we can get a inline object 5', () => {
  let params = getParam(`<gu     \n  />`)
  expect(params.tag).toBe('gu')
  expect(params.params).toStrictEqual({})
})

test('Check if we can get a inline object 6', () => {
  let params = getParam(`<gu \n\r ok="one" \t
    \n \r nok="two"/>`)
  expect(params.tag).toBe('gu')
  expect(params.params).toStrictEqual({ ok: 'one', nok: 'two' })
})
