/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useRef } from 'react'
import autosize from 'autosize'

function Textarea(props) {
  const textarea = useRef(null)
  useEffect(() => {
    autosize(textarea.current)
  }, [])

  return (
    <textarea
      ref={textarea}
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        display: 'block',
        width: '100%',
        fontSize: 4,
        padding: 2,
      }}
      {...props}
    />
  )
}

export { Textarea }
