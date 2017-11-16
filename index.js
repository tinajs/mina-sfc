const parse5 = require('parse5')
const last = require('lodash.findlast')

const SPECIAL_TAG = [
  'config',
  'script',
  'style',
  'template',
]

function trim (value) {
  if (typeof value !== 'string') {
    return value
  }
  return value.trim()
}

exports.parse = function parse (source) {
  const root = parse5.parseFragment(source)

  const blocks = root.childNodes
    .filter((node) => node.tagName)
    .map((node) => {
      return {
        type: node.tagName,
        content: trim(parse5.serialize(node.content || node)),
        attributes: node.attrs,
      }
    })

  const sfc = {
    _blocks: blocks,
  }

  SPECIAL_TAG.forEach((tag) => {
    sfc[tag] = last(blocks, (block) => block.type === tag) || null
  })

  return sfc
}
