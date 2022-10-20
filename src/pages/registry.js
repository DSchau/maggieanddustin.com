"client export"
/** @jsx jsx */
import React, { useEffect, useRef } from 'react'
import { jsx } from 'theme-ui'
import { SkipNavContent } from '@reach/skip-nav'

import SEO from '../components/seo'

const Registry = () => {
  const embed = useRef(null)
  useEffect(() => {
    if (embed.current !== null) {
      const s = document.createElement(`script`)
      s.innerHTML = `!function(e,t,n){
        var s,a=e.getElementsByTagName(t)[0];(s=e.createElement(t),s.id=n,s.async=!0,s.src="https://widget.zola.com/js/widget.js",a.parentNode.insertBefore(s,a))}(document,"script","zola-wjs")`
      embed.current.appendChild(s)
    }

    const cur = embed.current

    return () => {
      while (cur.firstChild) {
        cur.removeChild(cur.firstChild)
      }
    }
  }, [])
  return (
    <React.Fragment>
      <SEO
        title="Wedding Registry"
        description="The Zola gift registry for the wedding of Maggie Alcorn and Dustin Schau"
      />
      <SkipNavContent>
        <a
          className="zola-registry-embed"
          href="https://zola.com/registry/maggieanddustin2020"
          data-registry-key="maggieanddustin2020"
          sx={{ display: `none` }}
        >
          Our Zola Wedding Registry is loading&hellip;
        </a>
        <div ref={embed} />
      </SkipNavContent>
    </React.Fragment>
  )
}

export default Registry
