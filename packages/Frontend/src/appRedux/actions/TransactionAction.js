import * as Types from '../../constants/ActionTypes'

export const getListCommission = queryString => {
    return {
        type: Types.GET_LIST_COMMISSION,
        queryString
    }
}
export const getListCommissionSuccess = data => {
    return {
        type: Types.GET_LIST_COMMISSION_SUCCESS,
        payload: data
    }
}
export const getListCommissionSaverSuccess = data => {
    return {
        type: Types.GET_COMMISSION_SAVER_SUCCESS,
        payload: data
    }
}
//with draw
export const getListWithdraw = queryString => {
    return {
        type: Types.GET_LIST_WITHDRAW,
        queryString
    }
}
export const getListWithdrawSuccess = data => {
    return {
        type: Types.GET_LIST_WITHDRAW_SUCCESS,
        payload: data
    }
}
export const getListWithdrawSaverSuccess = data => {
    return {
        type: Types.GET_WITHDRAW_SAVER_SUCCESS,
        payload: data
    }
}