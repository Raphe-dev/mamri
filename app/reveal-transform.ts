import type { NodeTransform, AttributeNode, DirectiveNode, ElementNode } from '@vue/compiler-core'
import { NodeTypes } from '@vue/compiler-core'

function extraClass(dir: DirectiveNode) {
  const names = dir.modifiers.map(m => m.content)
  if (names.includes('left')) return 'reveal reveal-left'
  if (names.includes('right')) return 'reveal reveal-right'
  return 'reveal'
}

export const revealTransform: NodeTransform = (node) => {
  if (node.type !== NodeTypes.ELEMENT) return
  const el = node as ElementNode
  const dir = el.props.find(
    (prop): prop is DirectiveNode => prop.type === NodeTypes.DIRECTIVE && prop.name === 'reveal'
  )
  if (!dir) return

  const add = extraClass(dir)
  const staticClass = el.props.find(
    (prop): prop is AttributeNode => prop.type === NodeTypes.ATTRIBUTE && prop.name === 'class'
  )

  if (staticClass?.value) {
    const current = staticClass.value.content.split(/\s+/).filter(Boolean)
    for (const token of add.split(' ')) {
      if (!current.includes(token)) current.push(token)
    }
    staticClass.value.content = current.join(' ')
    return
  }

  el.props.unshift({
    type: NodeTypes.ATTRIBUTE,
    name: 'class',
    nameLoc: el.loc,
    value: {
      type: NodeTypes.TEXT,
      content: add,
      loc: el.loc
    },
    loc: el.loc
  })
}
