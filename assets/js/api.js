'use strict';

const api_key = 'e1ab98f7b7f82d223ea44ba97ef6227c';
const imageBaseURL = 'https://image.tmdb.org/t/p/';

//Fetch data from a server using 'url' and passing the result to json data to a 'callback' function, along with an optional parameter if has 'optionalparam'
 
const fetchDataFromServer = function(url, callback, optionalparam) {
    fetch(url)
      .then(response => response.json())
      .then(data => callback(data, optionalparam))
}

export { imageBaseURL, api_key, fetchDataFromServer };









