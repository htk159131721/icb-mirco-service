import * as Types from "../../constants/ActionTypes";

export default (state = {promotions: []}, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_LIST_PROMOTION_SUCCESS:
      return {
        ...state,
        promotions: payload
      };
    case Types.CREATE_PROMOTION_SUCCESS: {
      const stateNew = { ...state };
      return {
        ...state,
        promotions: [payload, ...stateNew.promotions]
      };
    }
    case Types.UPDATE_PROMOTION_SUCCESS: {
      const stateNew = { ...state },
        index = stateNew.promotions.findIndex(obj => obj.id === payload.id);
      if (index !== -1) stateNew.promotions[index] = payload;
      return {
        ...state,
        promotions: stateNew.promotions
      };
    }
    case Types.DELETE_PROMOTION_SUCCESS: {
      const stateNew = { ...state };
      const index = stateNew.promotions.findIndex(obj => obj.id === payload);
      if (index !== -1) stateNew.promotions.splice(index, 1);
      return {
        ...state,
        promotions: stateNew.promotions
      };
    }
    default:
      return { ...state };
  }
};
