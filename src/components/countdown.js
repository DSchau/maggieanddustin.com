"client export"
/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { useState, useEffect } from 'react'

const zeroPad = (unit) => (unit <= 9 ? `0${unit}` : unit)

const getUnits = (diff) => {
  const units = {
    // structure
    // year: 31536000,
    // month: 2592000,
    // week: 604800, // uncomment row to ignore
    days: 86400, // feel free to add your own row
    hours: 3600,
    minutes: 60,
    seconds: 1,
  }

  let seconds = diff / 1000

  return Object.keys(units).reduce((collection, key) => {
    collection[key] = Math.floor(seconds / units[key])
    seconds -= collection[key] * units[key]
    return collection
  }, {})
}

export const useCountdown = (endTime, startTime) => {
  const [diff, setDiff] = useState(endTime - startTime)
  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(endTime - Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  return getUnits(diff <= 0 ? 0 : diff)
}

export default function Countdown({
  endTime,
  startTime = Date.now(),
  ...rest
}) {
  const { days, hours, minutes } = useCountdown(endTime, startTime)
  return (
    <Styled.div
      sx={{ display: `flex`, margin: '0 auto', justifyContent: `center` }}
      {...rest}
    >
      {[
        [days, `days`],
        [hours, `hours`],
        [minutes, `minutes`],
      ].map(([value, label]) => (
        <Styled.div
          key={label}
          sx={{ pl: [2, 4], pr: [2, 4], textAlign: `center` }}
        >
          <Styled.h2 sx={{ fontSize: [24, 40, 60], mb: 0 }}>
            {zeroPad(value)}
          </Styled.h2>
          <Styled.h3
            sx={{ fontSize: [16, 22, 24], mb: 0, textTransform: `uppercase` }}
          >
            {label}
          </Styled.h3>
        </Styled.div>
      ))}
    </Styled.div>
  )
}
