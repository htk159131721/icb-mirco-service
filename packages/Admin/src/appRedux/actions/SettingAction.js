import * as Types from '../../constants/ActionTypes'

export const getListSystem = () => {
    return {
        type: Types.GET_LIST_SYSTEM 
    }
}
export const getListSystemSuccess = data => {
    return {
        type: Types.GET_LIST_SYSTEM_SUCCESS,
        payload: data
    }
}

export const updateSystem = (data) => {
    return {
        type: Types.UPDATE_SYSTEM,
        data
    }
}
export const updateSystemSuccess = data => {
    return {
        type: Types.UPDATE_SYSTEM_SUCCESS,
        payload: data
    }
}
