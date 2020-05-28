import * as Types from '../../constants/ActionTypes'

export const getListCustomer = () => {
    return {
        type: Types.GET_LIST_CUSTOMER 
    }
}
export const getListCustomerSuccess = data => {
    return {
        type: Types.GET_LIST_CUSTOMER_SUCCESS,
        payload: data
    }
}
export const getListRef = () => {
    return {
        type: Types.GET_LIST_REF 
    }
}
export const getListRefSuccess = data => {
    return {
        type: Types.GET_LIST_REF_SUCCESS,
        payload: data
    }
}
export const createCustomer = data => {
    return {
        type: Types.CREATE_CUSTOMER,
        data 
    }
}
export const createCustomerSuccess = data => {
    return {
        type: Types.CREATE_CUSTOMER_SUCCESS,
        payload: data
    }
}
export const updateCustomer = data => {
    return {
        type: Types.UPDATE_CUSTOMER,
        data 
    }
}
export const updateCustomerSuccess = data => {
    return {
        type: Types.UPDATE_CUSTOMER_SUCCESS,
        payload: data
    }
}
export const deleteCustomer = id => {
    return {
        type: Types.DELETE_CUSTOMER,
        id 
    }
}
export const deleteCustomerSuccess = data => {
    return {
        type: Types.DELETE_CUSTOMER_SUCCESS,
        payload: data
    }
}
export const updateStatusCustomer = data => {
    return {
        type: Types.UPDATE_STATUS_CUSTOMER,
        data 
    }
}
export const updateStatusCustomerSuccess = data => {
    return {
        type: Types.UPDATE_STATUS_CUSTOMER_SUCCESS,
        payload: data
    }
}