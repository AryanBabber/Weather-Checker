const apikey = "efdca23932e9e7f4e46c4f5506422040"
const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { mode: "cors" })
    const respData = await resp.json()
    addWeatherToPage(respData)
}

// getWeatherByLocation("London")

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp)
    const weather = document.createElement("div")
    search.value = ""
    weather.classList.add("weather")
    weather.innerHTML = `
        <p>${data.name}, ${data.sys.country}</p>
        <img src="https://openweathermap.org/img/wn/${
            data.weather[0].icon
        }@2x.png" />
        <h2>${temp}°C</h2>
        <p>${data.weather[0].main}</p>
        <span>Feels Like ${KtoC(data.main.feels_like)}°C</span>
    `
    main.innerHTML = ""

    main.appendChild(weather)
}

function KtoC(temperature) {
    const temp = temperature - 273.15
    return Math.round(temp)
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const city = search.value
    if (city) {
        getWeatherByLocation(city)
    }
})