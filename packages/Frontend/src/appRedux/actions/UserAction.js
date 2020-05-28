import * as Types from "constants/ActionTypes";

export const userSignUp = data => {
  return {
    type: Types.SIGNUP_USER,
    data
  };
};
export const userSignIn = user => {
  return {
    type: Types.SIGNIN_USER,
    user
  };
};
export const userSignOut = () => {
  return {
    type: Types.SIGNOUT_USER
  };
};
export const userSignUpSuccess = authUser => {
  return {
    type: Types.SIGNUP_USER_SUCCESS,
    payload: authUser
  };
};

export const userSignInSuccess = authUser => {
  return {
    type: Types.SIGNIN_USER_SUCCESS,
    payload: authUser
  };
};
export const userSignOutSuccess = () => {
  return {
    type: Types.SIGNOUT_USER_SUCCESS
  };
};
export const getForgotPW = data => {
  return {
    type: Types.GET_FORGOT_PW,
    data
  };
};
export const getForgotPWSuccess = data => {
  return {
    type: Types.GET_FORGOT_PW_SUCCESS,
    payload: data
  };
};
export const setNewPassword = data => {
  return {
    type: Types.SET_NEW_PASSWORD,
    data
  };
};
export const setNewPasswordSuccess = data => {
  return {
    type: Types.SET_NEW_PASSWORD_SUCCESS,
    payload: data
  };
};
export const changePassword = data => {
  return {
    type: Types.CHANGE_PASSWORD,
    data
  };
};
export const activeAccount = data => {
  return {
    type: Types.ACTIVE_ACCOUNT,
    data
  };
};
export const activeAccountSuccess = data => {
  return {
    type: Types.ACTIVE_ACCOUNT_SUCCESS,
    payload: data
  };
};

export const getReferal = () => {
  return {
    type: Types.GET_REFERAL
  };
};
export const getReferalSuccess = data => {
  return {
    type: Types.GET_REFERAL_SUCCESS,
    payload: data
  };
};

export const updateProfile = data => {
  return {
    type: Types.UPDATE_PROFILE,
    data
  };
};
export const updateProfileSuccess = data => {
  return {
    type: Types.UPDATE_PROFILE_SUCCESS,
    payload: data
  };
};
export const updateStateUser = data => {
  return {
    type: Types.UPDATE_STATE_USER,
    payload: data
  };
};
/**
 * @memberOf Bank manager
 * @summary CRUD Bank
 */
export const getListBank = () => {
  return {
    type: Types.GET_LIST_BANK_MANAGER
  };
};
export const getListBankSuccess = data => {
  return {
    type: Types.GET_LIST_BANK_MANAGER_SUCCESS,
    payload: data
  };
};
export const createBank = data => {
  return {
    type: Types.CREATE_BANK_MANAGER,
    data
  };
};
export const createBankSuccess = data => {
  return {
    type: Types.CREATE_BANK_MANAGER_SUCCESS,
    payload: data
  };
};
export const updateBank = data => {
  return {
    type: Types.UPDATE_BANK_MANAGER,
    data
  };
};
export const updateBankSuccess = data => {
  return {
    type: Types.UPDATE_BANK_MANAGER_SUCCESS,
    payload: data
  };
};
export const deleteBank = id => {
  return {
    type: Types.DELETE_BANK_MANAGER,
    id
  };
};
export const deleteBankSuccess = data => {
  return {
    type: Types.DELETE_BANK_MANAGER_SUCCESS,
    payload: data
  };
};
