import {
    all,
    put,
    takeEvery,
    call,
    fork
  } from "redux-saga/effects";
  import * as Types from "../../constants/ActionTypes";
  import * as DashboardAction from "../actions/Dashboard";
  import {
    showMessError,
    showMessSuccess,
    showLoader,
    hideLoader,
    showLoadingBtn,
    hideLoadingBtn
  } from "../actions/GeneralAction";
  import {
    SUCCESSFULLY,
    ERROR,
    EMAIL_SENT_SUCCESS, NOT_ENOUGHT
  } from "../../constants/messages";
  import { getCookie } from "../../helpers/cookie";
  import { API } from "./ApiDashboard";

  function* getDashboardAction() {
    yield put(showLoader());
    try {
      const request = yield call(API.getDashboardFromApi, getCookie("token"));
      if(request.data.status_code === 200){
        yield put(DashboardAction.getDashboardSuccess(request.data.data));
      } else {
        yield put(showMessError(ERROR));
      }

      yield put(hideLoader());
    } catch (error) {
      yield put(showMessError(error));
    }
  }

  function* postSentEmailInvite({email}) {
    yield put(showLoader());
    try {
      const request = yield call(API.postSentInviteEmailApi, getCookie("token"), email);
      if(request.data.status_code === 200){
        yield put(DashboardAction.postSentEmailInviteSuccess(request.data));
        yield put(showMessSuccess(EMAIL_SENT_SUCCESS))
      } else {
        yield put(showMessError(ERROR));
      }

      yield put(hideLoader());
    } catch (error) {
      yield put(showMessError(error));
    }
  }

  function* createWithdraw({data}) {
    yield put(showLoadingBtn());
    try {
      const request = yield call(API.createWithdrawAPI, getCookie("token"), data);
      if(request.data.status_code === 200){
        yield put(DashboardAction.createWithdrawRequestSuccess(request.data));
        yield put(showMessSuccess(SUCCESSFULLY))
      } else if(request.data.status_code === 404) {
        yield put(showMessError(NOT_ENOUGHT));
      } else {
        yield put(showMessError(ERROR));
      } 
      yield put(hideLoadingBtn());
    } catch (error) {
      yield put(showMessError(error));
    }
  }
  /****************************************Watcher****************************** */
  function* watchgetDashboardAction() {
    yield takeEvery(Types.GET_DASHBOARD, getDashboardAction);
  }

  function* watchpostSentEmailInvite() {
    yield takeEvery(Types.POST_SENT_EMAIL_INVITE, postSentEmailInvite);
  }

  function* watchCreateWithdraw() {
    yield takeEvery(Types.CREATE_WITHDRAW_REQUEST, createWithdraw);
  }
  export default function* root() {
    yield all([
      watchgetDashboardAction(),
      watchpostSentEmailInvite(),
      fork(watchCreateWithdraw)
    ]);
  }
