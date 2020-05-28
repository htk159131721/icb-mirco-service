import * as Types from "../../constants/ActionTypes";

export default (state = { customers: [], listRef: [] }, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_LIST_CUSTOMER_SUCCESS: {
      return {
        ...state,
        customers: payload
      };
    }
    case Types.GET_LIST_REF_SUCCESS: {
      let arrayNew = [];
      payload.map((ref, index) => {
        arrayNew.push({
          id: ref.id,
          key: ref.username,
          parent: parseInt(ref.sponsor_id),
          label: ref.username
        })
      })
      return {
        ...state,
        listRef: arrayNew
      };
    }
    case Types.CREATE_CUSTOMER_SUCCESS: {
      const stateNew = { ...state };
      stateNew.customers.unshift(payload);
      return {
        ...state,
        customers: stateNew.customers
      };
    }
    case Types.UPDATE_CUSTOMER_SUCCESS: {
      const stateNew = { ...state },
        index = stateNew.customers.findIndex(obj => obj.id === payload.id);
      if (index !== -1) stateNew.customers[index] = payload;
      return {
        ...state,
        customers: stateNew.customers
      };
    }
    case Types.UPDATE_STATUS_CUSTOMER_SUCCESS: {
      const stateNew = { ...state },
        index = stateNew.customers.findIndex(obj => obj.id === payload.id);
      if (index !== -1) stateNew.customers[index]['is_active'] = payload.is_active;
      return {
        ...state,
        customers: stateNew.customers
      };
    }
    case Types.DELETE_CUSTOMER_SUCCESS: {
      const stateNew = { ...state };
      const index = stateNew.customers.findIndex(obj => obj.id === payload);
      if (index !== -1) stateNew.customers.splice(index, 1);
      return {
        ...state,
        customers: stateNew.customers
      };
    }
    default:
      return { ...state };
  }
};
