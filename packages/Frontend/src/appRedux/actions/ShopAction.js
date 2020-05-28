import * as Types from '../../constants/ActionTypes'

//package
export const getListPackage = () => {
    return {
        type: Types.GET_LIST_PACKAGE
    }
}
export const getListPackageSuccess = data => {
    return {
        type: Types.GET_LIST_PACKAGE_SUCCESS,
        payload: data
    }
}
export const buyPackage = (data) => {
    return {
        type: Types.BUY_PACKAGE,
        data
    }
}
export const buyPackageSuccess = data => {
    return {
        type: Types.BUY_PACKAGE_SUCCESS,
        payload: data
    }
}
//combo
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
