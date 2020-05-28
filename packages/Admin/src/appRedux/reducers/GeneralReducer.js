import * as Types from "../../constants/ActionTypes";

const initialState = {
  showModalPackage: false,
  pageSize: 10,
  loaderTotal: false,
  loaderTable: false,
  flagError: false,
  flagSuccess: false,
  loadingBTN: false,
  messAlert: ""
};
export default (state = initialState, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.SHOW_MODAL_ADD:
      return {
        ...state,
        showModalPackage: meta.isShow
      };
      case Types.SHOW_DYNAMIC_MODAL:
        return {
          ...state,
          [meta.nameModal]: meta.isShow
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
    case Types.UPDATE_PAGE_SIZE: {
      return {
        ...state,
        pageSize: payload,
        loaderTable: false
      };
    }
    case Types.LOADING_TABLE: {
      return {
        ...state,
        loaderTable: payload
      };
    }
    default:
      return state;
  }
};
