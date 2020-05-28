import * as Types from '../../constants/ActionTypes'

export const getListCurrency = () => {
    return {
        type: Types.GET_LIST_CURRENCY
    }
}
export const getListCurrencySuccess = (currency) => {
    return {
        type: Types.GET_LIST_CURRENCY_SUCCESS,
        payload: currency
    }
}

// CRUD Currency
export const createCurrency = data => {
    return {
        type: Types.CREATE_CURRENCY,
        data
    }
}
export const createCurrencySuccess = (data) => {
    return {
        type: Types.CREATE_CURRENCY_SUCCESS,
        payload: data
    }
}
export const updateCurrency = data => {
    return {
        type: Types.UPDATE_CURRENCY,
        data
    }
}
export const updateCurrencySuccess = (data) => {
    return {
        type: Types.UPDATE_CURRENCY_SUCCESS,
        payload: data
    }
}
export const deleteCurrency = id => {
    return {
        type: Types.DELETE_CURRENCY,
        id
    }
}
export const deleteCurrencySuccess = id => {
    return {
        type: Types.DELETE_CURRENCY_SUCCESS,
        meta: {
            id
        }
    }
}
