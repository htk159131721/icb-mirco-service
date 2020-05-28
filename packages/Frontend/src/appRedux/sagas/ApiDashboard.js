import axios from 'axios'
import * as apiURL from 'constants/apiURL'

const getDashboardFromApi = async (token) => {
    const request = await axios({
        method: 'get',
        url: apiURL.API_GET_DASHBOARD,
        headers: { 'Authorization': token }
    })
    return request;
}

const postSentInviteEmailApi = async (token, email) => {
    const request = await axios({
        method: 'post',
        url: apiURL.API_POST_SENT_EMAIL_INVITE,
        headers: { 'Authorization': token },
        data: email
    })
    return request;
}

const createWithdrawAPI = async (token, data) => {
    const request = await axios({
        method: 'post',
        url: apiURL.API_CREATE_WITHDRAW,
        headers: { 'Authorization': token },
        data
    })
    return request;
}

export const API = {
    getDashboardFromApi,
    postSentInviteEmailApi,
    createWithdrawAPI
}
