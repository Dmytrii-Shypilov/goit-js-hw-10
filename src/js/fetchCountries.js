export default function fetchCountry(value) {
    return fetch(`https://restcountries.com/v3.1/name/${value}`)
    .then((response) => {
        if (response.ok) {
            return response.json()
        }
    })
}