## README : LAB 1 - WebScience Fall 2022 </br>
Name : Paul Jang </br>
Project : News Ticker Using HTML/CSS/Javascript/JSON(AJAX) </br>
Description : In this lab, I built a web of news ticker which vertically ticks various news feeds from different sources. </br>
## System Structure : </br>
1. ticker.html : This is the html file that displays all the required data. In order to fit in mobile screen(required condition for this lab), I applied some bootstrap features here and there, especially with NAV bar on top of the page. The nav bar contains multiple different sources of Major News Media todays. 
2. In order to utilize multiple bootstrap sources, I had to import bootstrap bundle from cdn : https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js
3. In this web, I used an "easy-ticker" plugin with jquery. : https://cdnjs.cloudflare.com/ajax/libs/jquery-easy-ticker/2.0.0/jquery.easy-ticker.min.js
4. Ajax source was used for ajax call to fetch/display json data on html page. : https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
5. In order to fetch json data in desired position, I created division named "ticker-board" and placed multiple unordered lists as a place holder for each content  from different sources.</br>
</t> 1) For user's visibility, I had to add '1' to each key when appending data to the placeholders(selector tags).
6. In order to scrape multiple news feeds and convert into json type, I used online sources as follows : </br>
</t> 1) https://about.fb.com/wp-content/uploads/2016/05/rss-urls-1.pdf : I added the link of the source in the nav bar as well. (in RSS-Reference)</br>
</t> 2) https://rss2json.com/#rss_url=https%3A%2F%2Ftechcrunch.com%2Ffeed%2F : I used this online source for converting RSS(XML) feeds into JSON.</br>

7. For displaying data, I used javascript function which loops through each key/val and appended them to the placeholders I made in body portion.
8.  ticker.js : </br>
</t> 1) As mentioned, easyTicker plugin provides very simple usage of creating ticker functions. </br>
</t> 2) In order to make them shift every three second, I set interval as 3000, and made it move up.</br>
9. tickerstyle.css : I used simple css styles,trying to make some aesthethic effects throughout the page.</br>
10. Overall, since I have never done such projects creating news ticker app, I got stuck at here and there during the lab. Even fetching data from json to html was a challenging moment for me which made me spend much time for searching up for resources. In later labs, it would be great if we get more specific guide on each lab with brief sample cases with codes so that we could try to work off on it. 
