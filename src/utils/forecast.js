const request = require('request')

const forecast = (lat, lng, callback) => {
  const baseURL = 'https://api.darksky.net/forecast'
  const accessToken = '5fd69df6078485bb636c4e0eeb02faaa'
  const url = `${baseURL}/${accessToken}/${lat},${lng}`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        'Unable to connect to the location service!',
        undefined
      )
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      const { temperature, precipProbability } = body.currently
      const { summary } = body.daily.data[0]
      callback(undefined, {
        summary,
        temperature,
        precipProbability
      })
    }
  })
}

module.exports = forecast
