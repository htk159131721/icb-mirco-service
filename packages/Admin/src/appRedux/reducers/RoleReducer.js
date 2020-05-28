import * as Types from "../../constants/ActionTypes";

export default (state = { roles: [] }, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_LIST_ROLE_SUCCESS:
      return {
        ...state,
        roles: payload
      };
    case Types.CREATE_ROLE_SUCCESS: {
      // const stateNew = { ...state };
      // stateNew.roles.push(payload);
      return {
        ...state
      };
    }
    case Types.UPDATE_ROLE_SUCCESS: {
      return {
        ...state
      };
    }
    case Types.DELETE_ROLE_SUCCESS:{
      const stateNew = { ...state };
      const index = stateNew.roles.findIndex(obj => obj.id === payload);
      if(index !== -1) stateNew.roles.splice(index, 1);
      return {
        ...state,
        roles: stateNew.roles
      };
    }
    default:
      return { ...state };
  }
};
