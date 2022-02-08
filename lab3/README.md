Title : Lab3 </br>
Name : Paul Jang </br>
Description : </br>
In this lab, I've gone back and forth a lot trying to figure out how to build my own REST API, using node.js and express.</br>
I also switched the concept a lot since I've had difficulties understanding how to use my own api to work together with an external api.</br>
At first, I tried to create a book search engine and I confirmed the api working successfully for all four different verbs('get','post','put','delete').</br>
But, later I got stuck at the problem on how to fetch all the data to the frontend web.</br>
So I decided to switch back to the one I used for lab2 and began developing it.</br>
Maintaining the part that I fetched an openweathermap data, I also added an extra api, which is "KakaoMap API".</br>
I would prefer being able to use google map api to have a map features, but since they are not provided at free rate, I had to use KakaoMap API.</br>
The thing with KakaoMap is, since it is Korean firm provided, it only shows a map within Korean territory.</br>
New Functionality added : Now it is able to mark on the map in order to get its geolocational data printed out right under the map.</br>

MY API : </br>
the original version(for book search) : /src_book/api.js </br>
It is called from index.js(entry point) => app.use('/api/v1',api);
Using books.js(books json data files), it successfully get/post/put/delete json object.
The performance above is checkable via postman.

Problem where I got stuck at: </br>
I wanted to implement book search functionality via frontend but I couldn't figure out how to put them altogether. For now, the index page(weather& map) has a link which connects to
a different page(index_2.html). The second page, even though the rest api is fully functional, the search engine is not working.
