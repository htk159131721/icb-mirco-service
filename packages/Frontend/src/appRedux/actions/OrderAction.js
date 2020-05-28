import * as Types from '../../constants/ActionTypes'

export const getListOrder = queryString => {
    return {
        type: Types.GET_LIST_ORDER,
        queryString
    }
}
export const getListOrderSuccess = data => {
    return {
        type: Types.GET_LIST_ORDER_SUCCESS,
        payload: data
    }
}
export const getListOrderToSearch = queryString => {
    return {
        type: Types.GET_LIST_ORDER_TO_SEARCH,
        queryString
    }
}
export const getListOrderToSearchSuccess = data => {
    return {
        type: Types.GET_LIST_ORDER_TO_SEARCH_SUCCESS,
        payload: data
    }
}

export const getOrderDetail = id => {
    return {
        type: Types.GET_ORDER_DETAIL,
        id
    }
}
export const getOrderDetailSuccess = data => {
    return {
        type: Types.GET_ORDER_DETAIL_SUCCESS,
        payload: data
    }
}