import {all, put, takeEvery, fork, call, takeLatest, take} from 'redux-saga/effects'
import * as Types from '../../constants/ActionTypes'
import * as Georaphy from '../actions/GeoraphyAction'
import {showMessError, showLoader, hideLoader} from '../actions/GeneralAction'
import {ERROR} from '../../util/messages'
import {API} from './ApiGeoraphy'

function* getListCoutries () {
    yield put(showLoader())
    try {
        const request = yield call(API.getListCountriesFromApi);
        sessionStorage.setItem('COUNTRIES', JSON.stringify(request.data.data));
        yield put(Georaphy.getDataCountriesSuccess(request.data.data));
        yield put(hideLoader())
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* getListCities ({cityName}) {
    try {
        const request = yield call(API.getListCitiesFromApi, cityName);
        yield put(Georaphy.getDataCitiesSuccess(request.data.data));
    } catch (error) {
        yield put(showMessError(error))
    }
}

export function* watchGetListCountries () {
    yield takeLatest(Types.GET_COUNTRY, getListCoutries)
}
export function* watchGetListCities () {
    yield takeEvery(Types.GET_CITY, getListCities)
}

export default function* root () {
    yield all ([
        watchGetListCountries(),
        watchGetListCities()
    ])
}