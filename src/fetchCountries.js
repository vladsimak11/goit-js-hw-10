const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(nameCountry) {

  const options = `?fields=name,capital,population,flags,languages`

  options.toString()

  return fetch(`${BASE_URL}${nameCountry}${options}`).then(response => {
      if(!response.ok) {
      throw new Error(response.status);
      }
      return response.json();
  });
};

export default {fetchCountries};