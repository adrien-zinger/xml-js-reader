const { toXml } = require('../src')

test('Test if we can get an xml plain text from obj 1', () => {
  const obj = {
    tag: 'a',
    children: [
      {
        tag: 'b',
        children: [
          {
            tag: '',
            text: 'test1',
          },
        ],
      },
      {
        tag: 'b',
        children: [
          {
            tag: '',
            text: 'test2',
          },
        ],
      },
    ],
  }
  const ret = toXml(obj)
  expect(ret).toBe('<a> <b> test1 </b><b> test2 </b> </a>')
})

test('Test if we can get an xml plain text from obj 2', () => {
  const obj = {
    tag: 'a',
    children: [
      {
        tag: 'b',
        children: ['test1'],
      },
      {
        tag: 'b',
        children: ['test2'],
      },
    ],
  }
  const ret = toXml(obj)
  expect(ret).toBe('<a> <b> test1 </b><b> test2 </b> </a>')
})

test('Test if we can get an xml plain text from obj 3', () => {
  const obj = {
    tag: 'a',
    children: [
      {
        tag: 'b',
        params: {
          ok: 'nok',
        },
        children: ['test1'],
      },
      {
        tag: 'b',
        children: ['test2'],
      },
    ],
  }
  const ret = toXml(obj)
  expect(ret).toBe('<a> <b ok="nok"> test1 </b><b> test2 </b> </a>')
})

test('Test if we can get an xml plain text from obj 3', () => {
  const obj = {
    tag: 'a',
    children: [
      {
        tag: 'b',
        params: {
          ok: 'nok',
        },
        children: ['test1'],
      },
      {
        tag: 'b',
        children: ['test2'],
      },
      {
        tag: 'c',
        params: {
          ok: 'nok',
        },
      },
    ],
  }
  const ret = toXml(obj)
  expect(ret).toBe(
    '<a> <b ok="nok"> test1 </b><b> test2 </b><c ok="nok" /> </a>'
  )
})
