import { all, put, fork, call, takeLatest, delay } from "redux-saga/effects";
import { GET_LIST_NEWS, GET_NEWS_DETAIL } from "../../constants/ActionTypes";
import {
  getListNewsSuccess,
  getNewsDetailSuccess
} from "../actions/NewsAction";
import {
  showMessError,
  showLoader,
  hideLoader,
  showLoadingBtn,
  hideLoadingBtn
} from "../actions/GeneralAction";
import { ERROR } from "../../constants/messages";
import { getCookie } from "../../helpers/cookie";
import { API } from "./ApiNews";

function* getListNews() {
  yield put(showLoader());
  yield put(showLoadingBtn());
  try {
    const response = yield call(API.getListNewsFromApi, getCookie("token"));
    if (response.data.status_code === 200) {
      yield put(getListNewsSuccess(response.data.data));
    } else {
      yield put(showMessError(ERROR));
    }
    yield put(hideLoader());
    yield delay(500, true);
    yield put(hideLoadingBtn());
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* getNewsDetail({ id }) {
  yield put(showLoader());
  yield put(showLoadingBtn());
  try {
    const response = yield call(
      API.getNewsDetailFromApi,
      getCookie("token"),
      id
    );
    if (response.data.status_code === 200) {
      yield put(getNewsDetailSuccess(response.data.data));
    } else {
      yield put(showMessError(ERROR));
    }
    yield put(hideLoader());
    yield delay(500, true);
    yield put(hideLoadingBtn());
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/******************************* Watcher ****************************************/
function* watchGetListNews() {
  yield takeLatest(GET_LIST_NEWS, getListNews);
}
function* watchGetNewsDetail() {
  yield takeLatest(GET_NEWS_DETAIL, getNewsDetail);
}
export default function* root() {
  yield all([fork(watchGetListNews), fork(watchGetNewsDetail)]);
}
