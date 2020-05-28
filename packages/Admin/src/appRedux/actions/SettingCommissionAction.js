import * as Types from '../../constants/ActionTypes'

export const getListCommissionPackage = (id) => {
    return {
        type: Types.GET_LIST_COMMISSION_PACKAGE,
        id
    }
}
export const getListCommissionPackageSuccess = data => {
    return {
        type: Types.GET_LIST_COMMISSION_PACKAGE_SUCCESS,
        payload: data
    }
}
export const createCommissionPackage = data => {
    return {
        type: Types.CREATE_COMMISSION_PACKAGE,
        data
    }
}
export const createCommissionPackageSuccess = data => {
    return {
        type: Types.CREATE_COMMISSION_PACKAGE_SUCCESS,
        payload: data
    }
}
export const resetCommissionPackage = () => {
    return {
        type: Types.RESET_COMMISSION_PACKAGE,
    }
}
//combo
export const getListCommissionCombo = (id) => {
    return {
        type: Types.GET_LIST_COMMISSION_COMBO,
        id
    }
}
export const getListCommissionComboSuccess = data => {
    return {
        type: Types.GET_LIST_COMMISSION_COMBO_SUCCESS,
        payload: data
    }
}
export const createCommissionCombo = data => {
    return {
        type: Types.CREATE_COMMISSION_COMBO,
        data
    }
}
export const createCommissionComboSuccess = data => {
    return {
        type: Types.CREATE_COMMISSION_COMBO_SUCCESS,
        payload: data
    }
}
export const resetCommissionCombo = () => {
    return {
        type: Types.RESET_COMMISSION_COMBO,
    }
}
// caculate commission list all
export const getListCommission = () => {
    return {
        type: Types.GET_LIST_COMMISSION
    }
}
export const getListCommissionSuccess = data => {
    return {
        type: Types.GET_LIST_COMMISSION_SUCCESS,
        payload: data
    }
}
export const updateCommission = data => {
    return {
        type: Types.UPDATE_COMMISSION,
        data
    }
}
export const updateCommissionSuccess = data => {
    return {
        type: Types.UPDATE_COMMISSION_SUCCESS,
        payload: data
    }
}
/************************ Level commission******************************* */
export const getListLevelCommission = () => {
    return {
        type: Types.GET_LIST_LEVEL_COMMISSION 
    }
}
export const getListLevelCommissionSuccess = data => {
    return {
        type: Types.GET_LIST_LEVEL_COMMISSION_SUCCESS,
        payload: data
    }
}
export const createLevelCommission = data => {
    return {
        type: Types.CREATE_LEVEL_COMMISSION,
        data
    }
}
export const createLevelCommissionSuccess = data => {
    return {
        type: Types.CREATE_LEVEL_COMMISSION_SUCCESS,
        payload: data
    }
}
export const updateLevelCommission = data => {
    return {
        type: Types.UPDATE_LEVEL_COMMISSION,
        data
    }
}
export const updateLevelCommissionSuccess = data => {
    return {
        type: Types.UPDATE_LEVEL_COMMISSION_SUCCESS,
        payload: data
    }
}
export const deleteLevelCommission = id => {
    return {
        type: Types.DELETE_LEVEL_COMMISSION,
        id
    }
}
export const deleteLevelCommissionSuccess = id => {
    return {
        type: Types.DELETE_LEVEL_COMMISSION_SUCCESS,
        meta: {
            id
        }
    }
}
