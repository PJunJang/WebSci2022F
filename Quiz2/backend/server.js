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


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://junemin97:Springsummer9!@lab5.xi2hc.mongodb.net/Lab5?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
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



// GET/mongo
app.get('/mongo', (req, res) => {
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("WeatherData");
        dbo.collection("quiz2_data").find({}).toArray(function (error, result) {
            if (error) throw error;
            res.json(result);
            db.close();
        });

    });

});

// route parameters to get a document at the specified index
app.get('/mongo/:number', (req, res) => {
    console.log(req.params.number);
    client.connect(function (err, db) {
        if (err) throw err;
        var dbo = db.db("WeatherData");
        dbo.collection("quiz2_data").findOne({
            // req.params.index is passed in as a string so I had to convert it to an int
            index: Number(req.params.number)
        },
            function (err, result) {
                if (err) throw err;
                res.json(result);
                console.log(result);
                db.close();
            });
    });
});


// post
app.post('/mongo', (req, res) => {
    // city_name = req.body.city_post;
    client.connect((err, db) => {
        if (err) throw err;
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("quiz2_data");
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

app.post('/mongo/:number', async (req) => {
    client.connect(function (err, db) {
        if (err) throw err;
        console.log("[ERR] : DO NOT TRY A NUMBER FOR POST!!!");
        // console.log("City:"+)
    });
})



app.put('/db/:number', async (req) => {
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
app.put('/mongo', async (req) => {
    console.log(req.params)
    client.connect(function (err, db) {
        if (err) throw err;
        console.log("connected to DB in put Requests");
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("quiz2_data");
        collection.updateMany(
            {
                $set: { Events: "Bulk Updated!" },
                $currentDate: { lastModified: true }
            }
        )
        console.log("Bulk Update")
    });
})

// delete one
app.delete('/mongo/:number', async (req) => {
    console.log(req.params)
    client.connect(function (err, db) {
        if (err) throw err;
        console.log("connected to DB in delete Requests");
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("quiz2_data");
        collection.deleteOne(
            { index: Number(req.params.number) }, (err, object) => {
                if (err) throw err;
                console.log("1 document deleted");
            }
        )
    });
})

// Bulk Delete
app.delete('/mongo', async (req) => {
    console.log(req.params)
    client.connect(function (err, db) {
        if (err) throw err;
        console.log("connected to DB in delete Requests");
        var dbo = db.db("WeatherData");
        var collection = dbo.collection("quiz2_data");
        collection.drop(function (err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection Deleted")
        })
    });
})









app.use(express.static(path.join(__dirname, '../frontend/paulquiz/dist/paulquiz')));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})