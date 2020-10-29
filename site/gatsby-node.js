const slugify = require('limax')

exports.onCreateNode = function onCreateNode({ actions, node }) {
  if (node.internal.type === 'ContentfulBlogPost') {
    actions.createNodeField({
      node,
      name: `slug`,
      value: `/${node.slug}/`,
    })
  } else if (node.internal.type === `ContentfulPage`) {
    actions.createNodeField({
      node,
      name: `slug`,
      value: node.slug === `/` ? node.slug : `/${node.slug}/`,
    })
  } else if (node.internal.type === `ContentfulTrip`) {
    actions.createNodeField({
      node,
      name: `slug`,
      value: `/${node.slug}/`,
    })
  } else if (
    node.title &&
    (node.internal.type === `ContentfulSection` ||
      node.internal.type === `ContentfulGallery`)
  ) {
    actions.createNodeField({
      node,
      name: `slug`,
      value: slugify(node.title),
    })
  }
}

exports.onCreatePage = function onCreatePage({ actions, page }) {
  const showRsvp = process.env.GATSBY_SHOW_RSVP === 'true'
  const showRegistry = process.env.GATSBY_SHOW_REGISTRY === 'true'
  if (!showRsvp && page.path === `/rsvp/`) {
    actions.deletePage(page)
  }

  if (!showRegistry && page.path === '/registry/') {
    actions.deletePage(page)
  }
}
