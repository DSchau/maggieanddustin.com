import React from 'react'
import scriptLoader from 'react-async-script-loader'

const renderers = {
  airbnb: [
    'https://www.airbnb.com/embeddable/airbnb_jssdk',
    props => (
      <div
        className="airbnb-embed-frame"
        data-id={props.id}
        data-view="home"
        style={{
          width: 450,
          height: 300,
          margin: 'auto',
        }}
      />
    ),
  ],
}

function Embed({ type, ...props }) {
  const [script, Component] = renderers[type] || []
  if (!Component) {
    return null
  }
  const ComponentWithScript = scriptLoader([script])(Component)
  return <ComponentWithScript {...props} />
}

export default Embed
