import * as Types from "../../constants/ActionTypes";
const initialState = {
  orders: [],
  ordersPending: [],
  orderDetail: null,
  listService: sessionStorage.getItem("LIST_SERVICE")
    ? JSON.parse(sessionStorage.getItem("LIST_SERVICE"))
    : [],
  cusSelected: null,
  promotion: null
};

export default (state = initialState, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.GET_LIST_ORDER_SUCCESS:
      return {
        ...state,
        orders: payload
      };
    case Types.GET_LIST_ORDER_PENDING_SUCCESS:
      return {
        ...state,
        ordersPending: payload
      };
    case Types.GET_DETAIL_ORDER_SUCCESS:
      return {
        ...state,
        orderDetail: payload,
        listService: payload.detailOrders
      };
    case Types.CREATE_ORDER_SUCCESS: {
      const stateNew = { ...state };
      stateNew.orders.unshift(payload);
      return {
        ...state,
        orders: stateNew.orders
      };
    }
    case Types.UPDATE_ORDER_SUCCESS: {
      return {
        ...state
      };
    }
    case Types.UPDATE_STATUS_ORDER_SUCCESS: {
      const stateNew = { ...state },
        index = stateNew.orders.findIndex(obj => obj.id === payload.id);
      if (index !== -1) stateNew.orders[index].status = payload.status;
      return {
        ...state,
        orders: stateNew.orders
      };
    }
    /**
     * @memberof CreateOrder
     */
    case Types.SAVE_LIST_SERVICE: {
      const stateCopy = { ...state };
      sessionStorage.setItem(
        "LIST_SERVICE",
        JSON.stringify([...stateCopy.listService, payload])
      );
      return {
        ...state,
        listService: [...stateCopy.listService, payload]
      };
    }
    case Types.UPDATE_LIST_SERVICE: {
      const stateCopy = { ...state };
      stateCopy.listService[meta.index] = payload;
      sessionStorage.setItem(
        "LIST_SERVICE",
        JSON.stringify(stateCopy.listService)
      );
      return {
        ...state,
        listService: stateCopy.listService
      };
    }
    case Types.APPLY_CODE_PROMOTION_SUCCESS: {
      const copyState = { ...state };
      let discount = 0;
      if (copyState.listService.length > 0) {
        if (payload.type_value === "price") {
          discount = payload.value;
        } else if (payload.type_value === "percent") {
          const sumOrder = copyState.listService.reduce(
            (sum, cart) => (sum += cart.price),
            0
          );
          discount = (parseInt(payload.value) * sumOrder) / 100;
        }
      }
      return{
        ...state,
        promotion: { discount, code: payload.code }
      }
    }
    case Types.DELETE_SERVICE: {
      const stateCopy = { ...state };
      const stateNew = stateCopy.listService.filter(
        (obj, index) => index !== meta.index
      );
      sessionStorage.setItem("LIST_SERVICE", JSON.stringify(stateNew));
      return {
        ...state,
        listService: stateNew
      };
    }
    case Types.ORDER_GET_INFO_CUS: {
      return{
        ...state,
        cusSelected: payload
      }
    }
    case Types.CLEAR_LIST_SERVICE: {
      sessionStorage.removeItem("LIST_SERVICE");
      return {
        ...state,
        listService: [],
        orderDetail: null,
        promotion: null
      };
    }
    default:
      return { ...state };
  }
};
