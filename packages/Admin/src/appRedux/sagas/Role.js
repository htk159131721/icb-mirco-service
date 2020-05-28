import {all, put, takeEvery, fork, call, takeLatest, delay} from 'redux-saga/effects'
import * as Types from '../../constants/ActionTypes'
import * as RoleAction from '../actions/RoleAction'
import {showMessError, showMessSuccess, showLoader, hideLoader, showLoadingBtn, hideLoadingBtn} from '../actions/GeneralAction'
import {SUCCESSFULLY, ERROR} from '../../util/messages'
import {getCookie} from '../../helpers/cookie'
import {API} from './ApiRole'

function* getListRole () {
    yield put(showLoader())
    try {
        const request = yield call(API.getListRoleFromApi, getCookie('token'));
        yield put(RoleAction.getListRoleSuccess(request.data.data));
        yield put(hideLoader())
    } catch (error) {
        yield put(showMessError(error))
    }
}
function* createRole ({data}) {
    yield put(showLoadingBtn())
    try {
        yield delay(500)
        const request = yield call(API.createRoleFromApi, getCookie('token'), data);
        if(request.data.status === 'success'){
            yield put(RoleAction.createRoleSuccess(request.data.data));
            yield put(showMessSuccess(SUCCESSFULLY))
            yield put(RoleAction.getListRole())
        } else {
            yield put(showMessError('ERROR'))
        }
        yield put(hideLoadingBtn())
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* updateRole ({data}) {
    yield put(showLoadingBtn())
    try {
        yield delay(500)
        const request = yield call(API.updateRoleFromApi, getCookie('token'), data);
        yield put(hideLoadingBtn())
        if(request.data.status === 'success'){
            yield put(RoleAction.updateRoleSuccess(request.data.data));
            yield put(showMessSuccess(SUCCESSFULLY))
            yield put(RoleAction.getListRole())
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* deleteRole ({id}) {
    yield put(showLoader())
    try {
        yield delay(500)
        const request = yield call(API.deleteRoleFromApi, getCookie('token'), id);
        yield put(hideLoader())
        if(request.data.status === 'success'){
            yield put(RoleAction.deleteRoleSuccess(id));
            yield put(showMessSuccess(SUCCESSFULLY))
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
export function* watchGetListRole () {
    yield takeEvery(Types.GET_LIST_ROLE, getListRole)
}
export function* watchCreateRole () {
    yield takeLatest(Types.CREATE_ROLE, createRole)
}
export function* watchUpdateRole () {
    yield takeLatest(Types.UPDATE_ROLE, updateRole)
}
export function* watchDeleteRole () {
    yield takeLatest(Types.DELETE_ROLE, deleteRole)
}
export default function* root () {
    yield all ([
        watchGetListRole(),
        watchCreateRole(),
        watchUpdateRole(),
        watchDeleteRole()
    ])
}