
import {all, put, takeEvery, fork, call, takeLatest, delay} from 'redux-saga/effects'
import * as Types from '../../constants/ActionTypes'
import * as PackageAction from '../actions/PackageAction'
import {showMessError, showLoader, hideLoader, showMessSuccess, showLoadingBtn, hideLoadingBtn} from '../actions/GeneralAction'
import {SUCCESSFULLY, ERROR} from '../../util/messages'
import {getCookie} from '../../helpers/cookie'
import {API} from './ApiPackage'

function* getListPackage () {
    yield put(showLoader())
    try {
        const request = yield call(API.getListPackageFromApi, getCookie('token'));
        yield put(PackageAction.getListPackageSuccess(request.data.data))
        yield put(hideLoader())
    } catch (error) {
        yield put(showMessError())
    }
}
function* createPackage ({data}) {
    yield put(showLoadingBtn())
    try {
        yield delay(500)
        const request = yield call(API.createPackageFromApi, getCookie('token'), data);
        yield put(hideLoadingBtn())
        if(request.data.status === 'success'){
            yield put(PackageAction.createPackageSuccess(request.data.data));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* updatePackage ({data}) {
    yield put(showLoadingBtn())
    try {
        yield delay(500)
        const request = yield call(API.updatePackageFromApi, getCookie('token'), data);
        yield put(hideLoadingBtn())
        if(request.data.status === 'success'){
            yield put(PackageAction.updatePackageSuccess(request.data.data));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* deletePackage ({id}) {
    yield put(showLoader())
    try {
        yield delay(500)
        const request = yield call(API.deletePackageFromApi, getCookie('token'), id);
        yield put(hideLoader())
        if(request.data.status === 'success'){
            yield put(PackageAction.deletePackageSuccess(id));
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
            yield put(PackageAction.updatePositionPackageSuccess(data));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
/******************************* Watcher ****************************************/
export function* watchGetListPackage () {
    yield takeEvery(Types.GET_LIST_PACKAGE, getListPackage)
}
export function* watchCreatePackage () {
    
    yield takeLatest(Types.CREATE_PACKAGE, createPackage)
}
export function* watchUpdatePackage () {
    yield takeLatest(Types.UPDATE_PACKAGE, updatePackage)
}
export function* watchDeletePackage () {
    yield takeLatest(Types.DELETE_PACKAGE, deletePackage)
}
export function* watchUpdatePosition () {
    yield takeLatest(Types.UPDATE_POSITION_PACKAGE, updatePosition)
}
export default function* root () {
    yield all ([
        fork(watchGetListPackage),
        fork(watchCreatePackage),
        fork(watchUpdatePackage),
        fork(watchDeletePackage),
        fork(watchUpdatePosition)
    ])
}