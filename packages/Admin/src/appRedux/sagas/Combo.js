
import {all, put, takeEvery, fork, call, takeLatest, delay} from 'redux-saga/effects'
import * as Types from '../../constants/ActionTypes'
import * as ComboAction from '../actions/ComboAction'
import {showMessError, showLoader, hideLoader, showMessSuccess, showLoadingBtn, hideLoadingBtn} from '../actions/GeneralAction'
import {SUCCESSFULLY, ERROR} from '../../util/messages'
import {getCookie} from '../../helpers/cookie'
import {API} from './ApiCombo'

function* getListCombo () {
    yield put(showLoader())
    try {
        const request = yield call(API.getListComboFromApi, getCookie('token'));
        yield put(ComboAction.getListComboSuccess(request.data.data))
        yield put(hideLoader())
    } catch (error) {
        yield put(showMessError())
    }
}
function* createCombo ({data}) {
    yield put(showLoadingBtn())
    try {
        yield delay(500)
        const request = yield call(API.createComboFromApi, getCookie('token'), data);
        yield put(hideLoadingBtn())
        if(request.data.status === 'success'){
            yield put(ComboAction.createComboSuccess(request.data.data));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* updateCombo ({data}) {
    yield put(showLoadingBtn())
    try {
        yield delay(500)
        const request = yield call(API.updateComboFromApi, getCookie('token'), data);
        yield put(hideLoadingBtn())
        if(request.data.status === 'success'){
            yield put(ComboAction.updateComboSuccess(request.data.data));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* deleteCombo ({id}) {
    yield put(showLoader())
    try {
        yield delay(500)
        const request = yield call(API.deleteComboFromApi, getCookie('token'), id);
        yield put(hideLoader())
        if(request.data.status === 'success'){
            yield put(ComboAction.deleteComboSuccess(id));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* updatePosition ({data}) {
    yield put(showLoader())
    try {
        yield delay(500)
        const request = yield call(API.updatePositionFromApi, getCookie('token'), data);
        yield put(hideLoader())
        if(request.data.status === 'success'){
            yield put(ComboAction.updatePositionComboSuccess(data));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
/******************************* Watcher ****************************************/
function* watchGetListCombo () {
    yield takeLatest(Types.GET_LIST_COMBO, getListCombo)
}
function* watchCreateCombo () {
    yield takeLatest(Types.CREATE_COMBO, createCombo)
}
function* watchUpdateCombo () {
    yield takeLatest(Types.UPDATE_COMBO, updateCombo)
}
function* watchDeleteCombo () {
    yield takeLatest(Types.DELETE_COMBO, deleteCombo)
}
function* watchUpdatePosition () {
    yield takeLatest(Types.UPDATE_POSITION_COMBO, updatePosition)
}
export default function* root () {
    yield all ([
        fork(watchGetListCombo),
        fork(watchCreateCombo),
        fork(watchUpdateCombo),
        fork(watchDeleteCombo),
        fork(watchUpdatePosition)
    ])
}