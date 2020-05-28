import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListReceiptFromApi  = async (token) => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_LIST_RECEIPT, 
        headers: { 'Authorization': token } 
    })
    return request;
}

const createReceiptFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_RECEIPT, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}

const deleteReceiptFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_RECEIPT}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    return request;
}
export const API = {
    getListReceiptFromApi,
    createReceiptFromApi,
    deleteReceiptFromApi
}