import {
  all,
  put,
  takeEvery,
  fork,
  call,
  takeLatest,
  delay
} from "redux-saga/effects";
import * as Types from "../../constants/ActionTypes";
import * as CurrencyAction from "../actions/CurrencyAction";
import {
  showMessError,
  showLoader,
  hideLoader,
  showMessSuccess,
  showLoadingBtn,
  hideLoadingBtn
} from "../actions/GeneralAction";
import {
  SUCCESSFULLY,
  ERROR,
  USERNAME_ALLREADY,
  EMAIL_ALLREADY
} from "../../util/messages";
import { getCookie } from "../../helpers/cookie";
import { API } from "./ApiCurrency";

function* getListCurrency() {
  yield put(showLoader());
  try {
    const response = yield call(API.getListCurrencyFromApi, getCookie("token"));
    if (response.data.status_code === 200) {
      yield put(CurrencyAction.getListCurrencySuccess(response.data.data));
      yield put(hideLoader());
    } else yield put(showMessError(ERROR));
  } catch (error) {
    yield put(CurrencyAction.getListCurrencySuccess(error));
  }
}

function* createCurrency({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.createCurrencyFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(CurrencyAction.createCurrencySuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(response.data.message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* updateCurrency({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.updateCurrencyFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(CurrencyAction.updateCurrencySuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(response.data.message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* deleteCurrency({ id }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(
      API.deleteCurrencyFromApi,
      getCookie("token"),
      id
    );
    yield put(hideLoader());
    if (response.data.status === "success") {
      yield put(CurrencyAction.deleteCurrencySuccess(id));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

/*************************************** Watcher*********************************************/
function* watchGetListCurrency() {
  yield takeLatest(Types.GET_LIST_CURRENCY, getListCurrency);
}
export function* watchCreateCurrency() {
  yield takeLatest(Types.CREATE_CURRENCY, createCurrency);
}
export function* watchUpdateCurrency() {
  yield takeLatest(Types.UPDATE_CURRENCY, updateCurrency);
}
export function* watchDeleteCurrency() {
  yield takeLatest(Types.DELETE_CURRENCY, deleteCurrency);
}

export default function* rootCurrency() {
  yield all([
    fork(watchGetListCurrency),
    fork(watchCreateCurrency),
    fork(watchUpdateCurrency),
    fork(watchDeleteCurrency)
  ]);
}
