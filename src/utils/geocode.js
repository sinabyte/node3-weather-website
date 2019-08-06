const request = require('request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    url += encodeURIComponent(address)
    url += '.json'
    url += '?'
    url += 'access_token=' + 'pk.eyJ1Ijoic2luYWJ5dGUiLCJhIjoiY2p5YW1scTVlMDA0dzNjcGJ6d2hnN3Z5diJ9.RET-F4PvvXxTFzqjE7mw4g'
    url += '&language=en'
    url += '&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocode service!', { latitude, longitude, location } = {})
        } else if (body.features.length === 0) {
            callback('Unable to find geocode location.  Try another search.', { latitude, longitude, location } = {})
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode