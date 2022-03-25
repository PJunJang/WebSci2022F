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
// the code below was used for preloading the db collection => I ran it 100 times!!!
// console.log("num:", i + 1, usCities[i]);
// var myobj = {
//     index: i,
//     cityname: usCities[i],
//     temperature: response.body.main.temp,
//     max_temp:response.body.main.temp_max,
//     min_temp : response.body.main.temp_min,
//     lon : response.body.coord.lon,
//     lat : response.body.coord.lat,
//     feels_like : response.body.main.feels_like,
//     pressure : response.body.main.pressure,
//     humidity : response.body.main.humidity,
//     country : response.body.sys.country,
// };
// dbo.collection("lab5Weather").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
// });

var usCities =
    ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria",
        "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor",
        "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada",
        "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta",
        "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable",
        "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley",
        "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise",
        "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton",
        "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan",
        "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral",
        "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign",
        "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake",
        "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville",
        "Clearwater", "Cleveland", "College Station", "Colorado Springs",
        "Columbia", "Columbus", "Concord", "Coral Springs", "Corona",
        "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury",
        "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona",
        "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham",
        "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido",
        "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint",
        "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach",
        "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville"];

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://junemin97:Springsummer9!@lab5.xi2hc.mongodb.net/Lab5?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(function (err, db) {
//     if (err) throw err;
//     var i = 99;
//     var dbo = db.db("WeatherData");
//     let api = "http://api.openweathermap.org/data/2.5/weather?q="
//         + usCities[i] + "&appid=" + api_key;
//     request({ url: api, json: true }, function (error, response) {
//         if (error) throw error;
//     });
// });

app.use(express.urlencoded({
    extended: true
}));

// app.get('/:cityname', (req, res) => {
//     res.send('city name is ' + req.params.cityname + '\n');
// });

// route parameters to get a document at the specified index
app.get('/db', (req, res) => {
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("WeatherData");
        dbo.collection("lab5Weather").find({}).toArray(function (error, result) {
            if (error) throw error;
            res.json(result);
            db.close();
        });

    });

});

// route parameters to get a document at the specified index
app.get('/db/:index', (req, res) => {
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("WeatherData");
        dbo.collection("lab5Weather").findOne({
            // req.params.index is passed in as a string so I had to convert it to an int
            index: Number(req.params.index)
        },
            function (err, result) {
                if (err) throw err;
                res.json(result);
                console.log(result);
                db.close();
            });
    });

});

// put
app.put('/db/:index', (req, res) => {
    client.connect(function (err, db) {
        var city_index = req.index;
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("lab5Weather");
        if (!req.body) {
            return res.send(400);
        }
        city_name = usCities[Number(city_index)];
        collection.findBy(city_index, function (e, data) {
            if (e) { return res.send(500, e); }
            if (!data) {
                return res.send(404);
            }
            var update = {
                cityname: "ZXY", temperature: -1234
            };
            collection.updateById(city_index, update,
                function (err) {
                    if (err) { return res.send(500, err); }
                    db.close();
                });
        })
    });
})

// post
app.post('/db', (req, res) => {
    city_name = req.body.city_post;
    client.connect((err, db) => {
        if (err) throw err;
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("lab5Weather");
        var dbSize = 0;
        // Count the total documents then update 'dbSize'
        collection.countDocuments().then((count_documents) => {
            console.log("The collection size is : ", count_documents);
            dbSize = count_documents;
        }).catch((err) => {
            console.log(err.Message);
        })

        // console.log(dbSize);
        collection.findOne({
            cityname: city_name
        }, (err, result) => {
            if (result === null) {  // if the city doesn't exist in the db, then add it
                console.log("The city you entered doesn't exist in the db. It will be added now.");
                let api = "http://api.openweathermap.org/data/2.5/weather?q="
                    + city_name + "&appid=" + api_key;
                request({ url: api, json: true }, function (error, response) {
                    if (error) throw error;
                    var myobj = {
                        index: dbSize,  // index should be dbSize since it started from '0'
                        cityname: city_name,
                        temperature: response.body.main.temp,
                        max_temp: response.body.main.temp_max,
                        min_temp: response.body.main.temp_min,
                        lon: response.body.coord.lon,
                        lat: response.body.coord.lat,
                        feels_like: response.body.main.feels_like,
                        pressure: response.body.main.pressure,
                        humidity: response.body.main.humidity,
                        country: response.body.sys.country,
                    }
                    collection.insertOne(myobj, function (err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        db.close();
                    });
                });
            } else {
                res.json(result);
            }
        })
    })
})

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
        data += "<h2 style='text-align: center; color: #6134eb;'>City : " + city_name + " , " + country + "</h2>";
        data += "<h2 style='text-align: center; color: #6134eb;'>Coordinates : [" + lat + " , " +
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


app.delete('/weatherdata/delete', (req, res) => {
    res.send('<a href="http://api.openweathermap.org">API Home</a>')
})




app.use(express.static(path.join(__dirname, '../frontend/openWeather/dist/open-weather')));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})