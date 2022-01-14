import React from 'react'
import createGlobe from 'cobe'
import { useColorMode } from 'theme-ui'

import { useWindowDimensions } from '../hooks/use-window-dimensions'

const getDimensions = ({ width, height }, pixelRatio = 2) => {
  const min = Math.min(height, width) || 0

  return {
    width: width * pixelRatio,
    height: height * pixelRatio,
  }
}

const getColors = (mode) => {
  const lookup = {
    light: {
      dark: 1,
      baseColor: [0.5, 0.5, 0.5],
      markerColor: [1, 0.5, 0],
      glowColor: [1, 1, 1],
    },
    dark: {
      dark: 0,
      baseColor: [1, 1, 1],
      glowColor: [0, 0, 0],
    },
  }

  return lookup[mode] || lookup.light
}

function Globe(props) {
  const [mode] = useColorMode()
  const canvas = React.useRef()
  const globe = React.useRef()
  const { height, width } = useWindowDimensions()

  React.useEffect(() => {
    let phi = 0

    if (height > 0 && !globe.current) {
      globe.current = createGlobe(canvas.current, {
        devicePixelRatio: 2,
        ...getDimensions({ height, width }),
        ...getColors(mode),
        mapBrightness: 12,
        phi: 0,
        theta: 0,
        diffuse: 1.5,
        mapSamples: 10000,
        markers: [
          { location: [41.400347, 2.159592], size: 0.05 },
          { location: [13.475017, 104.031224], size: 0.05 },
          { location: [13.881591, 100.644533], size: 0.05 },
          { location: [37.182504, -3.601235], size: 0.05 },
          { location: [37.778008, -122.431272], size: 0.05 },
          { location: [20.67759, -156.431947], size: 0.05 },
          { location: [42.346301, -95.468334], size: 0.05 },
          { location: [44.96313, -93.266563], size: 0.05 },
          { location: [32.08088, 34.78057], size: 0.05 },
        ],
        onRender: (state) => {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          state.phi = phi
          phi += 0.025

          const dimensions = getDimensions({ height, width })
          const colors = getColors(mode)

          const toUpdate = Object.assign({}, dimensions, colors)

          Object.keys(toUpdate).forEach((key) => {
            state[key] = toUpdate[key]
          })
        },
      })
    }

    return () => {
      // TODO: clean up memory leak
      if (globe.current) {
        // globe.current.destroy()
      }
    }
  }, [height, width, mode])

  return (
    <canvas
      ref={canvas}
      style={getDimensions({ height, width }, 1)}
      {...props}
    />
  )
}

export { Globe }
