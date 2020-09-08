
const geolocation = {
    Ife: ['7.4905', '4.5521'],
    Lagos: ['6.5244', '3.3792'],
    Abuja: ['9.0765', '7.3986'],
    Ibadan: ['7.3775', '3.9470']
}
const apiKey = '2c2a518e55896f9ff5f4cb3ef102dd6b'

export function fetchWeatherProperties(location) { 
    const searchedLocation = geolocation[location];   
    const endPoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchedLocation[0]}&lon=${searchedLocation[0]}&exclude=hourly&appid=${apiKey}`
    return fetch(endPoint)
        .then((res) => res.json())
        .then((data) => {
            return data.daily
        })
}

export function fetchWeather(latitude,longitude) {  
    const endPoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly&appid=${apiKey}`
    return fetch(endPoint)
        .then((res) => res.json())
        .then((data) => {
            return data.daily
        })
}