/** @jsx jsx */
import React, { useEffect, useRef } from 'react'
import { jsx } from 'theme-ui'

import SEO from '../components/seo'

export default () => {
  const embed = useRef(null)
  useEffect(() => {
    if (embed.current !== null) {
      const s = document.createElement(`script`)
      s.innerHTML = `!function(e,t,n){
        var s,a=e.getElementsByTagName(t)[0];(s=e.createElement(t),s.id=n,s.async=!0,s.src="https://widget.zola.com/js/widget.js",a.parentNode.insertBefore(s,a))}(document,"script","zola-wjs")`
      embed.current.appendChild(s)
    }

    return () => {
      while (embed.current.firstChild) {
        embed.current.removeChild(embed.current.firstChild)
      }
    }
  }, [])
  return (
    <>
      <SEO
        title="Wedding Registry"
        description="The Zola gift registry for the wedding of Maggie Alcorn and Dustin Schau"
      />
      <a
        className="zola-registry-embed"
        href="https://zola.com/registry/maggieanddustin2020"
        data-registry-key="maggieanddustin2020"
        sx={{ display: `none` }}
      >
        Our Zola Wedding Registry is loading&hellip;
      </a>
      <div ref={embed} />
    </>
  )
}
