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
      "attrs": []
    }, {
      "type": "style",
      "content": "text.blue {\n      color: #00f;\n      background: url(logo.png);\n    }",
      "attrs": []
    }, {
      "type": "template",
      "content": "<view>\n        <text class=\"blue\">{{msg}}</text>\n        <img src=\"logo.png\">\n      </view>",
      "attrs": [{
        "name": "a",
        "value": "hello"
      }]
    }, {
      "type": "script",
      "content": "console.log('meow~')",
      "attrs": []
    }],
    "config": {
      "type": "config",
      "content": "{\n      \"name\": \"mina\"\n    }",
      "attrs": []
    },
    "script": {
      "type": "script",
      "content": "console.log('meow~')",
      "attrs": []
    },
    "style": {
      "type": "style",
      "content": "text.blue {\n      color: #00f;\n      background: url(logo.png);\n    }",
      "attrs": []
    },
    "template": {
      "type": "template",
      "content": "<view>\n        <text class=\"blue\">{{msg}}</text>\n        <img src=\"logo.png\">\n      </view>",
      "attrs": [{
        "name": "a",
        "value": "hello"
      }]
    }
  })
})
