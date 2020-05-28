import * as Types from '../../constants/ActionTypes'

export const getListRole = () => {
    return {
        type: Types.GET_LIST_ROLE 
    }
}
export const getListRoleSuccess = data => {
    return {
        type: Types.GET_LIST_ROLE_SUCCESS,
        payload: data
    }
}
export const createRole = data => {
    return {
        type: Types.CREATE_ROLE,
        data 
    }
}
export const createRoleSuccess = data => {
    return {
        type: Types.CREATE_ROLE_SUCCESS,
        payload: data
    }
}
export const updateRole = data => {
    return {
        type: Types.UPDATE_ROLE,
        data 
    }
}
export const updateRoleSuccess = data => {
    return {
        type: Types.UPDATE_ROLE_SUCCESS,
        payload: data
    }
}
export const deleteRole = id => {
    return {
        type: Types.DELETE_ROLE,
        id 
    }
}
export const deleteRoleSuccess = data => {
    return {
        type: Types.DELETE_ROLE_SUCCESS,
        payload: data
    }
}