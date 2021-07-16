/** @jsx jsx */
import { jsx } from 'theme-ui'
import * as React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import Stars from 'react-star-ratings'

import SEO from '../components/seo'
import { Button, Label, Input } from '../components/form/'
import { useGeolocation } from '../hooks/use-geolocation'

const Active = ({ active, ...props }) => (
  <div
    sx={{
      height: 3,
      width: '100%',
      backgroundColor: active ? 'green' : 'red',
    }}
    {...props}
  />
)

function Food({ data }) {
  const [location, setLocation] = React.useState({})
  const [formState, setFormState] = React.useState({})
  const [results, setResults] = React.useState([])
  const handleChange = (ev) => {
    setFormState(
      Object.assign({}, formState, {
        [ev.target.id]: ev.target.value,
      })
    )
  }
  useGeolocation(({ coords }) => {
    setLocation(coords)
  })
  return (
    <React.Fragment>
      <SEO
        title="Food finder"
        description="A simple tool to query nearby food and surface the best results"
      />
      <SkipNavContent>
        <div
          sx={{
            margin: '14px auto',
            padding: [1, 2],
            maxWidth: ['100%', '85%', '50%'],
          }}
        >
          <Active active={location.latitude && location.longitude} />
          <h1>😋 Food!</h1>
          <form
            sx={{}}
            onSubmit={(ev) => {
              ev.preventDefault()
              setResults([])
              fetch('/api/yelp', {
                method: 'POST',
                body: JSON.stringify(
                  Object.assign({}, formState, {
                    latitude: location.latitude,
                    longitude: location.longitude,
                  })
                ),
                headers: {
                  ContentType: 'application/json',
                },
              })
                .then((res) => res.json())
                .then((data) =>
                  setResults(data.results ? data.results.business : [])
                )
            }}
          >
            <Label htmlFor="category" sx={{ display: 'block' }}>
              Category
              <Input id="category" onChange={handleChange} />
            </Label>
            <div
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                type="submit"
                sx={{
                  mr: [1, 2],
                }}
              >
                Show Results
              </Button>
              <Button
                type="reset"
                sx={{
                  backgroundColor: 'background',
                  color: 'text',
                  width: 'auto',
                }}
                onClick={() => {
                  setFormState({})
                  setResults([])
                }}
              >
                Reset
              </Button>
            </div>
          </form>
          {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
          {results.length > 0 ? (
            <ol
              sx={{
                padding: [1, 1, 2],
              }}
            >
              {results.map((result, index) => {
                return (
                  <li
                    key={result.name}
                    sx={{
                      display: 'flex',
                      listStyleType: 'none',
                      padding: [1, 2],
                      margin: ['4px 0'],
                    }}
                  >
                    {result.photos && (
                      <img
                        src={result.photos}
                        sx={{
                          alignSelf: 'start',
                          borderRadius: '50%',
                          width: [60, 90],
                          height: 'auto',
                          marginRight: 2,
                        }}
                      />
                    )}
                    <div>
                      <Active active={result.hours.is_open_now} />
                      <a
                        href={result.url}
                        sx={{ display: 'block', fontSize: 18 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {result.name}
                      </a>
                      <Stars
                        rating={result.rating}
                        starDimension={`20px`}
                        starSpacing={`4px`}
                        starRatedColor={`hsl(${
                          10 * (5 - result.rating)
                        }, 100%, 32%)`}
                      />
                      <p sx={{ padding: 0, margin: 0 }}>
                        {result.categories.map((cat) => cat.title).join(' | ')}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          ) : null}
        </div>
      </SkipNavContent>
    </React.Fragment>
  )
}

export default Food
