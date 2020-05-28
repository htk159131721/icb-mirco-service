import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListCatePackageFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_CATE_PACKAGE, 
        headers: { 'Authorization': token } 
    })
    .then(res => res)
    .catch(err => err)
    return request;
}
const createCatePackageFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_CATE_PACKAGE, 
        headers: { 'Authorization': token },
        data
    })
    .then(res => res)
    .catch(err => err)
    return request;
}
const updateCatePackageFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_CATE_PACKAGE, 
        headers: { 'Authorization': token },
        data
    })
    .then(res => res)
    .catch(err => err)
    return request;
}
const deleteCatePackageFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_CATE_PACKAGE}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    .then(res => res)
    .catch(err => err)
    return request;
}


export const API = {
    getListCatePackageFromApi,
    createCatePackageFromApi,
    updateCatePackageFromApi,
    deleteCatePackageFromApi
}