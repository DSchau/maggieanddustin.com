/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import React, { useCallback, useEffect, useState } from 'react'
import GatsbyImage from 'gatsby-image'

import { Controlled as ControlledZoom } from 'react-medium-image-zoom'

import 'react-medium-image-zoom/dist/styles.css'

function Image({ zoom, isZoomed = false, width = '85vw', ...props }) {
  const [mode] = useColorMode()
  const [zoomed, setZoomed] = useState(isZoomed)
  const [ZoomElement, setZoomEl] = useState(React.Fragment)
  const Wrapper = props.fluid || props.fixed ? GatsbyImage : 'img'
  const handleZoomChange = useCallback(shouldZoom => {
    setZoomed(shouldZoom)
  }, [])
  useEffect(() => {
    setZoomEl(ControlledZoom)
  }, [])
  if (zoom) {
    const darkModeProps =
      mode === 'dark'
        ? {
            overlayBgColorStart: 'rgba(0, 0, 0, 0)',
            overlayBgColorEnd: 'rgba(0, 0, 0, 0.95)',
          }
        : {}
    return (
      <button
        sx={{ background: 'transparent', border: 'none', fontSize: 0 }}
        onClick={() => setZoomed(!zoomed)}
      >
        <ZoomElement
          {...darkModeProps}
          isZoomed={zoomed}
          onZoomChange={handleZoomChange}
        >
          <Wrapper {...props} sx={{ display: 'block', width }} />
        </ZoomElement>
      </button>
    )
  }
  return <Wrapper sx={{ display: 'block', maxWidth: '100%' }} {...props} />
}

export default Image
