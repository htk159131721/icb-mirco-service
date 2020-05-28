import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListComboFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_COMBO, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const createComboFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_COMBO, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updateComboFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_COMBO, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const deleteComboFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_COMBO}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    return request;
}
const updatePositionFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_POSITION, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
export const API = {
    getListComboFromApi,
    createComboFromApi,
    updateComboFromApi,
    deleteComboFromApi,
    updatePositionFromApi
}