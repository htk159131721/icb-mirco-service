import * as Types from '../../constants/ActionTypes'

export const getListReceipt = () => {
    return {
        type: Types.GET_LIST_RECEIPT
    }
}
export const getListReceiptSuccess = (users) => {
    return {
        type: Types.GET_LIST_RECEIPT_SUCCESS,
        payload: users
    }
}

// CRUD Receipt
export const createReceipt = data => {
    return {
        type: Types.CREATE_RECEIPT,
        data
    }
}
export const createReceiptSuccess = (data) => {
    return {
        type: Types.CREATE_RECEIPT_SUCCESS,
        payload: data
    }
}

export const deleteReceipt = id => {
    return {
        type: Types.DELETE_RECEIPT,
        id
    }
}
export const deleteReceiptSuccess = (id) => {
    return {
        type: Types.DELETE_RECEIPT_SUCCESS,
        meta:{
            id
        }
    }
}
