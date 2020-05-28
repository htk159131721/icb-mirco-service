import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListRoleFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_ROLE, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const createRoleFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_ROLE, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updateRoleFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_ROLE, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const deleteRoleFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_ROLE}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    return request;
}


export const API = {
    getListRoleFromApi,
    createRoleFromApi,
    updateRoleFromApi,
    deleteRoleFromApi
}