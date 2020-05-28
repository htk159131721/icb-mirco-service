import * as Types from '../../constants/ActionTypes'

export const getListCatePackage = () => {
    return {
        type: Types.GET_LIST_CATE_PACKAGE 
    }
}
export const getListCatePackageSuccess = data => {
    return {
        type: Types.GET_LIST_CATE_PACKAGE_SUCCESS,
        payload: data
    }
}
export const createCatePackage = data => {
    return {
        type: Types.CREATE_CATE_PACKAGE,
        data 
    }
}
export const createCatePackageSuccess = data => {
    return {
        type: Types.CREATE_CATE_PACKAGE_SUCCESS,
        payload: data
    }
}
export const updateCatePackage = data => {
    return {
        type: Types.UPDATE_CATE_PACKAGE,
        data 
    }
}
export const updateCatePackageSuccess = data => {
    return {
        type: Types.UPDATE_CATE_PACKAGE_SUCCESS,
        payload: data
    }
}
export const deleteCatePackage = id => {
    return {
        type: Types.DELETE_CATE_PACKAGE,
        id 
    }
}
export const deleteCatePackageSuccess = data => {
    return {
        type: Types.DELETE_CATE_PACKAGE_SUCCESS,
        payload: data
    }
}