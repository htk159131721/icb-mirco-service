import * as Types from "../../constants/ActionTypes";

export default (state = {listUsers: []}, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.GET_LIST_USER_SUCCESS:
      return { 
        ...state,
        listUsers: payload
      };
      
      case Types.CREATE_USER_SUCCESS: {
        const stateNew = { ...state };
        payload.role_id =  parseInt(meta.roleId);
        stateNew.listUsers.unshift(payload);
        return {
          ...state,
          listUsers: stateNew.listUsers
        };
      }
      case Types.UPDATE_USER_SUCCESS: {
        const stateNew = { ...state },
            index = stateNew.listUsers.findIndex(obj => obj.id === payload.id);
        if(index !== -1) {
          payload.role_id = parseInt(meta.roleId);
          stateNew.listUsers[index] = payload
        };
        return {
          ...state,
          listUsers: stateNew.listUsers
        };
      }
      case Types.DELETE_USER_SUCCESS:{
        const stateNew = { ...state };
        const index = stateNew.listUsers.findIndex(obj => obj.id === payload);
        if(index !== -1) stateNew.listUsers.splice(index, 1);
        return {
          ...state,
          listUsers: stateNew.listUsers
        };
      }
    default:
      return { ...state };
  }
};
