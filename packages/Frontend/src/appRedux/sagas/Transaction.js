import { all, put, fork, call, takeLatest } from "redux-saga/effects";
import * as Types from "../../constants/ActionTypes";
import {
  getListCommissionSuccess,
  getListCommissionSaverSuccess,
  getListWithdrawSuccess,
  getListWithdrawSaverSuccess
} from "../actions/TransactionAction";
import {
  showMessError,
  showLoader,
  hideLoader
} from "../actions/GeneralAction";
import { ERROR } from "../../constants/messages";
import { getCookie } from "../../helpers/cookie";
import { API } from "./ApiTransaction";

function* getListCMS({ queryString }) {
  yield put(showLoader());
  try {
    const response = yield call(
      API.getListCMSFromApi,
      getCookie("token"),
      queryString
    );
    if (response.data.status_code === 200) {
      yield put(getListCommissionSuccess(response.data.data));
      if (!queryString)
        yield put(getListCommissionSaverSuccess(response.data.data));
      yield put(hideLoader());
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* getListWithDraw({ queryString }) {
  yield put(showLoader());
  try {
    const response = yield call(
      API.getListWithDrawFromApi,
      getCookie("token"),
      queryString
    );
    if (response.data.status_code === 200) {
      yield put(getListWithdrawSuccess(response.data.data));
      if (!queryString)
        yield put(getListWithdrawSaverSuccess(response.data.data));
      yield put(hideLoader());
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/******************************* Watcher ****************************************/
function* watchGetListCMS() {
  yield takeLatest(Types.GET_LIST_COMMISSION, getListCMS);
}
function* watchGetListWithdraw() {
  yield takeLatest(Types.GET_LIST_WITHDRAW, getListWithDraw);
}
export default function* root() {
  yield all([fork(watchGetListCMS), fork(watchGetListWithdraw)]);
}
