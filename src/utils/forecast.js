const request = require('request')
const forecast = (a, b, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6cf367a06115c52c676825cf10d74341&query=' + a + ',' + b + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connet to the server')
        } else if (body.error) {
            console.log(body.error)
            callback("Unable to find weather")
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is usually " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out. The humidity is " + body.current.humidity +'%')
        }
    })

}

module.exports = forecast