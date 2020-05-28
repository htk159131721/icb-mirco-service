import * as Types from "constants/ActionTypes";
const initialState = {
  authUser: sessionStorage.getItem("USER_INF")
    ? JSON.parse(sessionStorage.getItem("USER_INF"))
    : null,
  banks: [],
  listRef: []
};
export default function UserReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case Types.SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        authUser: payload
      };
    }
    case Types.SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        banks: []
      };
    }
    case Types.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
       authUser: payload
      };
    }
    case Types.UPDATE_STATE_USER: {
      return {
        ...state,
       authUser: payload
      };
    }
    case Types.GET_REFERAL_SUCCESS: {
      let arrayNew = [];
      payload.map((ref, index) => {
        arrayNew.push({
          id: ref.id,
          key: ref.username,
          parent: parseInt(ref.sponsor_id),
          label: ref.username,
          level: ref.level
        })
      })
      return {
        ...state,
        listRef: arrayNew
      };
    }
    /**
     * @memberOf Bank manager
     * @summary CRUD bank
     */
    case Types.GET_LIST_BANK_MANAGER_SUCCESS:
      return {
        ...state,
        banks: payload
      };
    case Types.CREATE_BANK_MANAGER_SUCCESS: {
      const stateNew = { ...state };
      return {
        ...state,
        banks: [payload, ...stateNew.banks]
      };
    }
    case Types.UPDATE_BANK_MANAGER_SUCCESS: {
      const stateNew = { ...state },
        index = stateNew.banks.findIndex(obj => obj.id === payload.id);
      if (index !== -1) stateNew.banks[index] = payload;
      return {
        ...state,
        banks: stateNew.banks
      };
    }
    case Types.DELETE_BANK_MANAGER_SUCCESS: {
      const stateNew = { ...state };
      const index = stateNew.banks.findIndex(obj => obj.id === payload);
      if (index !== -1) stateNew.banks.splice(index, 1);
      return {
        ...state,
        banks: stateNew.banks
      };
    }
    default:
      return { ...state };
  }
}
