TITLE : <LAB6>
Name  : Paul Jang

## Description: 
    <pt.1> : In order to preload the database: Lab6-<WeatherData> collections<lab6>,
    I first created an array, which contains more than 400 (US+UK) cities. I first tried to insert each city's weather data using a for loop which loops over the array, and makes a "request" call everytime. Which I've had a problem from the lab5 and now I fixed the problem by wrapping a whole connection part by for loop so that the system attempts to connect to db everytime it increments(move to the next city in the citylist).
    Now the db has more than 400 data from each different APIs: </br>
    1.OpenWeatherMap</br>
    2.WeatherBit</br>
    3.WeatherStack</br>
    4.WeatherAPI</br>
    <"APIs I tried to use but didn't work"><br>
    1. accuweather => the key didn't validate correctly to call an API<br>
    2. weather Gov => doesn't allow querying by the cityname.<br>
    <pt.2> :
    Get : 
        1) For getting all the documents existing in the db collection, I created a form that operates an action to the endpoint("/db"). This call successfully runs a get function from the backend. <br>
            <how to run> 
                - 1. enter "localhost:3000/db"
                - 2. clcik the button "Get all the documents in db collections!"
        2) For getting the document at the specified index, I created another get function in the "server.js" with the different endpoint("/db/:index") and this function checks whether the db has an element at the index and send json file to the front.
            <how to run>
                - ex): enter "localhost:3000/db/15
    Post : 
        In order to either add or retrieve the data with an user input parameter,
        I created an input field and the "Post" button in the frontend. Then in the backend, I created a post method("/db") which queries the db with the entered city name and add if the city doesn't exist in the db.
            <how to run>
                - ex): enter "Toronto" in the input field above the Post button.
            <where did I get stuck?>
                - 1. I had difficulties with counting a db size in order to correctly upload an index for newly added document.
            <how did I solve?>
                - 1. "https://www.mongodb.com/docs/manual/reference/method/db.collection.countDocuments/#client-disconnection" helped me figure out how to count the db collection size.
        As instructed, post doesn't return anything at "db/:index".
    Put : 
        1. Enter the cityname from the db that you want to update => ex) Albany<br>
        2. Enter the new name you want to change it from Albany => ex) Albany_2<br>
        Then now you could the cityname has been changed from "Albany" to "Albany_2"<br>
        Using form from the frontend, I sent the request by POST so that in server.js, the system modifies the data field after querying the data by cityname <br>
    
    <pt.3>: a new angular component
    For the newly created features of the web, I created new component named "pt3", which redirects an user to all different API calls for city Troy
    <buttons instructions> 
        - 1. openWeather => redirects the page to API call of city Troy from openWeatherMap API.
        - 2. weatherStack => redirects the page to API call of city Troy from weatherStack API.
        - 3. weatherBit => redirects the page to API call of city Troy from weatherBit API.
        - 4. weatherAPI => redirects the page to API call of city Troy from weatherAPI API.
        Since they all require key for making a call and have limited number access, it might sometimes go out of scope.
