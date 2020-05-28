import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListAgencyFromApi  = async (token) => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_LIST_AGENCY, 
        headers: { 'Authorization': token } 
    })
    return request;
}

const createAgencyFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_AGENCY, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updateAgencyFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_AGENCY, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const deleteAgencyFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_AGENCY}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    return request;
}
export const API = {
    getListAgencyFromApi,
    createAgencyFromApi,
    updateAgencyFromApi,
    deleteAgencyFromApi
}