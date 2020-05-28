import * as Types from "../../constants/ActionTypes";
const initialState = { listCommissions: [], listLevel: [] };
export default (state = initialState, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.GET_LIST_COMMISSION_SUCCESS:
      return {
        ...state,
        listCommissions: payload
      };
    case Types.UPDATE_COMMISSION_SUCCESS: {
      const stateNew = { ...state },
        index = stateNew.listCommissions.findIndex(
          obj => obj.id === payload.id
        );
      if (index !== -1) stateNew.listCommissions[index].status = 1;
      return {
        ...state,
        listCommissions: stateNew.listCommissions
      };
    }
    /**
     * @summary CRUD Level commission
     */
    case Types.GET_LIST_LEVEL_COMMISSION_SUCCESS:
      return {
        ...state,
        listLevel: payload
      };
    case Types.CREATE_LEVEL_COMMISSION_SUCCESS: {
      const stateNew = { ...state };
      return {
        ...state,
        listLevel: [...stateNew.listLevel, payload]
      };
    }
    case Types.UPDATE_LEVEL_COMMISSION_SUCCESS: {
      const stateNew = { ...state },
        index = stateNew.listLevel.findIndex(obj => obj.id === payload.id);
      if (index !== -1) stateNew.listLevel[index] = payload;
      return {
        ...state,
        listLevel: stateNew.listLevel
      };
    }
    case Types.DELETE_LEVEL_COMMISSION_SUCCESS: {
      const stateCopy = { ...state },
      stateNew = stateCopy.listLevel.filter(obj => obj.id !== meta.id);
      return {
        ...state,
        listLevel: stateNew
      };
    }
    default:
      return { ...state };
  }
};
