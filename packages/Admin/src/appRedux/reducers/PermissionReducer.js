import * as Types from "../../constants/ActionTypes";

const initialState = {
  groupPermission: [],
  listPermission: [],
  listPermissionTemp: []
}

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_GROUP_PERMISSION_SUCCESS:
      return {
        ...state,
        groupPermission: payload
      };
    // case Types.GET_PERMISSION_BY_GROUP_SUCCESS: {
    //   const newState = {...state}
    //   newState.listPermission.push(payload)
    //   return {
    //     ...state,
    //     listPermission: newState.listPermission
    //   };
    // }
    case Types.GET_LIST_PERMISSION_SUCCESS: {
      return {
        ...state,
        listPermission: payload
      };
    }
    default:
      return { ...state };
  }
};
