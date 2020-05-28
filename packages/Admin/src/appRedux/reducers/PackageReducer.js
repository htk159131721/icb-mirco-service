import * as Types from "../../constants/ActionTypes";
import update from 'immutability-helper';

export default (state = {packages: []}, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_LIST_PACKAGE:
      return {
        ...state
      };
    case Types.GET_LIST_PACKAGE_SUCCESS:
      return {
        ...state,
        packages: payload
      };
    case Types.CREATE_PACKAGE_SUCCESS: {
      const stateNew = { ...state };
      return {
        ...state,
        packages: [payload, ...stateNew.packages]
      };
    }
    case Types.UPDATE_PACKAGE_SUCCESS: {
      const stateNew = { ...state },
        index = stateNew.packages.findIndex(obj => obj.id === payload.id);
      if (index !== -1) stateNew.packages[index] = payload;
      return {
        ...state,
        packages: stateNew.packages
      };
    }
    case Types.DELETE_PACKAGE_SUCCESS: {
      const stateNew = { ...state };
      const index = stateNew.packages.findIndex(obj => obj.id === payload);
      if (index !== -1) stateNew.packages.splice(index, 1);
      return {
        ...state,
        packages: stateNew.packages
      };
    }
    case Types.UPDATE_POSITION_PACKAGE_SUCCESS: {
      const stateNew = { ...state };
      const copyPackage = stateNew.packages;
      copyPackage[payload.dragIndex].position = payload.indexTarget
      copyPackage[payload.hoverIndex].position = payload.indexCurrent
      copyPackage.sort((a,b) => a.position - b.position)
      return {
        ...state,
        packages: copyPackage
      };
    }
    default:
      return { ...state };
  }
};
