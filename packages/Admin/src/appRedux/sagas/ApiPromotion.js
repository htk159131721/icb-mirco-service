import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListPromotionFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_PROMOTION, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const createPromotionFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_PROMOTION, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updatePromotionFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_PROMOTION, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const deletePromotionFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_PROMOTION}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    return request;
}
export const API = {
    getListPromotionFromApi,
    createPromotionFromApi,
    updatePromotionFromApi,
    deletePromotionFromApi
}