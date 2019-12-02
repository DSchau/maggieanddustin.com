/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

import richTextRenderer from '../components/rich-text-renderer'

const Rule = () => (
  <Styled.hr
    sx={{
      height: '25vh',
      width: 2,
      backgroundColor: 'text',
      margin: '0 auto',
      mt: 2,
      mb: 2,
    }}
  />
)

function Story({ data }) {
  const {
    timeline: { moments },
  } = data
  return (
    <Layout>
      {moments.map((moment, index) => (
        <Styled.div
          key={moment.title}
          sx={{ textAlign: 'center', mt: 2, mb: 2, padding: 2 }}
        >
          <Styled.h2>{moment.title}</Styled.h2>
          <Styled.h3>{moment.date}</Styled.h3>
          <Styled.p>{richTextRenderer(moment.description.json)}</Styled.p>
          {moment.photos.map(photo => (
            <Image
              key={photo.fluid.src}
              sx={{ maxWidth: ['100%', '50%'], margin: '0 auto' }}
              {...photo}
            />
          ))}
          {index + 1 < moments.length && <Rule />}
        </Styled.div>
      ))}
    </Layout>
  )
}

export const storyQuery = graphql`
  {
    timeline: contentfulTimeline(title: { eq: "Our Story" }) {
      moments {
        date(formatString: "MMM Do, YYYY")
        description {
          json
        }
        title
        photos {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

export default Story
