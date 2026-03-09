import {type PreviewProps} from 'sanity'
import {MermaidPreview} from './MermaidPreview'

export function MermaidBlockPreview(props: PreviewProps) {
  // The code is mapped to subtitle via preview.prepare()
  const code = props.subtitle as string | undefined

  return (
    <div style={{padding: '1em'}}>
      <MermaidPreview code={code} />
    </div>
  )
}
