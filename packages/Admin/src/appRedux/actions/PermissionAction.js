import * as Types from '../../constants/ActionTypes'

export const getDataGroupPermission = () => {
    return {
        type: Types.GET_GROUP_PERMISSION 
    }
}
export const getDataGroupPermissionSuccess = data => {
    return {
        type: Types.GET_GROUP_PERMISSION_SUCCESS,
        payload: data
    }
}
export const getDataListPermission = () => {
    return {
        type: Types.GET_LIST_PERMISSION 
    }
}
export const getDataListPermissionSuccess = data => {
    return {
        type: Types.GET_LIST_PERMISSION_SUCCESS,
        payload: data
    }
}
export const getDataPermissionByGroup = groupId => {
    return {
        type: Types.GET_PERMISSION_BY_GROUP,
        groupId
    }
}
export const getDataPermissionByGroupSuccess = data => {
    return {
        type: Types.GET_PERMISSION_BY_GROUP_SUCCESS,
        payload: data
    }
}