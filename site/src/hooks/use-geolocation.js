import * as React from 'react'

export function useGeolocation(callback) {
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callback)
    }
  }, [])
}
