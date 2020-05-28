
import {all, put, takeEvery, fork, call, takeLatest, delay} from 'redux-saga/effects'
import * as Types from '../../constants/ActionTypes'
import * as PromotionAction from '../actions/PromotionAction'
import {showMessError, showLoader, hideLoader, showMessSuccess, showLoadingBtn, hideLoadingBtn} from '../actions/GeneralAction'
import {SUCCESSFULLY, ERROR} from '../../util/messages'
import {getCookie} from '../../helpers/cookie'
import {API} from './ApiPromotion'

function* getListPromotion () {
    yield put(showLoader())
    try {
        const request = yield call(API.getListPromotionFromApi, getCookie('token'));
        yield put(PromotionAction.getListPromotionSuccess(request.data.data))
        yield put(hideLoader())
    } catch (error) {
        yield put(showMessError())
    }
}
function* createPromotion ({data}) {
    yield put(showLoadingBtn())
    try {
        yield delay(500)
        const request = yield call(API.createPromotionFromApi, getCookie('token'), data);
        yield put(hideLoadingBtn())
        if(request.data.status === 'success'){
            yield put(PromotionAction.createPromotionSuccess(request.data.data));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* updatePromotion ({data}) {
    yield put(showLoadingBtn())
    try {
        yield delay(500)
        const request = yield call(API.updatePromotionFromApi, getCookie('token'), data);
        yield put(hideLoadingBtn())
        if(request.data.status === 'success'){
            yield put(PromotionAction.updatePromotionSuccess(request.data.data));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* deletePromotion ({id}) {
    yield put(showLoader())
    try {
        yield delay(500)
        const request = yield call(API.deletePromotionFromApi, getCookie('token'), id);
        yield put(hideLoader())
        if(request.data.status === 'success'){
            yield put(PromotionAction.deletePromotionSuccess(id));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
/******************************* Watcher ****************************************/
export function* watchGetListPromotion () {
    yield takeEvery(Types.GET_LIST_PROMOTION, getListPromotion)
}
export function* watchCreatePromotion () {
    
    yield takeLatest(Types.CREATE_PROMOTION, createPromotion)
}
export function* watchUpdatePromotion () {
    yield takeLatest(Types.UPDATE_PROMOTION, updatePromotion)
}
export function* watchDeletePromotion () {
    yield takeLatest(Types.DELETE_PROMOTION, deletePromotion)
}
export default function* root () {
    yield all ([
        fork(watchGetListPromotion),
        fork(watchCreatePromotion),
        fork(watchUpdatePromotion),
        fork(watchDeletePromotion),
    ])
}