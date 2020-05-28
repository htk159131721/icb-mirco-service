import * as Types from "../../constants/ActionTypes";

export default (state = { catePackages: [] }, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.GET_LIST_CATE_PACKAGE:
      return {
        ...state
      };
    case Types.GET_LIST_CATE_PACKAGE_SUCCESS:
      return {
        ...state,
        catePackages: payload
      };
    case Types.CREATE_CATE_PACKAGE_SUCCESS: {
      const stateNew = { ...state };
      stateNew.catePackages.push(payload);
      return {
        ...state,
        catePackages: stateNew.catePackages
      };
    }
    case Types.UPDATE_CATE_PACKAGE_SUCCESS: {
      const stateNew = { ...state },
          index = stateNew.catePackages.findIndex(obj => obj.id === payload.id);
      if(index !== -1) stateNew.catePackages[index] = payload;
      return {
        ...state,
        catePackages: stateNew.catePackages
      };
    }
    case Types.DELETE_CATE_PACKAGE_SUCCESS:{
      const stateNew = { ...state };
      const index = stateNew.catePackages.findIndex(obj => obj.id === payload);
      if(index !== -1) stateNew.catePackages.splice(index, 1);
      return {
        ...state,
        catePackages: stateNew.catePackages
      };
    }
    default:
      return { ...state };
  }
};
