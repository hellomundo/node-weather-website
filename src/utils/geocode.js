const axios = require('axios')

const geocode = (address, callback) => {
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    url += encodeURIComponent(address) + '.json?'

    // make request
    let params = {
        access_token: 'pk.eyJ1IjoiaGVsbG9tdW5kbyIsImEiOiJja2IzdTdpMnowb3h6MnZzN3NiMmswdjRmIn0.1Myd3smOwTOgAfSSY5N1Kg',
        limit: 1
    }

    let res = axios.get(url, {params: params})
        .then((response) => {
            console.log(response.data)

            if(response.data.features.length) {
                let rdata = {
                    latitude: response.data.features[0].center[1],
                    longitude: response.data.features[0].center[0],
                    location: response.data.features[0].place_name
                }
                //let coords = response.data.features[0].center
                //console.log("found lat long of: "+coords[1] +", "+coords[0])
                callback(undefined, rdata);
            } else {
                callback('Could not find that location', undefined)
            }
            
        })
        .catch((e) => {
            callback(e, undefined);
        })

}

module.exports = geocode
