import * as Types from "../../constants/ActionTypes";

export default (state = {listAgencies: []}, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.GET_LIST_AGENCY_SUCCESS:
      return { 
        ...state,
        listAgencies: payload
      };
      case Types.CREATE_AGENCY_SUCCESS: {
        const stateNew = { ...state };
        stateNew.listAgencies.unshift(payload);
        return {
          ...state,
          listAgencies: stateNew.listAgencies
        };
      }
      case Types.UPDATE_AGENCY_SUCCESS: {
        const stateNew = { ...state },
            index = stateNew.listAgencies.findIndex(obj => obj.id === payload.id);
        if(index !== -1) {
          stateNew.listAgencies[index] = payload
        };
        return {
          ...state,
          listAgencies: stateNew.listAgencies
        };
      }
      case Types.DELETE_AGENCY_SUCCESS:{
        const stateNew = { ...state };
        const index = stateNew.listAgencies.findIndex(obj => obj.id === payload);
        if(index !== -1) stateNew.listAgencies.splice(index, 1);
        return {
          ...state,
          listAgencies: stateNew.listAgencies
        };
      }
    default:
      return { ...state };
  }
};
