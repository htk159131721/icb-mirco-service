import * as Types from '../../constants/ActionTypes'

export const getListCart = () => {
    return {
        type: Types.GET_LIST_CART 
    }
}
export const getCartSuccess = data => {
    return {
        type: Types.GET_LIST_CART_SUCCESS,
        payload: data
    }
}
export const createCart = data => {
    return {
        type: Types.CREATE_CART,
        data 
    }
}
export const createCartSuccess = data => {
    return {
        type: Types.CREATE_CART_SUCCESS,
        payload: data
    }
}
export const updateCart = data => {
    return {
        type: Types.UPDATE_CART,
        data 
    }
}
export const updateCartSuccess = data => {
    return {
        type: Types.UPDATE_CART_SUCCESS,
        payload: data
    }
}
export const deleteCart = id => {
    return {
        type: Types.DELETE_CART,
        id 
    }
}
export const deleteCartSuccess = id => {
    return {
        type: Types.DELETE_CART_SUCCESS,
        meta: {
            id
        }
    }
}
export const checkPrommotion = (data) => {
    return {
        type: Types.CHECK_PROMOTION,
        data
    }
}
export const checkPrommotionSuccess = data => {
    return {
        type: Types.CHECK_PROMOTION_SUCCESS,
        payload: data
    }
}
export const deletePromotion = () => {
    return {
        type: Types.DELETE_PROMOTION
    }
}
export const checkout = (data) => {
    return {
        type: Types.CHECK_OUT,
        data
    }
}
export const checkoutSuccess = data => {
    return {
        type: Types.CHECK_OUT_SUCCESS,
        payload: data
    }
}

export const deleteAllCart = () => {
    return {
        type: Types.DELETE_ALL_CART
    }
}

export const getOrderPaymentAlepayLatest = () => {
    return {
        type: Types.GET_ORDER_PAYMENT_ALEPAY_LATEST
    }
}
export const getOrderPaymentAlepayLatestSuccess = data => {
    return {
        type: Types.GET_ORDER_PAYMENT_ALEPAY_LATEST_SUCCESS,
        payload: data
    }
}
export const updateOrderPaymentAlepayLatest = () => {
    return {
        type: Types.UPDATE_VIEW_PAYMENT_ALEPAY
    }
}
export const updateOrderPaymentAlepayLatestSuccess = data => {
    return {
        type: Types.UPDATE_VIEW_PAYMENT_ALEPAY_SUCCESS,
        payload: data
    }
}