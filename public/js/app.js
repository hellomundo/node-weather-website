console.log("client side js code")

const getWeather = (location) => {
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location))
    .then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)    
                m2.textContent = "Couldn't find weather for that address.";    
            } else {
                console.log(data)
                m1.textContent = "The weather for "+data.location+" is "+data.description
                m2.textContent = "It's "+data.temperature+" degrees with winds at "+data.wind_speed+" from the "+data.wind_dir    
            }
        })
    })
    .catch((e) => {
        console.log('Got an error fetching weather.')
    })
}

const weatherForm = document.querySelector('form')
const m1 = document.querySelector('#message-1')
const m2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    m1.textContent = "Loading weather data..."
    e.preventDefault()
    console.log('testing')
    getWeather(document.querySelector('input').value)
})