/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { keyframes } from '@emotion/core'
import { MdClose } from 'react-icons/md'

const fadeInAnimation = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

const dropDownAnimation = keyframes({
  from: {
    transform: `scaleY(0)`,
  },
  to: {
    transform: `scaleY(1)`,
  },
})

const BANNER_HEIGHT = 40
const LOCALSTORAGE_PREFIX = `maggieanddustin:banner`
const ANIMATION_DELAY = 500
const FIRST_STAGE_ANIMATION_DURATION = 300

const wrapperStyles = theme => ({
  minHeight: BANNER_HEIGHT,
  background: theme.colors.text,
  color: theme.colors.background,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  fontSize: theme.fontSizes[1],
  fontWeight: `bold`,
  animation: `${dropDownAnimation} ${FIRST_STAGE_ANIMATION_DURATION}ms ${ANIMATION_DELAY}ms both`,
  transformOrigin: `top center`,
})

const edgeColumnStyles = () => ({
  width: BANNER_HEIGHT,
  display: `grid`,
  placeItems: `center`,
})

const textStyles = () => ({
  flex: 1,
  textAlign: `center`,
  animation: `${fadeInAnimation} 400ms ${ANIMATION_DELAY +
    FIRST_STAGE_ANIMATION_DURATION}ms both`,
})
const closeButtonStyles = theme => ({
  display: `flex`,
  placeContent: `center`,
  width: BANNER_HEIGHT,
  height: BANNER_HEIGHT,
  border: `none`,
  background: `transparent`,
  color: `inherit`,
  fontSize: theme.fontSizes[4],
  padding: 0,
})

const whiteLinkStyles = () => ({
  color: 'inherit',
})

const availableBanners = {
  announcement: {
    contents: (
      <>We can't wait to see you! August 8th, 2020 &bull; Minneapolis, MN</>
    ),
    condition: () => {
      return true
    },
  },
}

const Banner = ({ id }) => {
  const { contents, condition } = availableBanners[id]

  const localStorageKey = `${LOCALSTORAGE_PREFIX}-${id}-dismissed`

  const bannerStatus = getBannerStatus(localStorageKey)

  const [showBanner, setShowBanner] = React.useState(bannerStatus === 'visible')

  if (!showBanner) {
    return null
  }

  if (!condition()) {
    return null
  }

  return (
    <Styled.div sx={wrapperStyles}>
      <Styled.div sx={edgeColumnStyles} />
      <span sx={textStyles}>{contents}</span>
      <span sx={edgeColumnStyles}>
        <button
          sx={closeButtonStyles}
          aria-label="Dismiss banner"
          onClick={() => {
            window.localStorage.setItem(localStorageKey, true)
            setShowBanner(false)
          }}
        >
          <MdClose />
        </button>
      </span>
    </Styled.div>
  )
}

const getBannerStatus = localStorageKey => {
  // Don't include visible banner in SSR
  if (typeof window === 'undefined') {
    return 'dismissed'
  }

  const hasPreviouslyDismissed =
    window.localStorage.getItem(localStorageKey) === 'true'

  return hasPreviouslyDismissed ? 'dismissed' : 'visible'
}

export default Banner
