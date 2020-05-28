import * as Types from "../../constants/ActionTypes";
const initialValue = {
  carts: [],
  discount: sessionStorage.getItem("PROMOTION")
    ? JSON.parse(sessionStorage.getItem("PROMOTION")).discount
    : 0,
  code: sessionStorage.getItem("PROMOTION")
    ? JSON.parse(sessionStorage.getItem("PROMOTION")).code
    : 0
};
export default (state = initialValue, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.GET_LIST_CART_SUCCESS: {
      return {
        ...state,
        carts: payload
      };
    }
    case Types.CREATE_CART_SUCCESS: {
      const newState = { ...state };
      return {
        ...state,
        carts: [payload, ...newState.carts]
      };
    }
    case Types.UPDATE_CART_SUCCESS: {
      const newState = { ...state },
        indexUpdated = newState.carts.findIndex(
          (cart, index) => cart.id === payload.id
        );
      newState.carts[indexUpdated] = payload;
      return {
        ...state,
        carts: newState.carts
      };
    }
    case Types.DELETE_CART_SUCCESS: {
      const { id } = meta,
        newState = { ...state };
      const newList = newState.carts.filter(cart => cart.id !== id);
      return {
        ...state,
        carts: newList
      };
    }
    case Types.GET_ORDER_PAYMENT_ALEPAY_LATEST_SUCCESS: {
      return {
        ...state,
        orderSuccess: payload
      };
    }
    case Types.CHECK_PROMOTION_SUCCESS: {
      const newState = { ...state };
      let discount = 0;
      if (newState.carts.length > 0) {
        if (payload.type_value === "price") {
          discount = payload.value;
        } else if (payload.type_value === "percent") {
          const sumOrder = newState.carts.reduce(
            (sum, cart) => (sum += cart.price),
            0
          );
          discount = (parseInt(payload.value) * sumOrder) / 100;
        }
      }
      sessionStorage.setItem(
        "PROMOTION",
        JSON.stringify({ discount, code: payload.code })
      );
      return {
        ...state,
        discount,
        code: payload.code
      };
    }
    case Types.DELETE_ALL_CART: {
      return {
        ...state,
        discount: 0,
        code: 0,
        carts: []
      };
    }
    case Types.DELETE_PROMOTION: {
      if (sessionStorage.getItem("PROMOTION"))
        sessionStorage.removeItem("PROMOTION");
      return {
        ...state,
        discount: 0,
        code: 0
      };
    }
    default:
      return { ...state };
  }
};
