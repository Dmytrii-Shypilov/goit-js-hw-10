import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import fetchCountry from './js/fetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
    inputField: document.querySelector('#search-box'),
    countryDescription: document.querySelector('.country-info'),
    countriesList: document.querySelector('.country-list')
}

refs.inputField.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(event) { 
    const value = event.target.value.trim()
    fetchCountry(value)
    .then(renderCountries)
    .catch(dropErrorMessage)
    
}

function renderCountries (countries) {
    if (countries.length > 10) {
        resetMarkup() 
        Notify.info("Too many matches found. Please enter a more specific name.")
         } 
    if (countries.length === 1) {
        resetMarkup()
        countries.map((country) => {   
            const languages = Object.values(country.languages).join(", ")
            const markup = 
            `<div class="wrapper">
                <img width="60" src="${country.flags.svg}"/>
                <p class="country-title">${country.name.official}</p>
            </div>
            <ul class="description-list">
                 <li class="description-item">Capital: <span class="text"> ${country.capital}</span></li>
                <li class="description-item">Population: <span class="text">${country.population}</span></li>
                 <li class="description-item">Languages: <span class="text">${languages}</span></li>
            </ul>`
                
        return refs.countryDescription.insertAdjacentHTML('beforeend', markup) 
        })
    }

    if (countries.length > 1 && countries.length < 11) {
        resetMarkup();
        countries.map((country) => {
            const languages = Object.values(country.languages)
            const markup = 
            `<li class="country">
                <img width="40" src="${country.flags.svg}"/><span class="country-name">${country.name.official}</span>
            </li> `
            refs.countriesList.insertAdjacentHTML('beforeend', markup)
            })
        }
    
    }

function resetMarkup () {
    refs.countriesList.innerHTML=" ";
    refs.countryDescription.innerHTML=" ";
}

function dropErrorMessage(error) {
    resetMarkup() 
    console.log(error)
    return Notify.failure("Oops, there is no country with that name")  
}