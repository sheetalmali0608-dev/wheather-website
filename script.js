const searchBtn = document.querySelector('#searchBtn');
const cityInput = document.querySelector('#cityInput');
const weatherContent = document.querySelector('#weatherContent');
const errorMsg = document.querySelector('#errorMsg');

// Your provided API Key
const APIKey = '5b34f5bebda17f4d604016aa062adbd9';

searchBtn.addEventListener('click', () => {
    getWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather(cityInput.value);
    }
});

function getWeather(city) {
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {

            if (data.cod === '404') {
                errorMsg.style.display = 'block';
                weatherContent.style.display = 'none';
                return;
            }

            errorMsg.style.display = 'none';
            weatherContent.style.display = 'block';

            const temp = document.querySelector('#temp');
            const desc = document.querySelector('#desc');
            const humidity = document.querySelector('#humidityVal');
            const wind = document.querySelector('#windVal');
            const icon = document.querySelector('#weatherIcon');

            temp.innerHTML = `${Math.round(data.main.temp)}°C`;
            desc.innerHTML = data.weather[0].description;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${Math.round(data.wind.speed)} Km/h`;

            // Dynamic Icons from OpenWeatherMap
            const iconCode = data.weather[0].icon;
            icon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        })
        .catch(err => {
            console.error("Error fetching data:", err);
        });
}