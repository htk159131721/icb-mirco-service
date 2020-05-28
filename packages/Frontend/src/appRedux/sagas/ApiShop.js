import axios from 'axios'
import * as apiURL from 'constants/apiURL'

//package
const getListPackageFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_PACKAGE, 
        headers: { 'Authorization': token } 
    })
    return request;
}

const buyPackageFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_BUY_PACKAGE, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
//combo
const getListComboFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_COMBO, 
        headers: { 'Authorization': token } 
    })
    return request;
}
export const API = {
    getListPackageFromApi,
    getListComboFromApi,
    buyPackageFromApi
}