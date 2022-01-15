import React from 'react'

export function useWindowDimensions({ onResize = true } = {}) {
  const [dimensions, setDimensions] = React.useState({
    height: undefined,
    width: undefined,
  })

  const resize = () => {
    const newDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    setDimensions(newDimensions)
  }

  React.useEffect(() => {
    resize()

    if (onResize) {
      window.addEventListener('resize', resize)
    }

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return dimensions
}
