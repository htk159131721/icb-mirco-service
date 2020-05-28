import * as Types from "../../constants/ActionTypes";
const initialState = {
  orderDetail: [],
  orders: [],
  ordersToSearch: []
};
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_LIST_ORDER_SUCCESS: {
      return {
        ...state,
        orders: payload
      };
    }
    case Types.GET_ORDER_DETAIL_SUCCESS: {
      return {
        ...state,
        orderDetail: payload
      };
    }
    case Types.GET_LIST_ORDER_TO_SEARCH_SUCCESS: {
      return {
        ...state,
        ordersToSearch: payload
      };
    }
    default:
      return { ...state };
  }
};
