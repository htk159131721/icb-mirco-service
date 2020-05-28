import * as Types from "../../constants/ActionTypes";

export default (state = { listReceipt: [] }, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.GET_LIST_RECEIPT_SUCCESS:
      return {
        ...state,
        listReceipt: payload
      };
    case Types.CREATE_RECEIPT_SUCCESS: {
      const stateNew = { ...state };
      return {
        ...state,
        listReceipt: [payload, ...stateNew.listReceipt]
      };
    }
    case Types.DELETE_RECEIPT_SUCCESS: {
      const stateCopy = { ...state },
        stateNew = stateCopy.listReceipt.filter(obj => obj.id !== meta.id);
      return {
        ...state,
        listReceipt: stateNew
      };
    }
    default:
      return { ...state };
  }
};
