import * as Types from '../../constants/ActionTypes'

export const getDataCountries = () => {
    return {
        type: Types.GET_COUNTRY 
    }
}
export const getDataCountriesSuccess = data => {
    return {
        type: Types.GET_COUNTRY_SUCCESS,
        payload: data
    }
}
export const getDataCities = cityName => {
    return {
        type: Types.GET_CITY,
        cityName
    }
}
export const getDataCitiesSuccess = data => {
    return {
        type: Types.GET_CITY_SUCCESS,
        payload: data
    }
}