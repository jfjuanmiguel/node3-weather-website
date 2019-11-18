const request = require('request')

const geocode = (address, callback) => {
  const baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  const accessToken =
    'pk.eyJ1IjoiamZqdWFubWlndWVsIiwiYSI6ImNqcGFobXppdzB4ejQzd284NWJkcjdxOTkifQ.ttg6F6AfsnWWIcv00IkmUQ'
  const url = `${baseURL}${encodeURIComponent(
    address
  )}.json?access_token=${accessToken}`

  request({ url, json: true }, (error, { body }) => {
    const { features } = body
    if (error) {
      callback(
        'Unable to connect to the location service!',
        undefined
      )
    } else if (features.length === 0) {
      callback(
        'Unable to find location. Try another search.',
        undefined
      )
    } else {
      const [longitude, latitude] = features[0].center
      const location = features[0].place_name
      callback(undefined, {
        latitude,
        longitude,
        location
      })
    }
  })
}

module.exports = geocode
