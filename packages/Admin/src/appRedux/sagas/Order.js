import { all, put, fork, call, takeLatest, delay } from "redux-saga/effects";
import * as Types from "../../constants/ActionTypes";
import * as OrderAction from "../actions/OrderAction";
import {
  showMessError,
  showMessSuccess,
  showLoader,
  hideLoader,
  showLoadingBtn,
  hideLoadingBtn,
  showModalPackage,
} from "../actions/GeneralAction";
import {
  SUCCESSFULLY,
  ERROR,
  APPLY_CODE_FAILED,
  APPLY_CODE_SUCCESS,
  TOKEN_EXPRITED,
} from "../../util/messages";
import { getCookie } from "../../helpers/cookie";
import { API } from "./ApiOrder";

function* getListOrder() {
  yield put(showLoader());
  try {
    console.log(getCookie("token"));
    const response = yield call(API.getListOrderFromApi, getCookie("token"));
    if (response.data.status_code === 200) {
      yield put(OrderAction.getListOrderSuccess(response.data.data));
    } else yield put(showMessError(ERROR));
    yield put(hideLoader());
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* getListOrderPending() {
  try {
    const response = yield call(
      API.getListOrderPendingFromApi,
      getCookie("token")
    );
    if (response.data.status_code === 200) {
      yield put(OrderAction.getListOrderPendingSuccess(response.data.data));
    } else yield put(showMessError(ERROR));
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* getDetailOrder({ data }) {
  yield put(showLoader());
  try {
    const response = yield call(
      API.getDetailOrderFromApi,
      getCookie("token"),
      data.id
    );
    if (response.data.status_code === 200) {
      yield put(OrderAction.getDetailOrderSuccess(response.data.data));
      if (data.view === "VIEW") yield put(showModalPackage(true));
    } else yield put(showMessError(ERROR));
    yield put(hideLoader());
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* createOrder({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.createOrderFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(OrderAction.createOrderSuccess(response.data.data));
      yield put(OrderAction.clearListService());
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* updateOrder({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.updateOrderFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status === "success") {
      yield put(OrderAction.updateOrderSuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* updateStatusOrder({ data }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(
      API.updateStatusOrderFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoader());
    if (response.data.status === "success") {
      yield put(OrderAction.updateStatusOrderSuccess(data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* checkCodePromotion({ data }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(
      API.checkCodePromotionFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      yield put(OrderAction.applyCodePromotionSuccess(response.data.data));
      yield put(showMessSuccess(APPLY_CODE_SUCCESS));
    } else if (response.data.status_code === 404) {
      yield put(showMessError(TOKEN_EXPRITED));
    } else {
      yield put(showMessError(APPLY_CODE_FAILED));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/*******************************Watcher **********************************/
function* watchGetListOrder() {
  yield takeLatest(Types.GET_LIST_ORDER, getListOrder);
}
function* watchGetListOrderPending() {
  yield takeLatest(Types.GET_LIST_ORDER_PENDING, getListOrderPending);
}
function* watchGetDetailOrder() {
  yield takeLatest(Types.GET_DETAIL_ORDER, getDetailOrder);
}
function* watchCreateOrder() {
  yield takeLatest(Types.CREATE_ORDER, createOrder);
}
function* watchUpdateOrder() {
  yield takeLatest(Types.UPDATE_ORDER, updateOrder);
}
function* watchUpdateStatusOrder() {
  yield takeLatest(Types.UPDATE_STATUS_ORDER, updateStatusOrder);
}
function* watchCheckCodePromotion() {
  yield takeLatest(Types.APPLY_CODE_PROMOTION, checkCodePromotion);
}
export default function* root() {
  yield all([
    fork(watchGetListOrder),
    fork(watchGetListOrderPending),
    fork(watchCreateOrder),
    fork(watchUpdateOrder),
    fork(watchUpdateStatusOrder),
    fork(watchGetDetailOrder),
    fork(watchCheckCodePromotion),
  ]);
}
