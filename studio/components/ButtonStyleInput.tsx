import {useCallback} from 'react'
import {set, unset, useFormValue, type StringInputProps} from 'sanity'
import {Select, Stack, Card} from '@sanity/ui'

const styles = [
  {value: 'link', label: 'Lien texte', bg: 'transparent', color: '#3b82f6', border: 'none', textDecoration: 'underline'},
  {value: 'default', label: 'Default', bg: '#ea580c', color: '#fff', border: 'none', textDecoration: 'none'},
  {value: 'secondary', label: 'Secondary', bg: '#262626', color: '#fafafa', border: 'none', textDecoration: 'none'},
  {value: 'outline', label: 'Outline', bg: 'transparent', color: '#fafafa', border: '1px solid #404040', textDecoration: 'none'},
  {value: 'ghost', label: 'Ghost', bg: 'transparent', color: '#fafafa', border: 'none', textDecoration: 'none'},
  {value: 'destructive', label: 'Destructive', bg: '#dc2626', color: '#fff', border: 'none', textDecoration: 'none'},
]

export function ButtonStyleInput(props: StringInputProps) {
  const {value, onChange, path} = props
  const parentPath = path.slice(0, -1)
  const label = useFormValue([...parentPath, 'label']) as string | undefined

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.currentTarget.value
      onChange(val ? set(val) : unset())
    },
    [onChange],
  )

  const current = styles.find((s) => s.value === value) || styles[0]

  return (
    <Stack space={3}>
      <Select value={value || ''} onChange={handleChange}>
        {styles.map((style) => (
          <option key={style.value} value={style.value}>
            {style.label}
          </option>
        ))}
      </Select>
      <Card padding={3} radius={2} shadow={1}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span style={{fontSize: '12px', color: '#888'}}>Aperçu :</span>
          <div
            style={{
              padding: current.value === 'link' ? '0' : '6px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              background: current.bg,
              color: current.color,
              border: current.border,
              textDecoration: current.textDecoration,
            }}
          >
            {label || current.label}
          </div>
        </div>
      </Card>
    </Stack>
  )
}
