import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListOrderFromApi = async (token, queryString) => {
    let string = "";
    if(!!queryString){
        string = queryString;
    }
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_GET_LIST_ORDER}${string}`, 
        headers: { 'Authorization': token } 
    })
    return request;
}

const getOrderDetailFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_GET_ORDER_DETAIL}?order_id=${id}`, 
        headers: { 'Authorization': token } 
    })
    return request;
}

export const API = {
    getListOrderFromApi,
    getOrderDetailFromApi
}