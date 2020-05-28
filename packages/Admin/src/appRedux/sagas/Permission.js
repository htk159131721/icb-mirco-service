import {all, put, takeEvery, fork, call, takeLatest, take, delay} from 'redux-saga/effects'
import * as Types from '../../constants/ActionTypes'
import * as Permission from '../actions/PermissionAction'
import {showMessError, showLoader, hideLoader} from '../actions/GeneralAction'
import {ERROR} from '../../util/messages'
import {getCookie} from '../../helpers/cookie'
import {API} from './ApiPermission'

function* getListGroupPermission () {
    yield put(showLoader())
    try {
        const request = yield call(API.getListGroupPermissionFromApi, getCookie('token'));
        yield put(Permission.getDataGroupPermissionSuccess(request.data.data));
        yield put(hideLoader())
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* getListPermission () {
    try {
        yield delay(500)
        const request = yield call(API.getListPermissionFromApi, getCookie('token'));
        yield put(Permission.getDataListPermissionSuccess(request.data.data));
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* getListPermissionByGroup ({groupId}) {
    try {
        const request = yield call(API.getListPermissionByGroup, getCookie('token'), groupId);
        yield put(Permission.getDataPermissionByGroupSuccess(request.data.data));
    } catch (error) {
        yield put(showMessError(error))
    }
}

export function* watchGetListGroupPermission () {
    yield takeLatest(Types.GET_GROUP_PERMISSION, getListGroupPermission)
}
export function* watchGetListPermission () {
    yield takeLatest(Types.GET_LIST_PERMISSION, getListPermission)
}
export function* watchGetListPermissionByGroup () {
    yield takeEvery(Types.GET_PERMISSION_BY_GROUP, getListPermissionByGroup)
}

export default function* root () {
    yield all ([
        watchGetListGroupPermission(),
        watchGetListPermissionByGroup(),
        watchGetListPermission()
    ])
}