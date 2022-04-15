const { Router, json } = require('express')
const express = require('express')
const app = express()
const port = 3000
const path = require('path');  // lab4 Pt.1
const http = require("http");
const request = require('request')
const axios = require('axios');
const api_key = 'b756a61f0240767c6fdf5906cdaec009';
var city_name;
var router = Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

var usCities = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria",
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
    "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville",
    "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids",
    "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi",
    "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace",
    "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point",
    "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach",
    "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson",
    "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo",
    "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey",
    "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces",
    "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach",
    "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina",
    "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite",
    "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe",
    "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach",
    "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans",
    "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman",
    "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala",
    "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange",
    "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City",
    "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh",
    "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie",
    "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda",
    "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland",
    "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford",
    "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul",
    "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino",
    "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara",
    "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota",
    "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport",
    "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg",
    "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg",
    "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma",
    "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo",
    "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo",
    "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington",
    "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington",
    "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown", "Essex", "Fife",
    "Gloucestershire", "Gwent", "Gwynedd", "Hampshire", "Herefordshire", "Hertfordshire", "Inverness-shire",
    "Isle of Wight", "Kent", "Kincardineshire", "Kinross-shire", "Kirkcudbrightshire", "Lanarkshire", "Lancashire",
    "Leicestershire", "Lincolnshire", "London", "Merseyside", "Mid Glamorgan", "Middlesex", "Midlothian", "Moray",
    "Nairnshire"
];

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://junemin97:Springsummer9!@lab5.xi2hc.mongodb.net/Lab5?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// https://api.weather.gov/gridpoints/ALY/60,62/forecast
// http://api.weatherstack.com/current?access_key=009213cca66f790268a02f3e98cdaea9&query=Troy,NY
// https://api.weatherbit.io/v2.0/current?lat=42.721200&lon=-73.688926&key=dd3747b9ff2946d5ba23556c4fe498e5

// the part below is for feeding db collection with different APIs.
// for (let i = 385; i < 400; i++) {
//     //var city_name = city_names[i];
//     client.connect(function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("WeatherData");
//         let city_name = usCities[i];
//         // &city=Raleigh&country=US
//         let weather_key = "8091309be1a24b30af110828220104";
//         // http://api.weatherapi.com/v1/current.json?key=8091309be1a24b30af110828220104 &q=London&aqi=no
//         let api_bit = "http://api.weatherapi.com/v1/current.json?key=" + weather_key
//             + "&q=" + city_name + "aqi=no";
//         request({ url: api_bit, json: true }, (error, response) => {
//             if (error) throw error;
//             var myobj = {
//                 index: i,
//                 cityname: usCities[i],
//                 lat: response.body.location.lat,
//                 lon: response.body.location.lon,
//                 temperature: response.body.current.temp_c,
//                 pressure: response.body.current.pressure_in,
//                 // windspeed: response.data.current.wind_speed,
//                 humidity: response.body.current.humidity,
//             }
//             dbo.collection("lab6").insertOne(myobj, function (err, res) {
//                 if (err) throw err;
//                 console.log("1 document inserted");
//                 console.log(city_name, i);
//                 //console.log(i);
//                 //i += 1;
//                 //db.close();
//             })

//             // console.log(response.body.data[0])
//         })
//     })
// }

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
        dbo.collection("lab6").find({}).toArray(function (error, result) {
            if (error) throw error;
            res.json(result);
            db.close();
        });

    });

});

// route parameters to get a document at the specified index
app.get('/db/:index', (req, res) => {
    console.log(req.params);
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("WeatherData");
        dbo.collection("lab6").findOne({
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

app.put('/db/:index', async (req) => {
    console.log(req.params)
    client.connect(function (err, db) {
        if (err) throw err;
        console.log("connected to DB in put Requests");
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("lab6");
        collection.updateOne(
            { index: Number(req.params.index) }, {
            $set: { cityname: "Random" },
            $currentDate: { lastModified: true }
        }
        )
        console.log("put test")
    });
})

// Bulk Put Update
app.put('/db', async (req) => {
    console.log(req.params)
    client.connect(function (err, db) {
        if (err) throw err;
        console.log("connected to DB in put Requests");
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("lab6");
        collection.updateMany(
            {
                $set: { cityname: "Random" },
                $currentDate: { lastModified: true }
            }
        )
        console.log("Bulk Update")
    });
})

// delete one
app.delete('/db/:index', async (req) => {
    console.log(req.params)
    client.connect(function (err, db) {
        if (err) throw err;
        console.log("connected to DB in delete Requests");
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("lab6");
        collection.deleteOne(
            { index: Number(req.params.index) }, (err, object) => {
                if (err) throw err;
                console.log("1 document deleted");
            }
        )
    });
})

// Bulk Delete
app.delete('/db', async (req) => {
    console.log(req.params)
    client.connect(function (err, db) {
        if (err) throw err;
        console.log("connected to DB in delete Requests");
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("lab6");
        collection.drop(function (err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection Deleted")
        })
    });
})

// app.put('/db/:index',function(req,res,next){

// })

// put
app.post('/updateCityName', async (req) => {
    client.connect(function (err, db) {
        if (err) throw err;
        console.log("connected to DB in put Requests");
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("lab6");
        collection.updateOne(
            { cityname: req.body.put_city }, {
            $set: { cityname: req.body.update_city },
            $currentDate: { lastModified: true }
        }
        )
        // console.log("City:"+)
    });
})

// post
app.post('/db', (req, res) => {
    city_name = req.body.city_post;
    client.connect((err, db) => {
        if (err) throw err;
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("lab6");
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

app.get('/openweathermapAPI', (req, res) => {
    api = "http://api.openweathermap.org/data/2.5/weather?q=Troy&appid=b756a61f0240767c6fdf5906cdaec009";
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
        data += "<h2 style='text-align: center; color: #6134eb;'>City : Troy, " + country + "</h2>";
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

app.get('/weatherAPI', (req, res) => {
    console.log('city name : Troy');
    api = "http://api.weatherapi.com/v1/current.json?key=8091309be1a24b30af110828220104 &q=Troy,NY&aqi=no";
    request({ url: api, json: true }, function (error, response) {
        var wind_speed = response.body.wind_mph;
        var temperature = response.body.current.temp_f;
        var lon = response.body.location.lon;
        var lat = response.body.location.lat;
        var pressure = response.body.pressure_in;
        var humidity = response.body.humidity;
        var country = response.body.location.country;

        var data = "<div style='border:2px; border-style: solid; border-color:lightblue;'>"
        data += "<div style='width: 100%; float:center;  background-color: lightblue;'>";
        data += "<h1 style='text-align: center; font-size:40px'>Current Weather Report</h1>";
        data += "<h2 style='text-align: center; color: #6134eb;'>City : " + "Troy" + " , " + country + "</h2>";
        data += "<h2 style='text-align: center; color: #6134eb;'>Coordinates : [" + lat + " , " +
            lon + "]</h2>";
        data += "<div style='border:2px; border-style: solid; border-color:white; background-color:lightgrey'>"
        data += "<p style='text-align: center; color: grey; font-size: 40px;'>Temperature: " + temperature + "°F</p>";
        data += "<p style='text-align: center; color: blue; font-size: 40px;'>Wind Speed: " + wind_speed + "m/s</p>";
        data += "<p style='text-align: center; color: darkblue; font-size: 40px;'>Humidity: " + humidity + "%</p>";
        data += "<p style='text-align: center; color: black; font-size: 40px;'>Pressure: " + pressure + "in</p>";
        data += "</div>";
        data += "</div>";
        data += "</div>";
        data += "<h3 style='text-align:center; color:#6134eb;'>API SOURCE : "
        data += '<a href="http://https://www.weatherapi.com/">API Home </a>/<h3>';
        res.send(data);
    })
})
// https://api.weatherbit.io/v2.0/current?city=Troy,NY&key=dd3747b9ff2946d5ba23556c4fe498e5
app.get('/weatherBit', (req, res) => {
    console.log('city name : Troy');
    api = "https://api.weatherbit.io/v2.0/current?city=Troy,NY&key=dd3747b9ff2946d5ba23556c4fe498e5";
    request({ url: api, json: true }, function (error, response) {
        var wind_speed = response.body.data[0].wind_spd;
        var temperature = response.body.data[0].app_temp;
        var lon = response.body.data[0].lon;
        var lat = response.body.data[0].lat;
        var pressure = response.body.data[0].pres;
        var humidity = response.body.data[0].rh;
        var country = response.body.data[0].country_code;

        var data = "<div style='border:2px; border-style: solid; border-color:lightblue;'>"
        data += "<div style='width: 100%; float:center;  background-color: lightblue;'>";
        data += "<h1 style='text-align: center; font-size:40px'>Current Weather Report</h1>";
        data += "<h2 style='text-align: center; color: #6134eb;'>City : " + "Troy" + " , " + country + "</h2>";
        data += "<h2 style='text-align: center; color: #6134eb;'>Coordinates : [" + lat + " , " +
            lon + "]</h2>";
        data += "<div style='border:2px; border-style: solid; border-color:white; background-color:lightgrey'>"
        data += "<p style='text-align: center; color: grey; font-size: 40px;'>Temperature: " + temperature + "°C</p>";
        data += "<p style='text-align: center; color: blue; font-size: 40px;'>Wind Speed: " + wind_speed + "m/s</p>";
        data += "<p style='text-align: center; color: darkblue; font-size: 40px;'>Humidity: " + humidity + "%</p>";
        data += "<p style='text-align: center; color: black; font-size: 40px;'>Pressure: " + pressure + "in</p>";
        data += "</div>";
        data += "</div>";
        data += "</div>";
        data += "<h3 style='text-align:center; color:#6134eb;'>API SOURCE : "
        data += '<a href="https://www.weatherbit.io/api/weather-current">API Home </a>/<h3>';
        res.send(data);
    })
})

app.get('/weatherStack', (req, res) => {
    let params = {
        access_key: "009213cca66f790268a02f3e98cdaea9",
        query: "Troy,NY"
    }
    axios.get('http://api.weatherstack.com/current', { params })
        .then(response => {
            let apiResponse = response.data;
            var lat = apiResponse.location.lat;
            var lon = apiResponse.location.lon;
            var temperature = apiResponse.current.temperature;
            var pressure = apiResponse.current.pressure;
            var windspeed = apiResponse.current.wind_speed;
            var humidity = apiResponse.current.humidity;

            var data = "<div style='border:2px; border-style: solid; border-color:lightblue;'>"
            data += "<div style='width: 100%; float:center;  background-color: lightblue;'>";
            data += "<h1 style='text-align: center; font-size:40px'>Current Weather Report</h1>";
            data += "<h2 style='text-align: center; color: #6134eb;'>City : " + "Troy" + " , </h2>";
            data += "<h2 style='text-align: center; color: #6134eb;'>Coordinates : [" + lat + " , " +
                lon + "]</h2>";
            data += "<div style='border:2px; border-style: solid; border-color:white; background-color:lightgrey'>"
            data += "<p style='text-align: center; color: grey; font-size: 40px;'>Temperature: " + temperature + "°F</p>";
            data += "<p style='text-align: center; color: blue; font-size: 40px;'>Wind Speed: " + wind_speed + "m/s</p>";
            data += "<p style='text-align: center; color: darkblue; font-size: 40px;'>Humidity: " + humidity + "%</p>";
            data += "<p style='text-align: center; color: black; font-size: 40px;'>Pressure: " + pressure + "in</p>";
            data += "</div>";
            data += "</div>";
            data += "</div>";
            data += "<h3 style='text-align:center; color:#6134eb;'>API SOURCE : "
            data += '<a href="https://weatherstack.com/documentation">API Home </a>/<h3>';
            res.send(data);
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