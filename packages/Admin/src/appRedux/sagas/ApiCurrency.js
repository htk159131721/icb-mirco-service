import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListCurrencyFromApi  = async (token) => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_LIST_CURRENCY, 
        headers: { 'Authorization': token } 
    })
    return request;
}

const createCurrencyFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_CURRENCY, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updateCurrencyFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_CURRENCY, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const deleteCurrencyFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_CURRENCY}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    return request;
}
export const API = {
    getListCurrencyFromApi,
    createCurrencyFromApi,
    updateCurrencyFromApi,
    deleteCurrencyFromApi
}