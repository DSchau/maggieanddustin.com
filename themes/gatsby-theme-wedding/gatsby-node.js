exports.createResolvers = function({ createResolvers }) {
  createResolvers({
    Query: {
      WeddingDetails: {
        type: `WeddingDetails!`,
        resolve() {
          return {
            accomodations: [
              {
                address: `1234 Fake Street`,
                city: `Minneapolis`,
                state: `MN`,
                name: `The Depot`,
                phone: `712.212.3001`,
              },
            ],
            date: `2018-04-20`,
            startTime: `2018-04-20 04:00`,
            endTime: `2019-04-20 10:00`,
            venue: {
              address: `1234 Fake Street`,
              city: `Minneapolis`,
              state: `MN`,
              name: `The Depot`,
              uri: `https://venue.com`,
            },
          }
        },
      },
    },
  })
}
