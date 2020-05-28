import * as Types from '../../constants/ActionTypes'

export const getListPromotion = () => {
    return {
        type: Types.GET_LIST_PROMOTION 
    }
}
export const getListPromotionSuccess = data => {
    return {
        type: Types.GET_LIST_PROMOTION_SUCCESS,
        payload: data
    }
}
export const createPromotion = data => {
    return {
        type: Types.CREATE_PROMOTION,
        data
    }
}
export const createPromotionSuccess = data => {
    return {
        type: Types.CREATE_PROMOTION_SUCCESS,
        payload: data
    }
}
export const updatePromotion = data => {
    return {
        type: Types.UPDATE_PROMOTION,
        data
    }
}
export const updatePromotionSuccess = data => {
    return {
        type: Types.UPDATE_PROMOTION_SUCCESS,
        payload: data
    }
}
export const deletePromotion = id => {
    return {
        type: Types.DELETE_PROMOTION,
        id
    }
}
export const deletePromotionSuccess = data => {
    return {
        type: Types.DELETE_PROMOTION_SUCCESS,
        payload: data
    }
}