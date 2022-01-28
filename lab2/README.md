
Lab 2 - Weather API</br>
Name : Paul Jang</br>
Description : </br>
1. For this lab, I created a web app dynamically display weather data according to the user's geolocial location. </br>
In order to make the site simple and intuitive, I laid out the contents in multiple divisions of containers. </br>
The site currently shows today's data on the top left portion. </br>
I first made multiple containers and put static values to get placeholders for later then retreived current dynamic weather data. </br>
As given in the instruction, I utilized OpenWeatherMap API throughout the app. </br>
First, in order to get current location data, I utilized geolocation.getCurrentPostion() API to get my current latitude and longitude.</br>
Once geolocation data gets passed in, it was able to use those latitude and longitude to retreive the coordinates' weather data using openweathermap.</br>
In my app, I displayed : humidity, pressure, wind_speed => all these are attributes of the API.</br>
Since I needed daily data for today and the other days on the week, I excluded hourly and minutely from the attributes.</br>
Also, I used API to get an icon for each day, which gives more intuition of daily weather.</br>
After getting all the data required, I was able to pass the data into html using innerHTML with each selector tag I secured as a placeholder.</br>

2. APIs examination:</br>
1) Imgflip API : This API lets users generate a number of memes easily. The data is stored as JSON. As each meme element contains individual keys(id) and values, it is easy for users to search and generate memes.
2) coinAPI : It also provides a free api key to use upon an user sign up. It provides cryptocurrency exchange API and has data on more than 9000 assets. Since the data is accessible thru REST, it is able to get data in JSON or XML type. Once the user pulls all required data from api into the sheet, the user could now query data upon their needs.
3) Census API : Using Census API, it is able to access raw data from census bureau. The result of census api data queries returns in JSON type, so that the user could easily plug data into the formatting file. With this api, an user could utilize datasets of the american community survey, population estimates and growth, and international trade status. 
For example with population estimates data, it is available to query the data using NAME for geography name, and POP for total populaiton.
