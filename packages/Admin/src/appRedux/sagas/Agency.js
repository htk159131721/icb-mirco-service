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
import * as AgencyAction from "../actions/AgencyAction";
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
import { API } from "./ApiAgency";

function* getListAgency() {
  try {
    const request = yield call(API.getListAgencyFromApi, getCookie("token"));
    yield put(AgencyAction.getListAgencySuccess(request.data.data));
  } catch (error) {
    yield put(AgencyAction.getListAgencySuccess(error));
  }
}

function* createAgency({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(1000);
    const request = yield call(API.createAgencyFromApi, getCookie("token"), data);
    yield put(hideLoadingBtn());
    if (request.data.status_code === 200) {
      yield put(
        AgencyAction.createAgencySuccess(request.data.data)
      );
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(request.data.message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* updateAgency({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(1000);
    const request = yield call(API.updateAgencyFromApi, getCookie("token"), data);
    yield put(hideLoadingBtn());
    if (request.data.status_code === 200) {
      yield put(
        AgencyAction.updateAgencySuccess(request.data.data)
      );
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(request.data.message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* deleteAgency({ id }) {
  yield put(showLoader());
  try {
    yield delay(1000);
    const request = yield call(API.deleteAgencyFromApi, getCookie("token"), id);
    yield put(hideLoader());
    if (request.data.status === "success") {
      yield put(AgencyAction.deleteAgencySuccess(id));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

/*************************************** Watcher*********************************************/
function* watchGetListAgency() {
  yield takeLatest(Types.GET_LIST_AGENCY, getListAgency);
}
export function* watchCreateAgency() {
  yield takeLatest(Types.CREATE_AGENCY, createAgency);
}
export function* watchUpdateAgency() {
  yield takeLatest(Types.UPDATE_AGENCY, updateAgency);
}
export function* watchDeleteAgency() {
  yield takeLatest(Types.DELETE_AGENCY, deleteAgency);
}

export default function* rootAgency() {
  yield all([
    fork(watchGetListAgency),
    fork(watchCreateAgency),
    fork(watchUpdateAgency),
    fork(watchDeleteAgency)
  ]);
}
