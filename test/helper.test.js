const { toJs } = require('../src/internal/parsingTools')

test('Check if we can get by tag 1', () => {
  const content = `<gu ok="one" nok="two"><ma ok="three" nok="four"></ma></gu>`
  const js = toJs(content)
  const res = js.findByTag('ma')
  expect(res).toStrictEqual([
    {
      params: { ok: 'three', nok: 'four' },
      xmlTag: '<ma ok="three" nok="four">',
      tag: 'ma',
      children: []
    }
  ])
})

test('Check if we can get by param 1', () => {
  const content = `<gu ok="one" nok="two"><ma ok="three" nok="four"></ma></gu>`
  const js = toJs(content)
  const res = js.findByParam('ok', 'three')
  expect(res).toStrictEqual([
    {
      params: { ok: 'three', nok: 'four' },
      xmlTag: '<ma ok="three" nok="four">',
      tag: 'ma',
      children: []
    }
  ])
})
