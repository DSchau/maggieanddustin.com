const capitalize = str => {
  const normalized = str.split('/').filter(Boolean).join('')
  return normalized.slice(0, 1).toUpperCase() + normalized.slice(1)
}

exports.onCreateNode = function({ actions, node }) {
  const lookup = {
    Rsvp: 'RSVP',
    '': 'Home'
  }

  if (node.internal.type === `SitePage`) {
    const normalized = capitalize(node.path)
    actions.createNodeField({
      node,
      name: `label`,
      value: lookup[normalized] || normalized
    })
  }
}

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Venue {
      address: String!
      city: String!
      name: String!
      state: String!

      uri: String!
    }

    type Hotel {
      address: String!
      city: String!
      name: String!
      state: String!

      phone: String!
    }
  
    type WeddingDetails {
      accomodations: [Hotel]!
      date: Date!
      startTime: Date!
      endTime: Date!
      venue: Venue!
    }
  `)
}
