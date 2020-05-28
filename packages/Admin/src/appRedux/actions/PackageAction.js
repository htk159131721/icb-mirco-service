import * as Types from '../../constants/ActionTypes'

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
export const createPackage = data => {
    return {
        type: Types.CREATE_PACKAGE,
        data
    }
}
export const createPackageSuccess = data => {
    return {
        type: Types.CREATE_PACKAGE_SUCCESS,
        payload: data
    }
}
export const updatePackage = data => {
    return {
        type: Types.UPDATE_PACKAGE,
        data
    }
}
export const updatePackageSuccess = data => {
    return {
        type: Types.UPDATE_PACKAGE_SUCCESS,
        payload: data
    }
}
export const deletePackage = id => {
    return {
        type: Types.DELETE_PACKAGE,
        id
    }
}
export const deletePackageSuccess = data => {
    return {
        type: Types.DELETE_PACKAGE_SUCCESS,
        payload: data
    }
}

export const updatePositionPackage = data => {
    return {
        type: Types.UPDATE_POSITION_PACKAGE,
        data
    }
}
export const updatePositionPackageSuccess = data => {
    return {
        type: Types.UPDATE_POSITION_PACKAGE_SUCCESS,
        payload: data
    }
}