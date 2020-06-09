const axios = require('axios')

const forecast = (lat, long, callback) => {
    let url = 'http://api.weatherstack.com/current'
    let params = {
        access_key: '842b1c31cf0bea26389d6c7073921469',
        query: lat.toString() + ','+long.toString(),
        units: 'f'
    }

    axios.get(url, {params: params})
        .then((res) => {
            //console.log(res)
            if(res.data.error) {
                let errorMessage = "error: "+weather.data.error.code+" "+weather.data.error.info
                callback(errorMessage, undefined)
            } else {
                let w = res.data.current
                //console.log(w)
                //let f = 'Current weather is '+w.weather_descriptions[0] + '\n'
                //f += 'It is currently '+w.temperature+' deg F and it feels like it is '+w.feelslike+' deg F'

                callback(undefined, w)
            }
        })
        .catch((e) => {
            callback(e, undefined)
        })
}

module.exports = forecast