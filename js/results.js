var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParams() {
  var searchParamsArr = document.location.search.split('&');

  var query = searchParamsArr[0].split('=').pop();
  var appid = searchParamsArr[1].split('=').pop();

  if (!query || !appid) {
    console.log('You are missing a parameter!');
    return;
  }
  searchApi(query, appid);
}

function printResult(resultObj) {
  console.log(resultObj);

  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.name;

  var bodyContentEl = document.createElement('ul');
  bodyContentEl.innerHTML =
    '<li>Date:</li>' + new Date(resultObj.dt * 1000) + '<br/>' +
    '<li>Weather:</li> ' + resultObj.weather[0].description + '<br/>' +
    '<li>Temperature:</li> ' + resultObj.main.temp + '&#8451;<br/>' +
    '<li>Humidity:</li> ' + resultObj.main.humidity + '%<br/>' +
    '<li>Wind Speed:</li> ' + resultObj.wind.speed + ' m/s<br/>';

  resultBody.append(titleEl, bodyContentEl);
  resultContentEl.append(resultCard);
}

function displayFiveDayForecast(forecastObj) {
  console.log(forecastObj);

  var forecastContainer = document.createElement('div');
  forecastContainer.classList.add('forecast-container');

  for(var i = 0; i < forecastObj.list.length; i++) {
    var forecastCard = document.createElement('div');
    forecastCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    var forecastBody = document.createElement('div');
    forecastBody.classList.add('card-body');
    forecastCard.append(forecastBody);

    var forecastContentEl = document.createElement('ul');
    forecastContentEl.innerHTML =
      '<li>Date:</li>' + new Date(forecastObj.list[i].dt * 1000) + '<br/>' +
      '<li>Weather:</li> ' + forecastObj.list[i].weather[0].description + '<br/>' +
      '<li>Temperature:</li> ' + forecastObj.list[i].main.temp + '&#8451;<br/>' +
      '<li>Humidity:</li> ' + forecastObj.list[i].main.humidity + '%<br/>' +
      '<li>Wind Speed:</li> ' + forecastObj.list[i].wind.speed + ' m/s<br/>';
    
    forecastBody.append(forecastContentEl);
    forecastContainer.append(forecastCard);
  }
  resultContentEl.append(forecastContainer);
}

function searchApi(query, appid) {
  var localQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + query;

  if (!localQueryUrl.includes('appid=')) {
    localQueryUrl = localQueryUrl + '&appid=' + appid;
  }


  fetch(localQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      resultTextEl.textContent = query;

      if (locRes.cod !== 200) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        printResult(locRes);

        var fiveDayForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + query + '&cnt=5' + '&appid=' + appid;


        fetch(fiveDayForecastUrl)
          .then(function (response) {
            if (!response.ok) {
              throw response.json();
            }

            return response.json();
          })
          .then(function (forecastRes) {
            console.log(forecastRes);
            displayFiveDayForecast(forecastRes);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;

  };
  }

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();