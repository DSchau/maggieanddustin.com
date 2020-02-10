/** @jsx jsx */
import { jsx } from 'theme-ui'

import { getZIndex } from '../utils/get-z-index'

// Adapted from: https://codepen.io/aaroniker/pen/KGpXZo and https://github.com/narative/gatsby-theme-novela/blob/master/%40narative/gatsby-theme-novela/src/components/Navigation/Navigation.Header.tsx
const ColorModeToggle = ({ nextMode, mode, onClick, ...rest }) => {
  const ariaLabel = `Activate ${nextMode
    .slice(0, 1)
    .toUpperCase()}${nextMode.slice(1)} Mode`
  const isDark = mode !== `light`
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={ariaLabel}
      title={ariaLabel}
      sx={{
        opacity: 0.65,
        position: `relative`,
        borderRadius: `5px`,
        width: `40px`,
        height: `25px`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        transition: `opacity 0.3s ease`,
        border: `none`,
        outline: `none`,
        background: `none`,
        cursor: `pointer`,
        padding: 0,
        appearance: `none`,
        zIndex: getZIndex('toggle'),
        '&:hover, &:focus': { opacity: 1 },
      }}
      {...rest}
    >
      <div
        sx={theme => ({
          position: `relative`,
          width: `24px`,
          height: `24px`,
          borderRadius: `50%`,
          border: t => (isDark ? `4px solid ${t.colors.text}` : `none`),
          backgroundColor: isDark
            ? theme.colors.modes[nextMode].background
            : `transparent`,
          transform: isDark ? `scale(0.55)` : `scale(1)`,
          transition: `all 0.45s ease`,
          overflow: isDark ? `visible` : `hidden`,
          boxShadow: t =>
            isDark ? `none` : `inset 8px -8px 0px 0px ${t.colors.text}`,
          '&:before': {
            content: `""`,
            position: `absolute`,
            right: `-9px`,
            top: `-9px`,
            height: `24px`,
            width: `24px`,
            border: t => (isDark ? `2px solid ${t.colors.text}` : `none`),
            borderRadius: `50%`,
            transform: isDark ? `translate(14px, -14px)` : `translate(0, 0)`,
            opacity: isDark ? 0 : 1,
            transition: `transform 0.45s ease`,
          },
          '&:after': {
            content: `""`,
            width: `8px`,
            height: `8px`,
            borderRadius: `50%`,
            margin: `-4px 0 0 -4px`,
            position: `absolute`,
            top: `50%`,
            left: `50%`,
            boxShadow: t =>
              `0 -23px 0 ${t.colors.text}, 0 23px 0 ${t.colors.text}, 23px 0 0 ${t.colors.text}, -23px 0 0 ${t.colors.text}, 15px 15px 0 ${t.colors.text}, -15px 15px 0 ${t.colors.text}, 15px -15px 0 ${t.colors.text}, -15px -15px 0 ${t.colors.text}`,
            transform: isDark ? `scale(1)` : `scale(0)`,
            transition: `all 0.35s ease`,
          },
        })}
      />
    </button>
  )
}

export default ColorModeToggle
