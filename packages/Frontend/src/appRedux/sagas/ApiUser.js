import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const loginUser = async data => {
    const request = await axios
    .post(apiURL.API_LOGIN, data)
    return request;
}
const signupUserFromAPI = async data => {
    const request = await axios
    .post(apiURL.API_SIGNUP, data)
    return request;
}
const getForgotPW = async data => {
    const request = await axios
    .post(apiURL.API_GET_FORGOT_PW, data)
    return request;
}
const setNewPW = async data => {
    const request = await axios
    .post(apiURL.API_SET_NEW_PW, data)
    return request;
}
const activeAccountFromAPI = async data => {
    const request = await axios
    .post(apiURL.API_ACTIVE_ACCOUNT, data)
    return request;
}
const signOutUser = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_LOGOUT, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const updateProfileFromAPI = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_PROFILE, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const changePasswordFromAPI = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CHANGE_PASSWORD, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const getReferalFromAPI = async token => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_REFERAL, 
        headers: { 'Authorization': token } 
    })
    return request;
}
/**
 * @memberof Bank Manager
 * @summary CRUD BANK
 */
const getListBankFromApi = async (token) => {
    const request = await axios({ 
        method: 'get', 
        url: apiURL.API_GET_BANK, 
        headers: { 'Authorization': token } 
    })
    return request;
}
const createBankFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_CREATE_BANK, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const updateBankFromApi = async (token, data) => {
    const request = await axios({ 
        method: 'post', 
        url: apiURL.API_UPDATE_BANK, 
        headers: { 'Authorization': token },
        data
    })
    return request;
}
const deleteBankFromApi = async (token, id) => {
    const request = await axios({ 
        method: 'get', 
        url: `${apiURL.API_DELETE_BANK}?id=${id}`, 
        headers: { 'Authorization': token }
    })
    return request;
}

export const API = {
    getReferalFromAPI,
    signupUserFromAPI,
    loginUser,
    signOutUser,
    getForgotPW,
    setNewPW,
    activeAccountFromAPI,
    updateProfileFromAPI,
    changePasswordFromAPI,
    //bank
    getListBankFromApi,
    createBankFromApi,
    updateBankFromApi,
    deleteBankFromApi
}