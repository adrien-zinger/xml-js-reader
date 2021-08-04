const { toJs } = require('../src/internal/parsingTools')

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

test('Check if we can transform to js 3', () => {
  const content = `<gu ok="one" nok="two">hello<ma ok="three" nok="four"></ma></gu>`
  const js = toJs(content)
  expect(js).toStrictEqual({
    tag: 'gu',
    xmlTag: '<gu ok="one" nok="two">',
    params: { ok: 'one', nok: 'two' },
    children: [
      {
        params: {},
        tag: '',
        xmlTag: '',
        text: 'hello',
        children: [],
      },
      {
        tag: 'ma',
        xmlTag: '<ma ok="three" nok="four">',
        params: { ok: 'three', nok: 'four' },
        children: [],
      },
    ],
  })
})

test('Check if we can transform to js 4', () => {
  const content = `<gu ok="one" nok="two">hello<ma ok="three" nok="four">hello2</ma>hello3</gu>`
  const js = toJs(content)
  expect(js).toStrictEqual({
    tag: 'gu',
    xmlTag: '<gu ok="one" nok="two">',
    params: { ok: 'one', nok: 'two' },
    children: [
      {
        params: {},
        tag: '',
        xmlTag: '',
        text: 'hello',
        children: [],
      },
      {
        tag: 'ma',
        xmlTag: '<ma ok="three" nok="four">',
        params: { ok: 'three', nok: 'four' },
        children: [
          {
            params: {},
            tag: '',
            xmlTag: '',
            text: 'hello2',
            children: [],
          },
        ],
      },
      {
        params: {},
        tag: '',
        xmlTag: '',
        text: 'hello3',
        children: [],
      },
    ],
  })
})

test('Check if we can transform to js 5', () => {
  const content = `<gu ok="one" nok="two">
    \n\r hello<ma ok="three" nok="four">
      \t\n\r\thello2
      
      
      \n\r</ma>\nhello3
        \t\n\r</gu>`
  const js = toJs(content)
  expect(js).toStrictEqual({
    tag: 'gu',
    xmlTag: '<gu ok="one" nok="two">',
    params: { ok: 'one', nok: 'two' },
    children: [
      {
        params: {},
        tag: '',
        xmlTag: '',
        text: 'hello',
        children: [],
      },
      {
        tag: 'ma',
        xmlTag: '<ma ok="three" nok="four">',
        params: { ok: 'three', nok: 'four' },
        children: [
          {
            params: {},
            tag: '',
            xmlTag: '',
            text: 'hello2',
            children: [],
          },
        ],
      },
      {
        params: {},
        tag: '',
        xmlTag: '',
        text: 'hello3',
        children: [],
      },
    ],
  })
})

test('Check if we can transform to js 6', () => {
  const content = `<gu:ok ok="one" nok="two"/>`
  const js = toJs(content)
  expect(js).toStrictEqual({
    tag: 'gu:ok',
    xmlTag: content,
    params: { ok: 'one', nok: 'two' },
    children: [],
  })
})

test('Check if we can transform to js 7', () => {
  const content = `<gu:ok ok="one" nok="two"><ma:ok ok="three" nok="four"></ma:ok></gu:ok>`
  const js = toJs(content)
  expect(js).toStrictEqual({
    tag: 'gu:ok',
    xmlTag: '<gu:ok ok="one" nok="two">',
    params: { ok: 'one', nok: 'two' },
    children: [
      {
        tag: 'ma:ok',
        xmlTag: '<ma:ok ok="three" nok="four">',
        params: { ok: 'three', nok: 'four' },
        children: [],
      },
    ],
  })
})

test('Check if we can transform to js 8', () => {
  const content = `<gu ok="one" nok="two"/><gu ok="one" nok="two"/>`
  const js = toJs(content)
  expect(js).toStrictEqual([
    {
      tag: 'gu',
      xmlTag: '<gu ok="one" nok="two"/>',
      params: { ok: 'one', nok: 'two' },
      children: [],
    },
    {
      tag: 'gu',
      xmlTag: '<gu ok="one" nok="two"/>',
      params: { ok: 'one', nok: 'two' },
      children: [],
    },
  ])
})
