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
import * as NewsAction from "../actions/NewsAction";
import {
  showMessError,
  showLoader,
  hideLoader,
  showMessSuccess,
  showLoadingBtn,
  hideLoadingBtn
} from "../actions/GeneralAction";
import { SUCCESSFULLY, ERROR } from "../../util/messages";
import { getCookie } from "../../helpers/cookie";
import { API } from "./ApiNews";

function* getListNews() {
  yield put(showLoader());
  try {
    const response = yield call(API.getListNewsFromApi, getCookie("token"));
    if (response.data.status_code === 200) {
      yield put(NewsAction.getListNewsSuccess(response.data.data));
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(showMessError());
  }
}

function* createNews({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.createNewsFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(NewsAction.createNewsSuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* updateNews({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.updateNewsFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(NewsAction.updateNewsSuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* deleteNews({ id }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(API.deleteNewsFromApi, getCookie("token"), id);
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      yield put(NewsAction.deleteNewsSuccess(id));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/******************************* Watcher ****************************************/
function* watchGetListNews() {
  yield takeEvery(Types.GET_LIST_NEWS, getListNews);
}
function* watchCreateNews() {
  yield takeLatest(Types.CREATE_NEWS, createNews);
}
function* watchUpdateNews() {
  yield takeLatest(Types.UPDATE_NEWS, updateNews);
}
function* watchDeleteNews() {
  yield takeLatest(Types.DELETE_NEWS, deleteNews);
}
export default function* root() {
  yield all([
    fork(watchGetListNews),
    fork(watchCreateNews),
    fork(watchUpdateNews),
    fork(watchDeleteNews)
  ]);
}
