import * as Types from "../../constants/ActionTypes";

export default (state = {listNews: []}, action) => {
  const { payload, meta } = action;
  switch (action.type) {
    case Types.GET_LIST_NEWS_SUCCESS:
      return {
        ...state,
        listNews: payload
      };
    case Types.CREATE_NEWS_SUCCESS: {
      const stateNew = { ...state };
      return {
        ...state,
        listNews: [payload, ...stateNew.listNews]
      };
    }
    case Types.UPDATE_NEWS_SUCCESS: {
      const stateNew = { ...state },
        index = stateNew.listNews.findIndex(obj => obj.id === payload.id);
      if (index !== -1) stateNew.listNews[index] = payload;
      return {
        ...state,
        listNews: stateNew.listNews
      };
    }
    case Types.DELETE_NEWS_SUCCESS: {
      const stateNew = { ...state };
      const index = stateNew.listNews.findIndex(obj => obj.id === payload);
      if (index !== -1) stateNew.listNews.splice(index, 1);
      return {
        ...state,
        listNews: stateNew.listNews
      };
    }
    default:
      return { ...state };
  }
};
