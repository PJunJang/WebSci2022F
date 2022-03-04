const { Router, json } = require('express')
const express = require('express')
const app = express()
const port = 3000
const path = require('path');  // lab4 Pt.1
const http = require("http");
const request = require('request')
const api_key = 'b756a61f0240767c6fdf5906cdaec009';
var city_name;
var router = Router();

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + "");
// })

app.use(express.urlencoded({
    extended: true
}));

app.get('/weatherdata/currentGet', (req, res) => {
    city_name = req.query.city_name;
    console.log('city name : ' + city_name);
    api = "http://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&appid=" + api_key;
    request({ url: api, json: true }, function (error, response) {
        var wind_speed = response.body.wind.speed;
        var temperature = response.body.main.temp;
        var maxTemp = response.body.main.temp_max;
        var minTemp = response.body.main.temp_min;
        var lon = response.body.coord.lon;
        var lat = response.body.coord.lat;
        var feels_like = response.body.main.feels_like;
        var pressure = response.body.main.pressure;
        var humidity = response.body.main.humidity;
        var country = response.body.sys.country;

        var data = "<div style='border:2px; border-style: solid; border-color:lightblue;'>"
        data += "<div style='width: 100%; float:center;  background-color: lightblue;'>";
        data += "<h1 style='text-align: center; font-size:40px'>Current Weather Report</h1>";
        data += "<h2 style='text-align: center; color: #6134eb;'>City : " + city_name +" , "+country+ "</h2>";
        data += "<h2 style='text-align: center; color: #6134eb;'>Coordinates : [" + lat +" , "+
            lon + "]</h2>";
        data += "<div style='border:2px; border-style: solid; border-color:white; background-color:lightgrey'>"
        data += "<p style='text-align: center; color: grey; font-size: 40px;'>Temperature: " + temperature + "°F</p>";
        data += "<p style='text-align: center; color: #6134eb; font-size: 40px;'>Max Temp: " + maxTemp + "°F</p>";
        data += "<p style='text-align: center; color: red; font-size: 40px;'>Min Temp: " + minTemp + "°F</p>";
        data += "<p style='text-align: center; color: blue; font-size: 40px;'>Wind Speed: " + wind_speed + "m/s</p>";
        data += "<p style='text-align: center; color: darkblue; font-size: 40px;'>Humidity: " + humidity + "%</p>";
        data += "<p style='text-align: center; color: green; font-size: 40px;'>Feels_like: " + feels_like + "°F</p>";
        data += "<p style='text-align: center; color: black; font-size: 40px;'>Pressure: " + pressure + "in</p>";
        data += "</div>";
        data += "</div>";
        data += "</div>";
        data += "<h3 style='text-align:center; color:#6134eb;'>API SOURCE : "
        data += '<a href="http://api.openweathermap.org">API Home </a>/<h3>';
        res.send(data);
    })
})

app.post('/weatherdata/currentPost', (req, res) => {
    res.send('<a href="http://api.openweathermap.org">API Home </a>')   
})

app.delete('/weatherdata/delete', (req, res) => {
    res.send('<a href="http://api.openweathermap.org">API Home</a>')   
})

app.put('/weatherdata/put', (req, res) => {
    res.send('<a href="http://api.openweathermap.org">API Home</a>')   
})


app.use(express.static(path.join(__dirname, '../frontend/openWeather/dist/open-weather')));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})