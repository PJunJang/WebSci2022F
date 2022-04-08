Lab7

Name : Paul Jang

## Description : 
1. For the lab, I exported my mongodb weatherdata collection into a json file and used it for the entire lab. (directory => frontend/src/assets/weather_data.json)
2. In order to visualize the humidity data for each city (400). 
3. I first had to import the weatherdata, so in each component.ts file, I wrote a function getJsonData() and returned weatherdata from the path above.
4. I used httpClient in order to return the data above on the same page.

## Bar Plot :
1. As I decided to plot the bar chart that describes the number of cities under the specified humidity range ( ex> : 30 cities that have humidity in range between 20 - 30 (%) ),
I wrote a simple range division function countNum().
2. Running for loop 400 times(the cities number), count each number of cities under the condition.
3. Then convert the values into string for datatype.
4. ngOnInit() => set frame works for each range increasing by 10 until 100
5. set each counted number for the height of the bars
6. pass the jsonData into draw the bar plot.

## Scatter Plot:
1. I did pretty much same as for the bar chart.
2. <I got stuck here> : since the scatter chart requires three different attributes to form a chart, I had to redesign the plot structure(axis)
3. As I wanted to show the similar effect to the bar chart with humidity groups, I divided x axis by 10 again then stated the range right next to each scattered point of the graph.

## References:
1. https://stackoverflow.com/questions/10928528/receiving-json-data-back-from-http-request
2. https://angular.io/guide/observables
3. https://blog.logrocket.com/data-visualization-angular-d3/

