import * as Types from '../../constants/ActionTypes'

export const getListNews = () => {
    return {
        type: Types.GET_LIST_NEWS 
    }
}
export const getListNewsSuccess = data => {
    return {
        type: Types.GET_LIST_NEWS_SUCCESS,
        payload: data
    }
}
export const getNewsDetail = id => {
    return {
        type: Types.GET_NEWS_DETAIL,
        id
    }
}
export const getNewsDetailSuccess = data => {
    return {
        type: Types.GET_NEWS_DETAIL_SUCCESS,
        payload: data
    }
}
