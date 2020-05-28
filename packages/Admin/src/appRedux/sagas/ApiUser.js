import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getListUserFromApi  = async (token) => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_LIST_USER, 
        headers: { 'Authorization': token } 
    })
    .then(res => res)
    .catch(err => err)
    return request;
}
const loginAdmin = async data => {
    const request = await axios
    .post(apiURL.API_LOGIN, data)
    .then(res => res)
    .catch(err => err)
    return request;
}
const signOutAdmin = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_SIGNOUT, 
        headers: { 'Authorization': token } 
    })
    .then(res => res)
    .catch(err => err)
    return request;
}
const getUserProfile = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_USER_PROFILE, 
        headers: { 'Authorization': token } 
    })
    .then(res => res)
    .catch(err => err)
    return request;
}

const createUserFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_USER, 
        headers: { 'Authorization': token },
        data
    })
    .then(res => res)
    .catch(err => err)
    return request;
}
const updateUserFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_USER, 
        headers: { 'Authorization': token },
        data
    })
    .then(res => res)
    .catch(err => err)
    return request;
}
const deleteUserFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_USER}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    .then(res => res)
    .catch(err => err)
    return request;
}
const getForgotPasswordFromApi = async data => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_GET_FORGOT_PW,
        data
    })
    return request;
}
const setNewPasswordFromApi = async data => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_NEW_PASSWORD,
        data
    })
    return request;
}

export const API = {
    getListUserFromApi,
    getUserProfile,
    loginAdmin,
    signOutAdmin,
    createUserFromApi,
    updateUserFromApi,
    deleteUserFromApi,
    getForgotPasswordFromApi,
    setNewPasswordFromApi
}