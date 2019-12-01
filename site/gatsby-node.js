exports.onCreateNode = function onCreateNode({ actions, node }) {
  if (node.internal.type === 'ContentfulBlogPost') {
    actions.createNodeField({
      node,
      name: `slug`,
      value: `/blog/${node.slug}/`,
    })
  }
}

exports.createPages = async function createPages({ actions, graphql }) {
  const { data } = await graphql(`
    {
      posts: allContentfulBlogPost {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `)

  data.posts.nodes.forEach(post => {
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
}
