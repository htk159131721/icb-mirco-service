import {all, put, takeEvery, fork, call, takeLatest, delay} from 'redux-saga/effects'
import * as Types from '../../constants/ActionTypes'
import * as ReportAction from '../actions/ReportAction'
import {showMessError, showLoader, hideLoader, showModalPackage, showLoadingBtn, hideLoadingBtn, showMessSuccess} from '../actions/GeneralAction'
import {SUCCESSFULLY, ERROR} from '../../util/messages'
import {getCookie} from '../../helpers/cookie'
import {API} from './ApiReport'

// sale
function* getListSaleReport ({queryString}) {
    yield put(showLoader())
    try {
        const response = yield call(API.getListSaleReportFromApi, getCookie('token'), queryString);
        if(response.data.status_code === 200){
            yield put(ReportAction.getListSaleReportSuccess(response.data.data));
            yield put(hideLoader())
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* getSaleReportDetail ({id}) {
    yield put(showLoader())
    try {
        const response = yield call(API.getDetailSaleReportFromApi, getCookie('token'), id);
        if(response.data.status_code === 200){
            yield put(ReportAction.getOrderDetailOfReportSuccess(response.data.data));
            yield put(hideLoader())
            yield put(showModalPackage(true))
        } else yield put(showMessError(ERROR))
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
// commission
function* getListCommissionReport ({queryString}) {
    yield put(showLoader())
    try {
        const response = yield call(API.getListCommissionReportFromApi, getCookie('token'), queryString);
        if(response.data.status_code === 200){
            yield put(ReportAction.getListCommissionReportSuccess(response.data.data));
            if(!queryString){
                yield put(ReportAction.getListReportSaverSuccess(response.data.data));
            }     
            yield put(hideLoader())
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
// payment
function* getListPaymentReport ({queryString}) {
    yield put(showLoader())
    try {
        const response = yield call(API.getListPaymentReportFromApi, getCookie('token'), queryString);
        if(response.data.status_code === 200){
            yield put(ReportAction.getListPaymentSuccess(response.data.data));
            if(!queryString){
                yield put(ReportAction.getListReportSaverSuccess(response.data.data));
            }             
            yield put(hideLoader())
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
// partner
function* getListPartnerReport ({queryString}) {
    yield put(showLoader())
    try {
        const response = yield call(API.getListPartnerReportFromApi, getCookie('token'), queryString);
        if(response.data.status_code === 200){
            yield put(ReportAction.getListPartnerSuccess(response.data.data));
            yield put(hideLoader())
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
// package
function* getListPackageReport ({queryString}) {
    yield put(showLoader())
    try {
        const response = yield call(API.getListPackageReportFromApi, getCookie('token'), queryString);
        if(response.data.status_code === 200){
            const dataNew = []; 
            response.data.data.map(obj => {
                delete obj.package_code
                delete obj.description
                delete obj.content
                delete obj.price
                delete obj.image
                delete obj.price_sale
                delete obj.agency_id
                delete obj.position
                delete obj.package_category_id
                delete obj.wasSale
                delete obj.status
                delete obj.updated_at
                dataNew.push(obj)
            })
            yield put(ReportAction.getListPackageReportSuccess(dataNew));
            yield put(hideLoader())
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
// withdraw
function* getListWithdrawReport ({queryString}) {
    yield put(showLoader())
    try {
        const response = yield call(API.getListWithdrawReportFromApi, getCookie('token'), queryString);
        if(response.data.status_code === 200){
            yield put(ReportAction.getListWithdrawReportSuccess(response.data.data));
            if(!queryString){
                yield put(ReportAction.getListReportSaverSuccess(response.data.data));
            }     
            yield put(hideLoader())
        }
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
function* updateWithdrawReport ({data}) {
    yield put(showLoadingBtn())
    try {
        const response = yield call(API.updateWithdrawReportFromApi, getCookie('token'), data);
        if(response.data.status_code === 200){
            yield put(ReportAction.updateWithdrawReportSuccess(response.data.data));  
            yield put(showMessSuccess(SUCCESSFULLY))
        }
        yield put(hideLoadingBtn())
    } catch (error) {
        yield put(showMessError(ERROR))
    }
}
/********************************* Watcher *************************** */
function* watchGetListSaleReport () {
    yield takeEvery(Types.GET_LIST_SALE_REPORT, getListSaleReport)
}
function* watchGetSaleReportDetail () {
    yield takeEvery(Types.GET_ORDER_DETAIL_OF_REPORT, getSaleReportDetail)
}
function* watchGetListCommissionReport () {
    yield takeEvery(Types.GET_LIST_COMMISSION_REPORT, getListCommissionReport)
}
function* watchGetListPaymentReport () {
    yield takeEvery(Types.GET_LIST_PAYMENT_REPORT, getListPaymentReport)
} 
function* watchGetListPartnerReport () {
    yield takeEvery(Types.GET_LIST_PARTNER, getListPartnerReport)
} 
function* watchGetListPackageReport () {
    yield takeEvery(Types.GET_LIST_PACKAGE_REPORT, getListPackageReport)
}
function* watchGetListWithdrawReport () {
    yield takeEvery(Types.GET_LIST_WITHDRAW_REPORT, getListWithdrawReport)
}
function* watchUpdateWithdrawReport () {
    yield takeEvery(Types.UPDATE_WITHDRAW_REPORT, updateWithdrawReport)
}
export default function* root () {
    yield all ([
        fork(watchGetListSaleReport),
        fork(watchGetSaleReportDetail),
        fork(watchGetListCommissionReport),
        fork(watchGetListPaymentReport),
        fork(watchGetListWithdrawReport),
        fork(watchUpdateWithdrawReport),
        fork(watchGetListPartnerReport),
        fork(watchGetListPackageReport)
    ])
}