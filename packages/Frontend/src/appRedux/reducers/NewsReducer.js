import * as Types from "../../constants/ActionTypes";
const initialState = {
  listNews: []
}
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case Types.GET_LIST_NEWS_SUCCESS: {
      return {
        ...state,
        listNews: payload
      };
    }
    case Types.GET_NEWS_DETAIL_SUCCESS: {
      return {
        ...state,
        newsDetail: payload
      };
    }
    default:
      return { ...state };
  }
};
