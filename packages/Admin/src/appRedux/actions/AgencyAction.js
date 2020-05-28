import * as Types from '../../constants/ActionTypes'

export const getListAgency = () => {
    return {
        type: Types.GET_LIST_AGENCY
    }
}
export const getListAgencySuccess = (users) => {
    return {
        type: Types.GET_LIST_AGENCY_SUCCESS,
        payload: users
    }
}

// CRUD Agency
export const createAgency = data => {
    return {
        type: Types.CREATE_AGENCY,
        data
    }
}
export const createAgencySuccess = (data) => {
    return {
        type: Types.CREATE_AGENCY_SUCCESS,
        payload: data
    }
}
export const updateAgency = data => {
    return {
        type: Types.UPDATE_AGENCY,
        data
    }
}
export const updateAgencySuccess = (data) => {
    return {
        type: Types.UPDATE_AGENCY_SUCCESS,
        payload: data
    }
}
export const deleteAgency = id => {
    return {
        type: Types.DELETE_AGENCY,
        id
    }
}
export const deleteAgencySuccess = data => {
    return {
        type: Types.DELETE_AGENCY_SUCCESS,
        payload: data
    }
}
