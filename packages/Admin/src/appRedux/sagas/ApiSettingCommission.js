import axios from 'axios'
import * as apiURL from 'constants/apiURL'

/********* Package **********/
const getListCommissionPackageFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'get',
        url: `${apiURL.API_GET_LIST_COMMISSION_PACKAGE}?id=${data[0]}&type=${data[1]}`, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const createCommissionPackageFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_COMMISSION_PACKAGE, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}

/********* Caculate Commission **********/
const getListCommissionFromApi = async (token) => {
    const request = await axios({ 
        method: 'get',
        url: apiURL.API_GET_LIST_COMMISSION, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const updateCommissionFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_COMMISSION, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
/****************************** Level Commission ************************** */
const getListLevelCommissionFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_LEVEL_COMMISSION, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const createLevelCommissionFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_LEVEL_COMMISSION, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updateLevelCommissionFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_LEVEL_COMMISSION, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const deleteLevelCommissionFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_LEVEL_COMMISSION}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    return request;
}
export const API = {
    getListCommissionPackageFromApi,
    createCommissionPackageFromApi,
    getListCommissionFromApi,
    updateCommissionFromApi,
    /********* level cms */
    getListLevelCommissionFromApi,
    createLevelCommissionFromApi,
    updateLevelCommissionFromApi,
    deleteLevelCommissionFromApi
}