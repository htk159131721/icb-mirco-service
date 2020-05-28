import * as Types from "../../constants/ActionTypes";

export default (state = {listCombo: []}, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.GET_LIST_COMBO:
      return {
        ...state
      };
    case Types.GET_LIST_COMBO_SUCCESS:
      return {
        ...state,
        listCombo: payload
      };
    case Types.CREATE_COMBO_SUCCESS: {
      const stateNew = { ...state };
      return {
        ...state,
        listCombo: [payload, ...stateNew.listCombo]
      };
    }
    case Types.UPDATE_COMBO_SUCCESS: {
      const stateNew = { ...state },
        index = stateNew.listCombo.findIndex(obj => obj.id === payload.id);
      if (index !== -1) stateNew.listCombo[index] = payload;
      return {
        ...state,
        listCombo: stateNew.listCombo
      };
    }
    case Types.DELETE_COMBO_SUCCESS: {
      const stateNew = { ...state };
      const index = stateNew.listCombo.findIndex(obj => obj.id === payload);
      if (index !== -1) stateNew.listCombo.splice(index, 1);
      return {
        ...state,
        listCombo: stateNew.listCombo
      };
    }
    case Types.UPDATE_POSITION_COMBO_SUCCESS: {
      const stateNew = { ...state };
      const copyCombo = stateNew.listCombo;
      copyCombo[payload.dragIndex].position = payload.indexTarget
      copyCombo[payload.hoverIndex].position = payload.indexCurrent
      copyCombo.sort((a,b) => a.position - b.position)
      return {
        ...state,
        listCombo: copyCombo
      };
    }
    default:
      return { ...state };
  }
};
