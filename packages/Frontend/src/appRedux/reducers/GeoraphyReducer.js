import * as Types from "../../constants/ActionTypes";

const initialState = {
  countries: sessionStorage.getItem("COUNTRIES") ? JSON.parse(sessionStorage.getItem("COUNTRIES")) : [], 
  cities: []
}

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_CITY_SUCCESS:
      return {
        ...state,
        cities: payload
      };
    case Types.GET_COUNTRY_SUCCESS: {
      return {
        ...state,
        countries: payload
      };
    }
    default:
      return { ...state };
  }
};
