
## LAB 4 </br>
Name : Paul Jang </br>

## 1. Part 0 <br>
   I sent the text doecument thru email on the lab released date.
## 2. In order to connect Backend(Node) and frontend(angular), I added the following line in the code(server.js) : <br>
  1) const path = require('path');
  2) app.use(express.static(path.join(__dirname, '../frontend/openWeather/dist/open-weather')));
  3) Once after I implemented those two lines, it was able to host the page at ("localhost:3000"), which is the backend.
  4) Problem I was stuck here : While working on the frontend(4200), I kept trying to see if the backend always maintains the same page as in the frontend(3000).<br>
  But during the process, I've had to face the situation where backend sometimes didn't keep track of the styles in frontend. <br>
  5) How did I solve : I figured out that it was because the frontend was not actually "Rebuilding" the project as I save it. I googled "ng build on save" and I found a helpful resource: https://stackoverflow.com/questions/40224607/how-do-i-build-with-watch-enabled-using-angular-cli <br>
  Then I tried <ng build --watch>, and it successfully corrected the problem.
  6) ## Frontend structure
    1. I first created a project named "openWeather" in the frontend folder
    2. Then I created a title component to be put on the top of the app.component.html
    3. Then for the major functionality in the page, which is to display the current weather info of the user's location, I created a component named 'today'.
    4. I also created a service named 'weather' in order to inject it to the today.component.ts for making it successfully get the current data of user location.
    5. In the weather.service.ts: It first stores 'url' and my 'apiKey'.
    6. Then in getWeatherDataByCityName function, using HttpParams(), I set all the conditions to get weather data by passing the 'city' as a parameter.
    7. Then in today.component.ts, in getCity(), the function is written in order to call the getWeatherDataByCityName() created from the step above in the weather service.
    8. In today.component.html, I created a form to receive a 'city_name' as a parameter upon the button's click. In order to call the getCity() function created above, I added an (click) attribute to pass the input which is a city_name.
    9. Upon it's click, it successfully redirects to the endpoint (weatherdata/currentGet) using GET method.
    10. Once it hits the endpoint above, it successfully operates the logic I created in "server/js" from the backend folder.
    11. The backend page, I tried to design it minimal and simple to display all the required weather data.
    12. The way how I called the external API is quite similar to how I called in the service.
    13. After storing all the data into the vars I created, I just appended all the data in order as I want it to be displayed in my customized design.
  ## Basic Frontend Page
  1. the top part is from title component.
  2. Search bar is to pass the city name into the backend.
  3. The current weather data box simply displays all the weather data.
    => I had to use two-way binding to get the weather data to be displayed in the box.
  
  ## Part2.
  I tried attack scan via OWASP ZAP tool and it gave me no red flag error.
  The file is included in the lab4 folder(ZAP_REPORT).
  

  

