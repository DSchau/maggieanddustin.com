/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import styled from '@emotion/styled'

export default props => {
  const [mode, setMode] = useColorMode('light')
  const isDark = mode === 'dark'
  return (
    <IconWrapper
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      data-a11y="false"
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
      {...props}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  )
}

const IconWrapper = styled.button`
  background-color: transparent;
  border: none;
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  outline: none;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin-left: 30px;
  &:hover {
    opacity: 1;
  }
  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }
`

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${p => (p.isDark ? '4px' : '2px')} solid
    ${p => (p.isDark ? p.theme.colors.accent : p.theme.colors.text)};
  background: ${p => (p.isDark ? p.theme.colors.accent : p.theme.colors.text)};
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${p => (p.isDark ? 'visible' : 'hidden')};
  &::before {
    content: '';
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid
      ${p => (p.isDark ? p.theme.colors.accent : p.theme.colors.text)};
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? '14px, -14px' : '0, 0')});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }
  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${p => (p.isDark ? p.theme.colors.accent : p.theme.colors.text)},
      0 23px 0 ${p => (p.isDark ? p.theme.colors.accent : p.theme.colors.text)},
      23px 0 0 ${p => (p.isDark ? p.theme.colors.accent : p.theme.colors.text)},
      -23px 0 0 ${p => (p.isDark ? p.theme.colors.accent : p.theme.colors.text)},
      15px 15px 0
        ${p => (p.isDark ? p.theme.colors.accent : p.theme.colors.text)},
      -15px 15px 0 ${p => (p.isDark ? p.theme.colors.accent : p.theme.colors.text)},
      15px -15px 0 ${p => (p.isDark ? p.theme.colors.accent : p.theme.colors.text)},
      -15px -15px 0
        ${p => (p.isDark ? p.theme.colors.accent : p.theme.colors.text)};
    transition: all 0.35s ease;
    transform: scale(${p => (p.isDark ? 0.92 : 0)});
  }
`

const MoonMask = styled.div`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: ${p => p.theme.colors.background};
  transform: translate(${p => (p.isDark ? '14px, -14px' : '0, 0')});
  opacity: ${p => (p.isDark ? 0 : 1)};
  transition: ${p => p.theme.colorModeTransition}, transform 0.45s ease;
`
