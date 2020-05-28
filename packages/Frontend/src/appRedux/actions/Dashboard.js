import * as Types from "constants/ActionTypes";

export const getDashboard = () => {
    return {
        type: Types.GET_DASHBOARD
    }
}
export const getDashboardSuccess = data => {
    return {
        type: Types.GET_DASHBOARD_SUCCESS,
        payload: data
    }
}
/**
 * Sent Email Invitation
 */

export const postSentEmailInvite = (email) => {
    return {
        type: Types.POST_SENT_EMAIL_INVITE,
        email
    }
}
export const postSentEmailInviteSuccess = data => {
    return {
        type: Types.POST_SENT_EMAIL_INVITE_SUCCESS,
        payload: data
    }
}

export const createWithdrawRequest = (data) => {
    return {
        type: Types.CREATE_WITHDRAW_REQUEST,
        data
    }
}
export const createWithdrawRequestSuccess = data => {
    return {
        type: Types.CREATE_WITHDRAW_REQUEST_SUCCESS,
        payload: data
    }
}