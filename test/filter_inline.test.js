const { toJs } = require('../src')

test('Test if filter doesnt mutate data', () => {
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
        params: {},
        xmlTag: '<e>',
        tag: 'e',
        children: [
          {
            params: {},
            xmlTag: '<f>',
            tag: 'f',
            children: [
              {
                params: {},
                tag: '',
                xmlTag: '',
                text: 'not the graal again !',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  })
  js.filter(() => true)
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
        params: {},
        xmlTag: '<e>',
        tag: 'e',
        children: [
          {
            params: {},
            xmlTag: '<f>',
            tag: 'f',
            children: [
              {
                params: {},
                tag: '',
                xmlTag: '',
                text: 'not the graal again !',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  })
})
