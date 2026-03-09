import {useEffect, useRef, useState} from 'react'
import mermaid from 'mermaid'

mermaid.initialize({startOnLoad: false, theme: 'default'})

export function MermaidPreview({code}: {code?: string}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!code || !containerRef.current) return

    setError(null)
    const id = `mermaid-${Date.now()}`

    mermaid
      .render(id, code)
      .then(({svg}) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      })
      .catch((err) => {
        setError(err.message || 'Invalid Mermaid syntax')
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }
      })
  }, [code])

  if (!code) {
    return <p style={{color: '#888', fontStyle: 'italic'}}>Enter Mermaid code above to see the preview</p>
  }

  return (
    <div>
      {error && (
        <p style={{color: '#e53e3e', fontSize: '0.85em', marginBottom: '0.5em'}}>{error}</p>
      )}
      <div ref={containerRef} />
    </div>
  )
}
