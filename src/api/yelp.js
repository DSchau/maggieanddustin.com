import * as yup from 'yup'
import { GraphQLClient, gql } from 'graphql-request'

const schema = yup.object().shape({
  categories: yup.string(),
  sort_by: yup.string().default('rating'),
  location: yup.string(),
  longitude: yup.number(),
  latitude: yup.number(),
  limit: yup.number().default(10),
})

const endpoint = 'https://api.yelp.com/v3/graphql'

export default async function YelpAPI(req, res) {
  try {
    const order = [req.body, req.query].find(
      (part) => Object.keys(part).length > 0
    )
    const body = await schema.validate(order)

    if (!body.location && !(body.longitude && body.latitude)) {
      throw new Error(
        'Please supply location or coordinates (latitude and longitude)'
      )
    }

    const client = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    })

    const query = gql`
      query getRestaurants(
        $categories: String
        $sort_by: String!
        $latitude: Float
        $longitude: Float
        $location: String
        $limit: Int!
      ) {
        search(
          location: $location
          limit: $limit
          sort_by: $sort_by
          categories: $categories
          latitude: $latitude
          longitude: $longitude
        ) {
          business {
            name
            url
            rating
            phone
            photos
            categories {
              title
            }
            hours {
              is_open_now
            }
          }
        }
      }
    `

    const data = await client.request(query, body)

    return res.status(200).json({
      results: data.search || [],
    })
  } catch (e) {
    return res.status(500).json({
      message: e.message,
      stack: e.stack,
    })
  }
}
