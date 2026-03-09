import {defineType} from 'sanity'
import {MermaidInput} from '../components/MermaidInput'
import {MermaidBlockPreview} from '../components/MermaidBlockPreview'

export default defineType({
  name: 'mermaid',
  title: 'Mermaid Diagram',
  type: 'object',
  components: {
    input: MermaidInput,
    preview: MermaidBlockPreview,
  },
  fields: [
    {
      name: 'code',
      title: 'Mermaid Code',
      type: 'text',
      rows: 10,
    },
  ],
  preview: {
    select: {
      code: 'code',
    },
    prepare({code}) {
      return {
        title: 'Mermaid Diagram',
        subtitle: code || '',
      }
    },
  },
})
