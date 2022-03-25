TITLE : <LAB5>
Name  : Paul Jang

Description: 
    <pt.1> : In order to preload the database: Lab5-<WeatherData> collections<lab5Weather>,
    I first created an array, which contains more than 100 US cities. I first tried to insert each city's weather data using a for loop which loops over the array, and makes a "request" call everytime. But since the for loop didn't wait until it makes a request call for the index of the city, I just decided to manually preload the data from the index of 0 to 99. Now in the db, there are 100 different US cities' weather data loaded.
    <pt.2> :
    Get : 
        1) For getting all the documents existing in the db collection, I created a form that operates an action to the endpoint("/db"). This call successfully runs a get function from the backend. 
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
        Put function in the backend seems to correctly handle updating documents.
        As of now, it updates the document's cityname and temperature to the arbitrary values.
    Delete : 
        Incomplete for now
    
    <pt.3>: a new angular component
    For the newly created features of the web, I created new component named "database", which handles all the forms for passing action to the backend http calls().
    <buttons instructions> 
        - 1. Get all the documents in db collections! => retrieves and displays all the documents from the db colletion.
        - 2. Post(input field and button) => enter the city name that you want to either add to db or view.
        - 3. Put/Delete => incomplete
            - <where did I get stuck?>
                - 1. I've been struggling figuring out how to add an user input(index) to the endpoint("db/:index")
                - 2. Since both Put and Delete is not available to be passed as a form action from the frontend, I tried to make it work with javascript implement, but I ended up not getting it correctly.
    
