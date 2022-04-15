Lab 8
Name : Paul Jang

## Description
Unsolved Problems Before this lab : 
1. Get on specific index(user input number) => I have struggled with passing user input into endpoint parameter(db/<user_input>). It kept adding query param(ex=> "db/?number=12") instead of "db/12" so it didn't hit the backend GET function at all.
How did I solve? => Instead of using html form action, I added external jquery function file in src/asset/custom.js to handle this.
The button in the html file has an attribute onClick() which calls paulFunc() in the jquery file. Then it simply adds userinput to the url link and redirect to the page using window.location.href.
Now the user could get an element at specific index by just putting a value into the input field.
2. Put on specific index => it originally only received an user input of the city name instead of the index. In order to make it accessible to endpoint("db/:index"), I deleted form action for this one as well then added (click) attribute to the button to call
putReq() function in the type script (custom.js). Then it calls putFunc()in the custom.js and makes a put request to the endpoint("db/:index"). I also added a logic(isBulk) to handle bulk update case.
For now, they both update the element's cityname to "Random". 
How to check? => once you put the element, check by putting the number into the get input field. 
If you want to change its city name into the target name, you could simply put city name into the fields above using cityname.
4. Delete Request => I used the same logic as in the put request for the delete request. Custom.js' deleteFunc() handles both delete_one and bulk_delete functions.
5. After fixing all these problems, I believe all the requirements for the labs are now met.
6. Please refer to the Zap_report conducted on APR 15th 2022 in the repository directory.

## References 
1. https://jasonwatmore.com/post/2021/09/21/fetch-http-delete-request-examples
2. https://jasonwatmore.com/post/2021/09/20/fetch-http-put-request-examples
3. https://medium.com/bb-tutorials-and-thoughts/how-to-use-jquery-in-angular-1e35b7cf1632
4. https://stackoverflow.com/questions/34128361/appending-form-input-value-to-action-url-as-path
5. https://stackoverflow.com/questions/34128361/appending-form-input-value-to-action-url-as-path
6. https://stackoverflow.com/questions/1107220/how-can-i-select-an-element-by-name-with-jquery

