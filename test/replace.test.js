const { toJs } = require('../src')

test('Test if we can replace 1', () => {
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
  js.replace({ tag: 'e' }, toJs('<ee ok="ok" />'))
  expect(js).toStrictEqual({
    params: {},
    xmlTag: '<a>',
    tag: 'a',
    children: [
      {
        params: {},
        xmlTag: '<b>',
        tag: 'b',
        children: [
          {
            params: {},
            tag: '',
            xmlTag: '',
            text: 'this',
            children: [],
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
            xmlTag: '<d>',
            tag: 'd',
            children: [
              {
                params: {},
                tag: '',
                xmlTag: '',
                text: 'not the graal',
                children: [],
              },
            ],
          },
        ],
      },
      {
        params: {
          ok: 'ok',
        },
        xmlTag: '<ee ok="ok" />',
        tag: 'ee',
        children: [],
      },
    ],
  })
})

test('Test if we can replace 2', () => {
  const content = `<a>
    <b>this</b>
  </a>`
  const js = toJs(content)
  const to = toJs('<ee ok="ok" /><ee ok="nok" />')
  js.replace({ tag: 'b' }, to)
  expect(js).toStrictEqual({
    children: [
      {
        children: [],
        params: {
          ok: 'ok',
        },
        tag: 'ee',
        xmlTag: '<ee ok="ok" />',
      },
      {
        children: [],
        params: {
          ok: 'nok',
        },
        tag: 'ee',
        xmlTag: '<ee ok="nok" />',
      },
    ],
    params: {},
    tag: 'a',
    xmlTag: '<a>',
  })
})
