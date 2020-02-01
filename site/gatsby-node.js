exports.onCreateNode = function onCreateNode({ actions, node }) {
  if (node.internal.type === 'ContentfulBlogPost') {
    actions.createNodeField({
      node,
      name: `slug`,
      value: `/blog/${node.slug}/`,
    })
  } else if (node.internal.type === `ContentfulPage`) {
    actions.createNodeField({
      node,
      name: `slug`,
      value: node.slug === `/` ? node.slug : `/${node.slug}/`,
    })
  }
}

exports.onCreatePage = function onCreatePage({ actions, page }) {
  const showRsvp = process.env.GATSBY_SHOW_RSVP !== 'false'
  const showRegistry = process.env.GATSBY_SHOW_REGISTRY !== 'false'
  if (!showRsvp && page.path === `/rsvp/`) {
    actions.deletePage(page)
  }

  if (!showRegistry && page.path === '/registry/') {
    actions.deletePage(page)
  }
}

exports.createPages = async function createPages({ actions, graphql }) {
  const {
    data: { posts, pages },
  } = await graphql(`
    {
      posts: allContentfulBlogPost {
        nodes {
          fields {
            slug
          }
        }
      }

      pages: allContentfulPage {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `)

  posts.nodes.forEach(post => {
    const {
      fields: { slug },
    } = post
    actions.createPage({
      component: require.resolve(`./src/templates/blog-post.js`),
      path: slug,
      context: {
        slug,
      },
    })
  })

  pages.nodes.forEach(page => {
    const {
      fields: { slug },
    } = page

    actions.createPage({
      component: require.resolve(`./src/templates/page.js`),
      path: slug,
      context: {
        slug,
      },
    })
  })
}
