import {Stack, Card} from '@sanity/ui'
import {type ObjectInputProps} from 'sanity'
import {MermaidPreview} from './MermaidPreview'

export function MermaidInput(props: ObjectInputProps) {
  const code = (props.value as {code?: string})?.code

  return (
    <Stack space={4}>
      {props.renderDefault(props)}
      <Card padding={3} radius={2} shadow={1} style={{background: '#fafafa'}}>
        <MermaidPreview code={code} />
      </Card>
    </Stack>
  )
}
