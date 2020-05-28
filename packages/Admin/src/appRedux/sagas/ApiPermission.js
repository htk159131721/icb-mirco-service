import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListGroupPermissionFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_GROUP_PERMISSION, 
        headers: { 'Authorization': token } 
    })
    .then(res => res)
    .catch(err => err)
    return request;
}
const getListPermissionFromApi = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_LIST_PERMISSION, 
        headers: { 'Authorization': token } 
    })
    .then(res => res)
    .catch(err => err)
    return request;
}
const getListPermissionByGroupFromApi = async (token, groupId) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_GET_LIST_PERMISSION_BY_GROUP}?group_id=${groupId}`, 
        headers: { 'Authorization': token } 
    })
    .then(res => res)
    .catch(err => err)
    return request;
}

export const API = {
    getListGroupPermissionFromApi,
    getListPermissionByGroupFromApi,
    getListPermissionFromApi
}