import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListSystemFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_SYSTEM, 
        headers: { 'Authorization': token } 
    })
    .then(res => res)
    .catch(err => err)
    return request;
}
const updateSystemFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_SYSTEM, 
        headers: { 'Authorization': token },
        data
    })
    .then(res => res)
    .catch(err => err)
    return request;
}

export const API = {
    getListSystemFromApi,
    updateSystemFromApi
}