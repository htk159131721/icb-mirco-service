import * as Types from "../../constants/ActionTypes";
const initialState = {
  listWithdraw: [],
  listCMS: [],
  listSaver: []
};
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_LIST_WITHDRAW_SUCCESS: {
      return {
        ...state,
        listWithdraw: payload
      };
    }
    case Types.GET_WITHDRAW_SAVER_SUCCESS: {
      return {
        ...state,
        listSaver: payload
      };
    }
    case Types.GET_LIST_COMMISSION_SUCCESS: {
      return {
        ...state,
        listCMS: payload
      };
    }
    case Types.GET_COMMISSION_SAVER_SUCCESS: {
      return {
        ...state,
        listSaver: payload
      };
    }
   
    default:
      return { ...state };
  }
};
