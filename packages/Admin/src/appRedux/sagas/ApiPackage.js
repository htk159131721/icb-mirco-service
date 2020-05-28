import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListPackageFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_PACKAGE, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const createPackageFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_PACKAGE, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updatePackageFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_PACKAGE, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const deletePackageFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_PACKAGE}?id=${id}`, 
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
    getListPackageFromApi,
    createPackageFromApi,
    updatePackageFromApi,
    deletePackageFromApi,
    updatePositionFromApi
}