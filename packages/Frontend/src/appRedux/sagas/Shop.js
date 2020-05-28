import {all, put, takeEvery, fork, call, takeLatest, delay} from 'redux-saga/effects'
import * as Types from '../../constants/ActionTypes'
import * as PackageAction from '../actions/ShopAction'
import {showMessError, showLoader, hideLoader, showMessSuccess, showLoadingBtn, hideLoadingBtn} from '../actions/GeneralAction'
import {SUCCESSFULLY, ERROR} from '../../constants/messages'
import {getCookie} from '../../helpers/cookie'
import {API} from './ApiShop'

function* getListPackage () {
   yield put(showLoader())
    try {
        
        const request = yield call(API.getListPackageFromApi, getCookie('token'));
        if(request.data.status_code === 200){
            yield put(PackageAction.getListPackageSuccess(request.data.data))
            yield put(hideLoader())
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
       yield put(showMessError(ERROR))
    }
}
function* buyPackage ({data}) {
    yield put(showLoadingBtn())
     try {
         
         const request = yield call(API.buyPackageFromApi, getCookie('token'), data);
         if(request.data.status_code === 200){
             yield put(PackageAction.buyPackageSuccess(request.data.data))
             yield put(showMessSuccess(SUCCESSFULLY))
             yield put(hideLoadingBtn())
         } else {
             yield put(showMessError(ERROR))
         }
     } catch (error) {
        yield put(showMessError(ERROR))
     }
 }
//combo
function* getListCombo () {
    yield put(showLoader())
     try {
         
         const request = yield call(API.getListComboFromApi, getCookie('token'));
         if(request.data.status_code === 200){
             yield put(PackageAction.getListComboSuccess(request.data.data))
             yield put(hideLoader())
         } else {
             yield put(showMessError(ERROR))
         }
     } catch (error) {
        yield put(showMessError(ERROR))
     }
 }
/******************************* Watcher ****************************************/
function* watchGetListPackage () {
    yield takeLatest(Types.GET_LIST_PACKAGE, getListPackage)
}
function* watchBuyPackage () {
    yield takeLatest(Types.BUY_PACKAGE, buyPackage)
}
//combo
function* watchGetListCombo () {
    yield takeLatest(Types.GET_LIST_COMBO, getListCombo)
}
export default function* root () {
    yield all ([
        fork(watchGetListPackage),
        fork(watchBuyPackage),
        fork(watchGetListCombo)
    ])
}