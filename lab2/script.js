const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const API_KEY = "b756a61f0240767c6fdf5906cdaec009";

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour24 = time.getHours();
    const hour12 = hour24 > 12 ? hour24 % 12 : hour24;
    const mintues = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hour24 >= 12 ? 'pm' : 'am';

    timeEl.innerHTML = hour12 + ' : ' + mintues + ' ' + '<span id="am-pm">' + `${ampm}` + '</span>';

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];

}, 1000); // update every second
getWeatherData();
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data);
            showWeatherData(data);
        })
    })
}

function showWeatherData(data) {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;
    timezone.innerHTML = data.timezone;
    currentWeatherItemsEl.innerHTML = 
    `
    <div class="weather-item">
        <p>Humidity</p>
        <p>${humidity}</p>
    </div>
    <div class="weather-item">
        <p>Pressure</p>
        <p>${pressure}</p>
    </div>
    <div class="weather-item">
        <p>Wind Speed</p>
        <p>${wind_speed}</p>
    </div>
    `;
    let otherDayForecast = '';
    data.daily.forEach((day,i)=>{
        if(i==0){
            currentTempEl.innerHTML = `
            <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night -  ${day.temp.night}&#176; F</div>
                <div class="temp">Day -  ${day.temp.day}&#176; F</div>
            `
        }else{
            otherDayForecast += `
            <div class="weather-forecast-item">
                    <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                    <div class="temp">Night - ${day.temp.night}&#176; F</div>
                    <div class="temp">Day -${day.temp.day} &#176; F</div>
            </div>
            `
        }
    })
    weatherForecastEl.innerHTML = otherDayForecast;
}