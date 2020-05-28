import * as Types from "../../constants/ActionTypes";

export default (state = {packages: [], combos: []}, action) => {
  const { payload } = action;
  switch (action.type) {
    //package
    case Types.GET_LIST_PACKAGE_SUCCESS: {
      return {
        ...state,
        packages: payload
      };
    }
    case Types.BUY_PACKAGE_SUCCESS: {
      return {
        ...state,
        carts: payload
      };
    }
    //combo
    case Types.GET_LIST_COMBO_SUCCESS: {
      return {
        ...state,
        combos: payload
      };
    }
    default:
      return { ...state };
  }
};
