const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast'
    url += '/fc73adb952d9e5928edb132b668d309f'
    url += '/' + encodeURIComponent(latitude)
    url += ',' + encodeURIComponent(longitude)
    url += '?units=us'
    url += '&lang=en'
    request({ url, json: true }, (error, { body } ) => {
        if (error) {
            callback('Unable to connect to weather service!', undefinied)
        } else if (body.error) {
            callback('Unable to get weather for location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out.  There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast