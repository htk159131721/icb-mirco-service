import {all, put, takeEvery, fork, call, takeLatest, delay} from 'redux-saga/effects'
import * as Types from '../../constants/ActionTypes'
import * as CatePackageAction from '../actions/CatePackageAction'
import {showMessError, showMessSuccess, showLoader, hideLoader} from '../actions/GeneralAction'
import {SUCCESSFULLY, ERROR} from '../../util/messages'
import {getCookie} from '../../helpers/cookie'
import {API} from './ApiCatePackage'

function* getListCatePackage () {
    yield put(showLoader())
    try {
        const request = yield call(API.getListCatePackageFromApi, getCookie('token'));
        yield put(CatePackageAction.getListCatePackageSuccess(request.data.data));
        yield put(hideLoader())
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* createCatePackage ({data}) {
    yield put(showLoader())
    try {
        yield delay(500)
        const request = yield call(API.createCatePackageFromApi, getCookie('token'), data);
        yield put(hideLoader())
        if(request.data.status === 'success'){
            yield put(CatePackageAction.createCatePackageSuccess(request.data.data));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError('ERROR'))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* updateCatePackage ({data}) {
    yield put(showLoader())
    try {
        yield delay(500)
        const request = yield call(API.updateCatePackageFromApi, getCookie('token'), data);
        yield put(hideLoader())
        if(request.data.status === 'success'){
            yield put(CatePackageAction.updateCatePackageSuccess(request.data.data));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* deleteCatePackage ({id}) {
    yield put(showLoader())
    try {
        yield delay(500)
        const request = yield call(API.deleteCatePackageFromApi, getCookie('token'), id)
        yield put(hideLoader())
        if(!!request.data){
            if(request.data.status === 'success'){
                yield put(CatePackageAction.deleteCatePackageSuccess(id));
                yield put(showMessSuccess(SUCCESSFULLY))
            }
        } else {
            yield put(showMessError(ERROR))
        }
    
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
export function* watchGetListCatePackage () {
    yield takeEvery(Types.GET_LIST_CATE_PACKAGE, getListCatePackage)
}
export function* watchCreateCatePackage () {
    yield takeLatest(Types.CREATE_CATE_PACKAGE, createCatePackage)
}
export function* watchUpdateCatePackage () {
    yield takeLatest(Types.UPDATE_CATE_PACKAGE, updateCatePackage)
}
export function* watchDeleteCatePackage () {
    yield takeLatest(Types.DELETE_CATE_PACKAGE, deleteCatePackage)
}
export default function* root () {
    yield all ([
        fork(watchGetListCatePackage),
        fork(watchCreateCatePackage),
        fork(watchUpdateCatePackage),
        fork(watchDeleteCatePackage)
    ])
}