
import {all, put, takeEvery, fork, call, takeLatest, delay} from 'redux-saga/effects'
import * as Types from '../../constants/ActionTypes'
import * as SystemAction from '../actions/SettingAction'
import {showMessError, showMessSuccess, showLoader, hideLoader, showLoadingBtn, hideLoadingBtn} from '../actions/GeneralAction'
import {SUCCESSFULLY, ERROR} from '../../util/messages'
import {getCookie} from '../../helpers/cookie'
import {API} from './ApiSetting'

function* getListSystem () {
    yield put(showLoader())
    try {
        const request = yield call(API.getListSystemFromApi, getCookie('token'));
        yield put(SystemAction.getListSystemSuccess(request.data.data));
        yield put(hideLoader())
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}

function* updateSystem ({data}) {
    yield put(showLoader())
    yield put(showLoadingBtn())
    try {
        yield delay(500)
        const request = yield call(API.updateSystemFromApi, getCookie('token'), data);
        yield put(hideLoader())
        yield put(hideLoadingBtn())
        if(request.data.status === 'success'){
            yield put(SystemAction.updateSystemSuccess(request.data.data));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}

export function* watchGetListSystem () {
    yield takeLatest(Types.GET_LIST_SYSTEM, getListSystem)
}

export function* watchUpdateSystem () {
    yield takeLatest(Types.UPDATE_SYSTEM, updateSystem)
}

export default function* root () {
    yield all ([
        fork(watchGetListSystem),
        fork(watchUpdateSystem)
    ])
}