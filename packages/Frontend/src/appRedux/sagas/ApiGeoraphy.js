import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListCountriesFromApi = async () => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_COUNTRIES
    })
    return request;
}
const getListCitiesFromApi = async (cityName) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_GET_LIST_CITIES}?city_name=${cityName}`
    })
    .then(res => res)
    .catch(err => err)
    return request;
}

export const API = {
    getListCountriesFromApi,
    getListCitiesFromApi
}