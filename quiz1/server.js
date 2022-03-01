const express = require("express");
const request = require("request");
const https = require("https");
const fs = require("fs");
const app = express();
const port = 3000


var zip_code=12180;
var latitude, longitude, api;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get('/wind', (req, res) => {
    zip_code = req.body.wind_zip;
    api = 'api.openweathermap.org/data/2.5/weather?zip=' + 
        zip_code + '&appid=b756a61f0240767c6fdf5906cdaec009';
        console(zip_code);
})
app.post('/temperature', (req, res) => {
    zip_code = req.body.temp_zip;
    api = 'api.openweathermap.org/data/2.5/weather?zip=' + 
        zip_code + '&appid=b756a61f0240767c6fdf5906cdaec009';
    console.log(zip_code);
})


app.listen(port, () => {
    console.log('Listening on *:3000')
})
