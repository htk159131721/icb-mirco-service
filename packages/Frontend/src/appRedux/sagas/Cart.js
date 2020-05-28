import {
  all,
  put,
  takeEvery,
  call,
  takeLatest,
  delay
} from "redux-saga/effects";
import * as Types from "../../constants/ActionTypes";
import * as CartAction from "../actions/CartAction";
import {
  showMessError,
  showMessSuccess,
  showLoader,
  hideLoader,
  showLoadingBtn,
  hideLoadingBtn,
  showNotificationDynamic,
  showModalDynamic
} from "../actions/GeneralAction";
import {
  SUCCESSFULLY,
  APPLY_CODE_FAILED,
  APPLY_CODE_SUCCESS,
  PAYMENT_SUCCESS,
  ERROR
} from "../../constants/messages";
import { getCookie } from "../../helpers/cookie";
import Redirect from "../../helpers/Redirect"
import { API } from "./ApiCart";

function* getListCart() {
  yield put(showLoader());
  try {
    const response = yield call(API.getCartFromApi, getCookie("token"));
    if(response.data.status_code === 200){
      yield put(CartAction.getCartSuccess(response.data.data));
    } else {
      yield put(showMessError(ERROR));
    }
    yield put(hideLoader());
  } catch (error) {
    yield put(showMessError(error));
  }
}

function* getListOrderLatest() {
  yield put(showLoader());
  try {
    const response = yield call(API.getOrderPaymentViewFromApi, getCookie("token"));
    if(response.data.status_code === 200){
      if(response.data.data){
        yield put(CartAction.getOrderPaymentAlepayLatestSuccess(response.data.data))
        yield call(API.updatePaymentViewFromApi, getCookie("token"))
      }
      
    } else {
      yield put(showMessError(ERROR));
    }
    yield put(hideLoader());
  } catch (error) {
    yield put(showMessError(error));
  }
}

function* createCart({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(1000);
    const response = yield call(
      API.createCartFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(CartAction.createCartSuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* updateCart({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(1000);
    const response = yield call(
      API.updateCartFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(CartAction.updateCartSuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* updateOrderLatest({ data }) {
  try {
    const response = yield call(
      API.updatePaymentViewFromApi,
      getCookie("token"),
      data
    );
    if (response.data.status_code === 200) {
      yield put(CartAction.updateOrderPaymentAlepayLatestSuccess(response.data.data));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* deleteCart({ id }) {
  yield put(showLoader());
  try {
    yield delay(1000);
    const response = yield call(
      API.deleteCartFromApi,
      getCookie("token"),
      id
    );
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      yield put(CartAction.deleteCartSuccess(id));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* checkPromotionCode({ data }) {
  yield put(showLoader());
  try {
    yield delay(1000);
    const response = yield call(
      API.checkPromotionFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      yield put(CartAction.checkPrommotionSuccess(response.data.data));
      yield put(showMessSuccess(APPLY_CODE_SUCCESS));
    } else {
      yield put(showMessError(APPLY_CODE_FAILED));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
    yield put(hideLoader());
  }
}

function* onCheckout({data}) {
  yield put(showLoader());
  try {
    yield delay(500, true)
    const response = yield call(API.checkOutFromApi, getCookie("token"), data);
    if(response.data.status_code === 200){
      yield put(CartAction.checkoutSuccess(response.data.data));
      if(sessionStorage.getItem("PROMOTION")){
        sessionStorage.removeItem("PROMOTION")
      }
      yield put(showModalDynamic("checkout", false))
      yield put(showNotificationDynamic("checkoutNotifi", true))
      yield delay(100, true)
      yield put(showNotificationDynamic("checkoutNotifi", false))
      // check payment via alepay
      if(response.data.data.alepayData){
        Redirect(response.data.data.alepayData.checkoutUrl, "_blank")
      }
    } else {
      yield put(showMessError(ERROR));
    }
    yield put(hideLoader());
  } catch (error) {
    yield put(showMessError(error));
  }
}
/****************************************Watcher****************************** */
function* watchGetListCart() {
  yield takeEvery(Types.GET_LIST_CART, getListCart);
}
function* watchCreateCart() {
  yield takeLatest(Types.CREATE_CART, createCart);
}
function* watchUpdateCart() {
  yield takeLatest(Types.UPDATE_CART, updateCart);
}
function* watchDeleteCart() {
  yield takeLatest(Types.DELETE_CART, deleteCart);
}
function* watchCheckPromotionCode() {
  yield takeLatest(Types.CHECK_PROMOTION, checkPromotionCode);
}
function* watchCheckout() {
  yield takeLatest(Types.CHECK_OUT, onCheckout);
}
function* watchGetListOrderLatest() {
  yield takeLatest(Types.GET_ORDER_PAYMENT_ALEPAY_LATEST, getListOrderLatest);
}
function* watchUpdateOrderLatest() {
  yield takeLatest(Types.UPDATE_VIEW_PAYMENT_ALEPAY, updateOrderLatest);
}
export default function* root() {
  yield all([
    watchGetListCart(),
    watchCreateCart(),
    watchUpdateCart(),
    watchDeleteCart(),
    watchCheckPromotionCode(),
    watchUpdateOrderLatest(),
    watchGetListOrderLatest(),
    watchCheckout()
  ]);
}
