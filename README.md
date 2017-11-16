# mina-sfc
> mina single-file-component for wechat mini program, inspried by vue.js

## Installation
```bash
npm i --save @tinajs/mina-sfc
```

## Usage

node.js:
```babel
const { parse } = require('@tinajs/mina-sfc')

console.log(parse(`
  <config>{}</config>
  <script>console.log('meow~')</script>
`))
```

output:
```json
{
  "_blocks": [{
    "type": "config",
    "content": "{}",
    "attributes": []
  }, {
    "type": "script",
    "content": "console.log('meow~')",
    "attributes": []
  }],
  "config": {
    "type": "config",
    "content": "{}",
    "attributes": []
  },
  "script": {
    "type": "script",
    "content": "console.log('meow~')",
    "attributes": []
  },
  "style": null,
  "template": null
}
```

## API
### parse(source:String)
Returns sfc object


## Mina SFC Object
### Block Struct
- type

  The tag name

- content

  The raw content

- attributes

  The attributes array

  - name
  - value

### Special Block
- config
- style
- template
- script

## Related
- [mina-loader](https://github.com/imyelo/mina-webpack/tree/master/packages/mina-loader)
- [vue sfc](https://github.com/vuejs/vue/blob/dev/src/sfc/parser.js)
- [vue template compiler](https://www.npmjs.com/package/vue-template-compiler)

## License
MIT @ [yelo](https://github.com/imyelo)
