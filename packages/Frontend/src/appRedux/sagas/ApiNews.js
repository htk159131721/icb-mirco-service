import axios from 'axios'
import {API_GET_LIST_NEWS, API_GET_NEWS_DETAIL} from 'constants/apiURL'

const getListNewsFromApi = async (token) => {
    const request = await axios({ 
        method: 'get', 
        url: API_GET_LIST_NEWS, 
        headers: { 'Authorization': token } 
    })
    return request;
}

const getNewsDetailFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${API_GET_NEWS_DETAIL}?id=${id}`, 
        headers: { 'Authorization': token } 
    })
    return request;
}

export const API = {
    getListNewsFromApi,
    getNewsDetailFromApi
}