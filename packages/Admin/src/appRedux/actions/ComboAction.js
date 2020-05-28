import * as Types from '../../constants/ActionTypes'

export const getListCombo = () => {
    return {
        type: Types.GET_LIST_COMBO 
    }
}
export const getListComboSuccess = data => {
    return {
        type: Types.GET_LIST_COMBO_SUCCESS,
        payload: data
    }
}
export const createCombo = data => {
    return {
        type: Types.CREATE_COMBO,
        data
    }
}
export const createComboSuccess = data => {
    return {
        type: Types.CREATE_COMBO_SUCCESS,
        payload: data
    }
}
export const updateCombo = data => {
    return {
        type: Types.UPDATE_COMBO,
        data
    }
}
export const updateComboSuccess = data => {
    return {
        type: Types.UPDATE_COMBO_SUCCESS,
        payload: data
    }
}
export const deleteCombo = id => {
    return {
        type: Types.DELETE_COMBO,
        id
    }
}
export const deleteComboSuccess = data => {
    return {
        type: Types.DELETE_COMBO_SUCCESS,
        payload: data
    }
}
export const updatePositionCombo = data => {
    return {
        type: Types.UPDATE_POSITION_COMBO,
        data
    }
}
export const updatePositionComboSuccess = data => {
    return {
        type: Types.UPDATE_POSITION_COMBO_SUCCESS,
        payload: data
    }
}