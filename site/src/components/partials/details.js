/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import format from 'date-fns/format'

import Seperator from '../seperator'

const Section = ({ date, blocks = [] }) => (
  <section sx={{
    display: 'flex',
    flexDirection: ['column', 'row'],
    justifyContent: 'center',
    alignItems: ['center', 'flex-start'],
    padding: [3, 4]
  }}>
    <h2 sx={{
      fontFamily: 'heading',
      padding: 0,
      margin: 0,
      paddingRight: [0, 4],
      width: ['auto', 200],
      height: '100%',
      borderRight: '1px solid #eee',
      span: {
        display: 'block'
      }
    }}>
      <span sx={{
        fontWeight: 'normal'
      }}>{format(date, 'iiii')}</span>
      <span>{format(date, 'LLLL d')}</span>
    </h2>
    {blocks.length > 0 && (
      <span sx={{

      }}>
        {blocks.map(block => (
          <div key={block.text} sx={{
            textAlign: 'left',
            paddingTop: [3, 0],
            paddingBottom: 3,
            marginTop: 2,
            marginBottom: 2
          }}>
            <Styled.strong sx={{
              textTransform: 'uppercase',
            }} dangerouslySetInnerHTML={{ __html: block.title }} />
            {[].concat(block.content).map(line => (
              <Styled.p sx={{
                padding: 0,
                margin: 0
              }} key={line}>{line}</Styled.p>
            ))}
          </div>
        ))}
      </span>
    )}
  </section>
)

export default function Venue({ children, content }) {
  return (
    <React.Fragment>
      <Styled.div
        sx={{ textAlign: `center`, pt: `10vh`, pb: `calc(10vh - 38px)` }}
      >
        <Styled.h1
          sx={{ fontSize: [32, 48], padding: 2, mb: 0, textTransform: `uppercase` }}
        >
          Welcome
        </Styled.h1>
        <Styled.h2 sx={{ fontFamily: `body`, fontSize: [24, 40] }}>
          Weekend Schedule
        </Styled.h2>
        <Section date={new Date('06/11/2021')} blocks={[
          {
            title: '4:00 PM &mdash; Wedding Ceremony',
            content: [
              'Winter Garden at Renaissance Minneapolis Hotel, The Depot',
              '225 3rd Ave S, Minneapolis, MN 55401'
            ]
          }
        ]} />
        <Section date={new Date('06/12/2021')} blocks={[
          {
            title: '4:00 PM &mdash; Wedding Ceremony',
            content: [
              'Winter Garden at Renaissance Minneapolis Hotel, The Depot',
              '225 3rd Ave S, Minneapolis, MN 55401'
            ]
          },
          {
            title: '5:00 PM &mdash; Cocktail Hour',
            content: [
              'Winter Garden at Renaissance Minneapolis Hotel, The Depot',
            ]
          },
          {
            title: '6:00 PM &mdash; Reception Dinner',
            content: [
              'Great Hall at Renaissance Minneapolis Hotel, The Depot',
            ]
          }
        ]}/>
        <Section date={new Date('06/13/2021')} blocks={[
          {
            title: '9:00 AM &mdash; Farewell Breakfast',
            content: [
              'Soo Line Room at Renaissance Minneapolis Hotel, The Depot'
            ]
          }
        ]} />
        <Seperator sx={{ mt: 4, mb: 4 }} />
        <a href="https://goo.gl/maps/wvmJmFUY4a8SKbMk7" sx={{ color: 'text', ':hover': { textDecoration: 'none' }}} target="_blank" rel="noopener noreferrer">
          {[
            '225 3rd Ave S,',
            'Minneapolis, MN 55401',
          ].map(part => (
            <Styled.p key={part} sx={{ fontSize: 4, pb: 0, mb: 0 }}>
              {part}
            </Styled.p>
          ))}
        </a>
        <a
          href="https://www.marriott.com/events/start.mi?id=1568837961848&key=GRP"
          sx={{
            ':hover': {
              borderColor: `text`,
              backgroundColor: `background`,
              color: `text`,
            },
            borderWidth: 4,
            borderColor: `transparent`,
            borderStyle: `solid`,
            display: `inline-block`,
            fontSize: 32,
            textDecoration: `none`,
            backgroundColor: `text`,
            color: `background`,
            pt: 3,
            pb: 3,
            pr: 4,
            pl: 4,
            mt: 4,
            mb: 2,
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Hotel
        </a>
      </Styled.div>
      {children}
      {content}
    </React.Fragment>
  )
}
