const fs = require('fs')
const last = require('lodash.findlast')
const parser = require('posthtml-parser')
const render = require('posthtml-render')
const { parseComponent } = require('vue-template-compiler')

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
  const vue = parseComponent(source)
  const nodes = parser(source)

  const blocks = nodes
    .filter((node) => node.tag)
    .map((node) => {
      return {
        type: node.tag,
        content: trim(render(node.content)),
        attributes: node.attrs || [],
      }
    })

  const sfc = {
    _blocks: blocks,
  }

  SPECIAL_TAG.forEach((tag) => {
    sfc[tag] = last(blocks, (block) => block.type === tag) || null
  })

  if (sfc.template && vue.template) {
    sfc.template.content = trim(vue.template.content)
  }

  return sfc
}
