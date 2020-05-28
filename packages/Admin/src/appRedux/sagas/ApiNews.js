import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListNewsFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_NEWS, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const createNewsFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_NEWS, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updateNewsFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_NEWS, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const deleteNewsFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_NEWS}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    return request;
}
export const API = {
    getListNewsFromApi,
    createNewsFromApi,
    updateNewsFromApi,
    deleteNewsFromApi
}