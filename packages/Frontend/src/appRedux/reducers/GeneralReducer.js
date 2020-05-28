import * as Types from "../../constants/ActionTypes";

const initialState = {
  showModalPackage: false,
  loaderTotal: false,
  flagError: false,
  flagSuccess: false,
  loadingBTN: false,
  messAlert: "",
  notification: false
};
export default (state = initialState, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.SHOW_MODAL_ADD:
      return {
        ...state,
        showModalPackage: meta.isShow
      };
    case Types.SHOW_MODAL_DYNAMIC:
      return {
        ...state,
        [`${meta.nameModal}`]: meta.isShow
      };
    case Types.SHOW_NOTIFICATION_DYNAMIC:
      return {
        ...state,
        [`${meta.name}`]: meta.isShow
      };
    case Types.SHOW_NOTIFICATION:
      return {
        ...state,
        notification: meta.isShow
      };
    case Types.ON_SHOW_LOADER_GENER:
      return {
        ...state,
        loaderTotal: true
      };
    case Types.ON_HIDE_LOADER_GENER: {
      return {
        ...state,
        loaderTotal: false
      };
    }
    case Types.HIDE_LOADING_BTN:
      return {
        ...state,
        loadingBTN: false
      };
    case Types.SHOW_LOADING_BTN: {
      return {
        ...state,
        loadingBTN: true
      };
    }
    case Types.SHOW_MESS_ERROR: {
      return {
        ...state,
        flagError: true,
        messAlert: payload
      };
    }
    case Types.HIDE_MESS_ERROR: {
      return {
        ...state,
        flagError: false,
        messAlert: ""
      };
    }
    case Types.SHOW_MESS_SUCCESS: {
      return {
        ...state,
        flagSuccess: true,
        messAlert: payload
      };
    }
    case Types.HIDE_MESS_SUCCESS: {
      return {
        ...state,
        flagSuccess: false,
        messAlert: ""
      };
    }
    default:
      return state;
  }
};
