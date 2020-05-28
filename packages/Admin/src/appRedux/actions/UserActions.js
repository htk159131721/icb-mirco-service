import * as Types from '../../constants/ActionTypes'

export const getListUser = () => {
    return {
        type: Types.GET_LIST_USER
    }
}
export const getListUserSuccess = (users) => {
    return {
        type: Types.GET_LIST_USER_SUCCESS,
        payload: users
    }
}
export const getListUserErr = (error) => {
    return {
        type: Types.GET_LIST_USER_ERROR,
        error
    }
}
export const getProfile = () => {
    return {
        type: Types.GET_PROFILE
    }
}
export const getProfileSuccess = data => {
    return {
        type: Types.GET_PROFILE_SUCCESS,
        payload: data
    }
}
// CRUD User
export const createUser = data => {
    return {
        type: Types.CREATE_USER,
        data
    }
}
export const createUserSuccess = (data, roleId) => {
    return {
        type: Types.CREATE_USER_SUCCESS,
        payload: data,
        meta: {
            roleId
        }
    }
}
export const updateUser = data => {
    return {
        type: Types.UPDATE_USER,
        data
    }
}
export const updateUserSuccess = (data, roleId) => {
    return {
        type: Types.UPDATE_USER_SUCCESS,
        payload: data,
        meta: {
            roleId
        }
    }
}
export const deleteUser = id => {
    return {
        type: Types.DELETE_USER,
        id
    }
}
export const deleteUserSuccess = data => {
    return {
        type: Types.DELETE_USER_SUCCESS,
        payload: data
    }
}
