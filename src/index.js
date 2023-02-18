import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(event) {

  event.preventDefault();
  const inputValue = event.target.value;
  const inputLength = event.target.value.length;

  API.fetchCountries(inputValue)
  .then(country => {
    
    if(country.length > 10) {
      return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } 
    
    if(country.length >= 2 && country.length <= 10) {
      return renderListCountry(country);
    } 
    
    return render.renderCardCountry(country);

  })
  .catch(() => {
    Notiflix.Notify.failure('Oops, there is no country with that name');;
  })
}

function renderListCountry(countryValues) {
  const markup = countryValues
    .map(({name, flags}) => {
      return `
      <li class="main-info">
        <img src="${flags.svg}"
        alt="Flag"
        />
        <p class="name-country"> ${name.official}</p>
      </li>
      `;
    })
    .join("");

  countryInfo.innerHTML = markup;
}

function renderCardCountry(countryValues) {
  const markup = countryValues
    .map(({name, capital, population, flags, languages}) => {
      return `
      <div class="main-info">
        <img src="${flags.svg}"
        alt="Flag"
        />
        <p class="name"> ${name.official}</p>
      </div>

      <div>
        <p><b>Capital</b>: ${capital}</p>
        <p><b>Population</b>: ${population}</p>
        <p><b>Languages</b>: ${Object.values(languages)}</p>
      </div>
      `;
    })
    .join("");

  countryInfo.innerHTML = markup;
}

export default { renderCardCountry};