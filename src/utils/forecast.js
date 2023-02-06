const request = require('postman-request')

const forecast = ({longitude, latitude}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=004185c79932ea85dc9ac7515a019261&query=${latitude},${longitude}&units=m`;
    request({url, json : true}, (error, response) => {
        if(error) {
            callback('Unable to connect to the sever', undefined)
        }else if(response.body.error) {
            callback('Invalid Coordinates', undefined)
        }else {
            const currentObject = response.body.current;
            callback(undefined,
            {
                temperature : currentObject.temperature,
                precip : currentObject.precip
            })
        }
    })
}
module.exports = forecast