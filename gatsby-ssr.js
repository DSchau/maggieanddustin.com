const React = require('react')
const { Helmet } = require('react-helmet')

/*
 * This should be baked into gatsby-plugin-react-helmet
 * https://github.com/gatsbyjs/gatsby/issues/22206#issuecomment-618829884
 */
exports.onRenderBody = (
  { setHeadComponents, setHtmlAttributes, setBodyAttributes },
  pluginOptions
) => {
  const helmet = Helmet.renderStatic()
  setHtmlAttributes(helmet.htmlAttributes.toComponent())
  setBodyAttributes(helmet.bodyAttributes.toComponent())
  setHeadComponents([
    helmet.title.toComponent(),
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent(),
  ])
}

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()

  headComponents.sort((x, y) => {
    if (x.props && x.props['data-react-helmet']) {
      return -1
    } else if (y.props && y.props['data-react-helmet']) {
      return 1
    }
    return 0
  })

  replaceHeadComponents(headComponents)
}
