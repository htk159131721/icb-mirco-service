import * as Types from "../../constants/ActionTypes";

export default (state = {listCurrencies: []}, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.GET_LIST_CURRENCY_SUCCESS:
      return { 
        ...state,
        listCurrencies: payload
      };
      case Types.CREATE_CURRENCY_SUCCESS: {
        const stateNew = { ...state };
        return {
          ...state,
          listCurrencies: [payload, ...stateNew.listCurrencies]
        };
      }
      case Types.UPDATE_CURRENCY_SUCCESS: {
        const stateNew = { ...state },
            index = stateNew.listCurrencies.findIndex(obj => obj.id === payload.id);
        if(index !== -1) {
          stateNew.listCurrencies[index] = payload
        };
        return {
          ...state,
          listCurrencies: stateNew.listCurrencies
        };
      }
      case Types.DELETE_CURRENCY_SUCCESS:{
        const stateNew = { ...state };
        return {
          ...state,
          listCurrencies: stateNew.listCurrencies.filter((obj) => obj.id !== meta.id)
        };
      }
    default:
      return { ...state };
  }
};
