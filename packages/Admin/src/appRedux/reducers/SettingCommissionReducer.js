import * as Types from "../../constants/ActionTypes";

export default (state = {cmsPackages: [], cmsCombos: []}, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_LIST_COMMISSION_PACKAGE_SUCCESS:
      return {
        ...state,
        cmsPackages: payload
      };
    case Types.CREATE_COMMISSION_PACKAGE_SUCCESS: {
      return {
        ...state,
        cmsPackages: payload
      };
    }
    case Types.GET_LIST_COMMISSION_COMBO_SUCCESS:
      return {
        ...state,
        cmsCombos: payload
      };
    case Types.CREATE_COMMISSION_COMBO_SUCCESS: {
      return {
        ...state,
        cmsCombos: payload
      };
    }
    case Types.RESET_COMMISSION_PACKAGE: {
      return {
        ...state,
        cmsPackages: []
      };
    }
    case Types.RESET_COMMISSION_COMBO: {
      return {
        ...state,
        cmsCombos: []
      };
    }
    default:
      return { ...state };
  }
};
