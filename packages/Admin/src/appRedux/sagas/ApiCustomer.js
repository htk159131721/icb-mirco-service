import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListCustomerFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_CUSTOMER, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const getListRefFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_REF, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const createCustomerFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_CUSTOMER, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updateCustomerFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_CUSTOMER, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updateStatusCustomerFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_STATUS_CUSTOMER, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const deleteCustomerFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_CUSTOMER}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    return request;
}


export const API = {
    getListCustomerFromApi,
    createCustomerFromApi,
    updateStatusCustomerFromApi,
    updateCustomerFromApi,
    deleteCustomerFromApi,
    getListRefFromApi
}