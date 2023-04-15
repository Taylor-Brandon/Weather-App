var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParams () {
    var searchParamsArr = document.location.search.split('&');

    var query = searchParamsArr.find(function(param) {
        return param.includes('?q=')
    });
    var key = searchParamsArr.find(function(param) {
        return param.includes('appid=');
    });
    if(!query || key) {
        console.log('You are missing a parameter!')
        return;
    }
    var queryEl = query.split('=').pop();
    var appidEl = query.split('=').pop();

    searchApi(queryEl, appidEl);
}

function printResults(resultObj) {
    console.log(resultObj);

    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.title;

    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
      '<strong>Date:</strong> ' + resultObj.date + '<br/>';
  
    if (resultObj.subject) {
      bodyContentEl.innerHTML +=
        '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Subjects:</strong> No subject for this entry.';
    }
  
    if (resultObj.description) {
      bodyContentEl.innerHTML +=
        '<strong>Description:</strong> ' + resultObj.description[0];
    } else {
      bodyContentEl.innerHTML +=
        '<strong>Description:</strong>  No description for this entry.';
    }
    var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}

function searchApi(queryEl, appidEl) {
    var localQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + queryEl + '&appid=' + appidEl;

    if (queryEl) {
        localQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?' + queryEl;
    }

    localQueryUrl = localQueryUrl + '&appid=' + appidEl;

   fetch(localQueryUrl)
   .then(function (response) {
    if(!response.ok) {
        throw response.json();
    }
    return response.json();
   })
   .then(function (locRes) {
    resultTextEl.textContent = locRes.search.queryEl;

    console.log(locRes);

    if(!locRes.results.length) {
        console.log('No results found :( ');
        resultContentEl.innerHTML = '<h3>No results found, search again!<h3>';
    } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < locRes.results.length; i++) {
            printResults(locRes.resultso[i]);
        }
    }
   })
   .catch(function (error) {
    console.log(error);
   });
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-input').value;
    var formatInputVal = document.querySelector('#format-input').value;
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    searchApi(searchInputVal, formatInputVal);
  }
  
  searchFormEl.addEventListener('submit', handleSearchFormSubmit);
  
  getParams();