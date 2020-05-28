import * as Types from "../../constants/ActionTypes";

export default (state = {systems: []}, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_LIST_SYSTEM_SUCCESS:
      return {
        ...state,
        systems: payload
      };
    case Types.UPDATE_SYSTEM_SUCCESS: {
      return {
        ...state,
        systems: payload
      };
    }
    default:
      return { ...state };
  }
};
