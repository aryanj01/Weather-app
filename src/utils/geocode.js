const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://geocode.xyz/${address}?json=1&auth=62159609961791840301x2238`;
    console.log("pinging " , url);
    request({url, json : true}, (error, response) => {
        if(error) {
            callback('Unable to connect to the server.', undefined);
        }else{
            const currentObject = response.body;
            if(currentObject.error) {
                callback('Location cannot be found', undefined);
            }else{
                callback(undefined,{
                    longitude : currentObject.longt,
                    latitude : currentObject.latt,
                })
            }
        }
    })
}

module.exports = geocode;