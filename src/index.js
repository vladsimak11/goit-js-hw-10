import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');

searchBox.addEventListener('input', debounce(onSearchCountry, 1000));

const BASE_URL = 'https://restcountries.com/v3.1/name/';

function onSearchCountry(event) {

  event.preventDefault();
  const inputValue = event.target.value;

  API.fetchCountries(inputValue)
  .then(country => {
    console.log(country);
  })
  .catch(error => {
    console.log(error);
  })
}




