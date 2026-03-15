import Block from './Block.svelte'
import Code from '../Code.svelte'
import Mermaid from '../Mermaid.svelte'

export const portableTextComponents = {
  block: Block,
  types: {
    code: Code,
    mermaid: Mermaid,
  },
}
