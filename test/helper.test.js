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
      children: [],
    },
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
      children: [],
    },
  ])
})

test('Check if we can get by path 1', () => {
  const content = `<a><b><c>the graal</c></b><b></b></a>`
  const js = toJs(content)
  const res = js.findByPath(['a', 'b', 'c'])
  expect(res).toStrictEqual([
    {
      params: {},
      xmlTag: '<c>',
      tag: 'c',
      children: [
        {
          params: {},
          xmlTag: '',
          tag: '',
          children: [],
          text: 'the graal',
        },
      ],
    },
  ])
})

test('Check if we can get by path 2', () => {
  const content = `<a><c>not this</c><b><c>the graal</c></b><b><c>the graal again !</c></b></a>`
  const js = toJs(content)
  const res = js.findByPath(['a', 'b', 'c'])
  expect(res).toStrictEqual([
    {
      params: {},
      xmlTag: '<c>',
      tag: 'c',
      children: [
        {
          params: {},
          xmlTag: '',
          tag: '',
          children: [],
          text: 'the graal again !',
        },
      ],
    },
    {
      params: {},
      xmlTag: '<c>',
      tag: 'c',
      children: [
        {
          params: {},
          xmlTag: '',
          tag: '',
          children: [],
          text: 'the graal',
        },
      ],
    },
  ])
})

test('Check if we can get by path 3', () => {
  const content = `<a><c>this</c><b><c>not the graal</c></b><b><c>not the graal again !</c></b></a>`
  const js = toJs(content)
  const res = js.findByPath(['a', 'c'])
  expect(res).toStrictEqual([
    {
      params: {},
      xmlTag: '<c>',
      tag: 'c',
      children: [
        {
          params: {},
          xmlTag: '',
          tag: '',
          children: [],
          text: 'this',
        },
      ],
    },
  ])
})

test('Test filter order', () => {
  const content = `<a>
    <b>this</b>
    <c>
      <d>not the graal</d>
    </c>
    <e>
      <f>not the graal again !</f>
    </e>
  </a>`
  const js = toJs(content)
  let res = ''
  js.filter((el) => res += el.tag)
  expect(res).toBe('abcdef')
})
