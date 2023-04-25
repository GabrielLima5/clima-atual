const cityInput = document.querySelector('#city');
const sendBtn = document.querySelector('#send-btn');
const loadingEl = document.querySelector('.loading');
const errorDiv = document.querySelector('.error');
const errorMessageEl = document.querySelector('#error-message')
const weatherContainer = document.querySelector('.weather-data');
const cityNameEl = document.querySelector('.city-name');
const countryEl = document.querySelector('#country-flag');
const weatherEl = document.querySelector('.weather-span');
const weatherConditionEl = document.querySelector('.weather-condition');
const humidityInfoEl = document.querySelector('.humidity-info');
const windSpeedEl = document.querySelector('.wind-info');

function getData(city){
    return new Promise((resolve, reject) => {
        try{
            const apiKey = 'bfa0231b3b17baf77c142636cebcd26e'
            const res = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`)
            resolve(res)
        } catch(e){
            reject(e)
        }
    });
}

function showData(city){
    getData(city)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            cityNameEl.innerText = json.name
            weatherEl.innerText = `${parseInt(json.main.temp).toFixed(0)}ºC`
            countryEl.setAttribute('src',  `https://flagsapi.com/${json.sys.country}/flat/32.png`)
            weatherConditionEl.innerText = json.weather[0].description
            humidityInfoEl.innerText = `${json.main.humidity}%`
            windSpeedEl.innerText = `${parseInt(json.wind.speed)} km/h`
            
            setTimeout(() => {
                weatherContainer.style.display = 'flex'
            }, 1000)
            
        })
        .catch(e => {
            weatherContainer.style.display = 'none'

            setTimeout(() => {
                errorDiv.classList.remove('hide')
                errorMessageEl.innerText = 'Cidade não encontrada :('
                errorMessageEl.classList.remove('hide')
            }, 1000)
        })
}

function initBtnEvent(){
    sendBtn.addEventListener('click', e => {

        e.preventDefault()

        const city = cityInput.value
        
        if (city){
            loadingEl.classList.remove('hide')
            weatherContainer.style.display = 'none'
            errorDiv.classList.add('hide')
            errorMessageEl.classList.add('hide')

            setTimeout(() => {
                loadingEl.classList.add('hide')
            }, 1000)

            showData(city)
        }
    })
}

initBtnEvent()