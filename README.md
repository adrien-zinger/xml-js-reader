# XML to Javascript

Tool to read xml server responses and transform it into javascript.

## Example

```js
const content = `<gu ok="one" nok="two">hello<ma ok="three" nok="four"></ma></gu>`
const js = toJs(content)
console.log(js)
```

Output

```json
{
  "tag": "gu",
  "xmlTag": "<gu ok=\"one\" nok=\"two\">",
  "params": { "ok": "one", "nok": "two" },
  "children": [
    {
      "params": {},
      "tag": "",
      "xmlTag": "",
      "text": "hello",
      "children": [],
    },
    {
      "tag": "ma",
      "xmlTag": "<ma ok=\"three\" nok=\"four\">",
      "params": { "ok": "three", "nok": "four" },
      "children": [],
    },
  ],
}
```

Then you can reverse the process

```js
console.(toXML(js))
```

Output

`<gu ok="one" nok="two">hello<ma ok="three" nok="four"></ma></gu>`


## Object

### Inline closed element
```xml
<ma ok="three" nok="four" />
```

```json
    {
      "tag": "ma",
      "xmlTag": "<ma ok=\"three\" nok=\"four\" />",
      "params": { "ok": "three", "nok": "four" },
      "children": [],
    }
```

### Parent element
```xml
<gu ok="one" nok="two">
  <ma ok="three" nok="four" />
</gu>
```

```json
{
  "tag": "gu",
  "xmlTag": "<gu ok=\"one\" nok=\"two\">",
  "params": { "ok": "one", "nok": "two" },
  "children": [
    {
      "tag": "ma",
      "xmlTag": "<ma ok=\"three\" nok=\"four\" />",
      "params": { "ok": "three", "nok": "four" },
      "children": [],
    },
  ],
}
```

### Text in element
```xml
<gu ok="one" nok="two">
  Hello
</gu>
```

```json
{
  "tag": "gu",
  "xmlTag": "<gu ok=\"one\" nok=\"two\">",
  "params": { "ok": "one", "nok": "two" },
  "children": [
    {
      "params": {},
      "tag": "",
      "xmlTag": "",
      "text": "hello",
      "children": [],
    },
  ],
}
```

## Prototype function

```js
function callback(element) {
  return true
}

js.filter(callback)
js.findByTag('ma')
js.findByParam('ok', 'three')
js.findByPath(['a', 'b', 'c'])
```

- `filter` Return all elements from the root where callback return true.
- `findByTag` Return all elements from the root where tag equals.
- `findByParam` Return all elements from the root where param is the first arguments and the value is the second.
- `findByPath` Return all elements from the root where the path of tags to access is the ordered list of strings.

The filter function respect the order of occurences from top to bottom.

## Bug report

You can contribute to this project, report issues and propose features.
- Propose a feature that make sens by presenting a frequent usecase.
- Report a bug with arguments, input and your expected output. Explain also you usecase.
- Propose a pull request, start coding from the latest commit of master. Add unit tests and run all tests in the project.
