import * as Types from "constants/ActionTypes";

export const showModalPackage = (boolean) => {
  return {
    type: Types.SHOW_MODAL_ADD,
    meta: {
      isShow: boolean
    }
  };
};
export const showDynamicModal = (nameModal, boolean) => {
  return {
    type: Types.SHOW_DYNAMIC_MODAL,
    meta: {
      isShow: boolean,
      nameModal
    }
  };
};
export const showLoader = () => {
  return {
    type: Types.ON_SHOW_LOADER_GENER
  };
};
export const hideLoader = () => {
  return {
    type: Types.ON_HIDE_LOADER_GENER
  };
};
export const hideMessage = () => {
  return {
    type: Types.HIDE_MESSAGE
  };
};

export const showMessError = (mess) => {
  return {
    type: Types.SHOW_MESS_ERROR,
    payload: mess
  };
};
export const hideMessError = (mess) => {
  return {
    type: Types.HIDE_MESS_ERROR,
    payload: mess
  };
};
export const showMessSuccess = (mess) => {
  return {
    type: Types.SHOW_MESS_SUCCESS,
    payload: mess
  };
};
export const hideMessSuccess = (mess) => {
  return {
    type: Types.HIDE_MESS_SUCCESS,
    payload: mess
  };
};
export const showLoadingBtn = () => {
  return {
    type: Types.SHOW_LOADING_BTN,
  };
};
export const hideLoadingBtn = () => {
  return {
    type: Types.HIDE_LOADING_BTN
  };
};
export const updatePageSize = (pageSize) => {
  return {
    type: Types.UPDATE_PAGE_SIZE,
    payload: pageSize
  };
};
export const loadingTable = (boolean) => {
  return {
    type: Types.LOADING_TABLE,
    payload: boolean
  };
};
