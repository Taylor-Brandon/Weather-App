var searchFormEl = document.querySelector('#search-form');
var apiKey = 'c729ec46d49e9a4421698491ae355b48';

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        alert('You have not searched for your city!');
        return;
    }
    var queryString = './weather-results.html?q=' + searchInputVal + '&appid=' + apiKey;

    location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);