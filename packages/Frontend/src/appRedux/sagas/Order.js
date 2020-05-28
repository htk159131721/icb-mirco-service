import {all, put, fork, call, takeLatest} from 'redux-saga/effects'
import * as Types from '../../constants/ActionTypes'
import * as OrderAction from '../actions/OrderAction'
import {showMessError, showLoader, hideLoader, showModalDynamic} from '../actions/GeneralAction'
import {ERROR} from '../../constants/messages'
import {getCookie} from '../../helpers/cookie'
import {API} from './ApiOrder'

function* getListOrder ({queryString}) {
   yield put(showLoader())
    try {
        const response = yield call(API.getListOrderFromApi, getCookie('token'), queryString);
        if(response.data.status_code === 200){
            yield put(OrderAction.getListOrderSuccess(response.data.data))
            yield put(hideLoader())
        } else {
            yield put(showMessError(ERROR))
        }
    } catch (error) {
       yield put(showMessError(ERROR))
    }
}
function* getListOrderToSearch ({queryString}) {
    yield put(showLoader())
     try {
         const response = yield call(API.getListOrderFromApi, getCookie('token'), queryString);
         if(response.data.status_code === 200){
             yield put(OrderAction.getListOrderToSearchSuccess(response.data.data))
             yield put(hideLoader())
         } else {
             yield put(showMessError(ERROR))
         }
     } catch (error) {
        yield put(showMessError(ERROR))
     }
 }

 function* getOrderDetail ({id}) {
    yield put(showLoader())
     try {
         const response = yield call(API.getOrderDetailFromApi, getCookie('token'), id);
         if(response.data.status_code === 200){
             yield put(OrderAction.getOrderDetailSuccess(response.data.data))
             yield put(hideLoader())
             yield put(showModalDynamic("modalOrderViewDetail", true))
         } else {
             yield put(showMessError(ERROR))
         }
     } catch (error) {
        yield put(showMessError(ERROR))
     }
 }
/******************************* Watcher ****************************************/
function* watchGetListOrder () {
    yield takeLatest(Types.GET_LIST_ORDER, getListOrder)
}
function* watchGetListOrderToSearch () {
    yield takeLatest(Types.GET_LIST_ORDER_TO_SEARCH, getListOrderToSearch)
}
function* watchGetOrderDetail () {
    yield takeLatest(Types.GET_ORDER_DETAIL, getOrderDetail)
}
export default function* root () {
    yield all ([
        fork(watchGetListOrder),
        fork(watchGetListOrderToSearch),
        fork(watchGetOrderDetail)
    ])
}