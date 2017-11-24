import test from 'ava'
import {
  parse
} from '.'

test('basic', async(t) => {
  t.deepEqual(parse(`
    <config>
    {
      "name": "mina"
    }
    </config>

    <style>
    text.blue {
      color: #00f;
      background: url(logo.png);
    }
    </style>

    <template a="hello">
      <view>
        <text class="blue">{{msg}}</text>
        <image src="logo.png" />
      </view>
    </template>

    <script>
      console.log('meow~')
    </script>
  `), {
    "_blocks": [{
      "type": "config",
      "content": "{\n      \"name\": \"mina\"\n    }",
      "attributes": {}
    }, {
      "type": "style",
      "content": "text.blue {\n      color: #00f;\n      background: url(logo.png);\n    }",
      "attributes": {}
    }, {
      "type": "template",
      "content": "<view>\n  <text class=\"blue\">{{msg}}</text>\n  <image src=\"logo.png\" />\n</view>",
      "attributes": {
        "a": "hello"
      }
    }, {
      "type": "script",
      "content": "console.log('meow~')",
      "attributes": {}
    }],
    "config": {
      "type": "config",
      "content": "{\n      \"name\": \"mina\"\n    }",
      "attributes": {}
    },
    "script": {
      "type": "script",
      "content": "console.log('meow~')",
      "attributes": {}
    },
    "style": {
      "type": "style",
      "content": "text.blue {\n      color: #00f;\n      background: url(logo.png);\n    }",
      "attributes": {}
    },
    "template": {
      "type": "template",
      "content": "<view>\n  <text class=\"blue\">{{msg}}</text>\n  <image src=\"logo.png\" />\n</view>",
      "attributes": {
        "a": "hello"
      }
    }
  })
})

test('some blocks missing', async(t) => {
  t.deepEqual(parse(`
    <config>{}</config>
    <script>console.log('meow~')</script>
  `), {
    "_blocks": [{
      "type": "config",
      "content": "{}",
      "attributes": {}
    }, {
      "type": "script",
      "content": "console.log('meow~')",
      "attributes": {}
    }],
    "config": {
      "type": "config",
      "content": "{}",
      "attributes": {}
    },
    "script": {
      "type": "script",
      "content": "console.log('meow~')",
      "attributes": {}
    },
    "style": null,
    "template": null
  })
})

test('should not convert <image /> to <img> or <image></image>', async(t) => {
  let template = '<image />'
  t.deepEqual(parse(`<template>${template}</template>`).template.content, template)
})

test('should not convert <image></image> to <image />', async(t) => {
  let template = '<image></image>'
  t.deepEqual(parse(`<template>${template}</template>`).template.content, template)
})
