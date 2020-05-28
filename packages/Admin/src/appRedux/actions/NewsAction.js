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
export const createNews = data => {
    return {
        type: Types.CREATE_NEWS,
        data
    }
}
export const createNewsSuccess = data => {
    return {
        type: Types.CREATE_NEWS_SUCCESS,
        payload: data
    }
}
export const updateNews = data => {
    return {
        type: Types.UPDATE_NEWS,
        data
    }
}
export const updateNewsSuccess = data => {
    return {
        type: Types.UPDATE_NEWS_SUCCESS,
        payload: data
    }
}
export const deleteNews = id => {
    return {
        type: Types.DELETE_NEWS,
        id
    }
}
export const deleteNewsSuccess = data => {
    return {
        type: Types.DELETE_NEWS_SUCCESS,
        payload: data
    }
}