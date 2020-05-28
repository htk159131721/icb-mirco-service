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
import * as ReceiptAction from "../actions/ReceiptAction";
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
  ERROR
} from "../../util/messages";
import { getCookie } from "../../helpers/cookie";
import { API } from "./ApiReceipt";

function* getListReceipt() {
  yield put (showLoader())
  try {
    const request = yield call(API.getListReceiptFromApi, getCookie("token"));
    if (request.data.status_code === 200) {
      yield put(ReceiptAction.getListReceiptSuccess(request.data.data));
    } else {
      yield put(showMessError(ERROR));
    }
    yield put(hideLoader())
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* createReceipt({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const request = yield call(API.createReceiptFromApi, getCookie("token"), data);
    yield put(hideLoadingBtn());
    if (request.data.status_code === 200) {
      yield put(
        ReceiptAction.createReceiptSuccess(request.data.data)
      );
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(request.data.message));
    }
  } catch (error) {
    yield put(hideLoadingBtn());
    yield put(showMessError(ERROR));
  }
}

function* deleteReceipt({ id }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const request = yield call(API.deleteReceiptFromApi, getCookie("token"), id);
    yield put(hideLoader());
    if (request.data.status_code === 200) {
      yield put(
        ReceiptAction.deleteReceiptSuccess(id)
      );
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(showMessError(ERROR));
  }
}

/*************************************** Watcher*********************************************/
function* watchGetListReceipt() {
  yield takeLatest(Types.GET_LIST_RECEIPT, getListReceipt);
}
function* watchCreateReceipt() {
  yield takeLatest(Types.CREATE_RECEIPT, createReceipt);
}
function* watchDeleteReceipt() {
  yield takeLatest(Types.DELETE_RECEIPT, deleteReceipt);
}

export default function* root() {
  yield all([
    fork(watchGetListReceipt),
    fork(watchCreateReceipt),
    fork(watchDeleteReceipt)
  ]);
}
