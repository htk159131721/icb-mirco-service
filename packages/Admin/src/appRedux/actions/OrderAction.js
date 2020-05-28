import * as Types from '../../constants/ActionTypes'

export const getListOrder = () => {
    return {
        type: Types.GET_LIST_ORDER 
    }
}
export const getListOrderSuccess = data => {
    return {
        type: Types.GET_LIST_ORDER_SUCCESS,
        payload: data
    }
}
export const getListOrderPending = () => {
    return {
        type: Types.GET_LIST_ORDER_PENDING 
    }
}
export const getListOrderPendingSuccess = data => {
    return {
        type: Types.GET_LIST_ORDER_PENDING_SUCCESS,
        payload: data
    }
}
export const getDetailOrder = data => {
    return {
        type: Types.GET_DETAIL_ORDER,
        data
    }
}
export const getDetailOrderSuccess = data => {
    return {
        type: Types.GET_DETAIL_ORDER_SUCCESS,
        payload: data
    }
}
export const createOrder = data => {
    return {
        type: Types.CREATE_ORDER,
        data 
    }
}
export const createOrderSuccess = data => {
    return {
        type: Types.CREATE_ORDER_SUCCESS,
        payload: data
    }
}
export const updateOrder = data => {
    return {
        type: Types.UPDATE_ORDER,
        data 
    }
}
export const updateOrderSuccess = data => {
    return {
        type: Types.UPDATE_ORDER_SUCCESS,
        payload: data
    }
}
export const updateStatusOrder = data => {
    return {
        type: Types.UPDATE_STATUS_ORDER,
        data 
    }
}
export const updateStatusOrderSuccess = data => {
    return {
        type: Types.UPDATE_STATUS_ORDER_SUCCESS,
        payload: data
    }
}
/**
 * @memberof createOrder
 * 
 */

 export const applyCodePromotion = data => ({
     type: Types.APPLY_CODE_PROMOTION,
     data
 })
 export const applyCodePromotionSuccess = payload => ({
    type: Types.APPLY_CODE_PROMOTION_SUCCESS,
    payload
})

export const saveListService = data => {
    return {
        type: Types.SAVE_LIST_SERVICE,
        payload: data
    }
}
export const updateListService = (data, index) => {
    return {
        type: Types.UPDATE_LIST_SERVICE,
        payload: data,
        meta: {
            index
        }
    }
}
export const deleteService = index => {
    return {
        type: Types.DELETE_SERVICE,
        meta: {
            index
        }
    }
}

export const getInfoCus = data => ({
    type: Types.ORDER_GET_INFO_CUS,
    payload: data
})

export const clearListService = () => {
    return {
        type: Types.CLEAR_LIST_SERVICE
    }
}