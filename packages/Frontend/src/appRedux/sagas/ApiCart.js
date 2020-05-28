import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getCartFromApi = async (token) => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_CART, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const createCartFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_CART, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updateCartFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_CART, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const deleteCartFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_CART}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    return request;
}

const checkPromotionFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: `${apiURL.API_CHECK_PROMOTION}`, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const getOrderPaymentViewFromApi = async (token) => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_ORDER_LATEST_VIEW_PAYMENT, 
        headers: { 'Authorization': token }
    })
    return request;
}
const updatePaymentViewFromApi = async (token) => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_UPDATE_ORDER_LATEST_VIEW_PAYMENT, 
        headers: { 'Authorization': token }
    })
    return request;
}

const checkOutFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: `${apiURL.API_CHECK_OUT}`, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}

export const API = {
    getCartFromApi,
    getOrderPaymentViewFromApi,
    createCartFromApi,
    updateCartFromApi,
    updatePaymentViewFromApi,
    deleteCartFromApi,
    checkPromotionFromApi,
    checkOutFromApi
}