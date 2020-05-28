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
import * as SettingCommissionAction from "../actions/SettingCommissionAction";
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
import { API } from "./ApiSettingCommission";

/******************* CommissionPackage ****************/
function* getListCommissionPackage({ id }) {
  yield put(showLoader());
  try {
    const response = yield call(
      API.getListCommissionPackageFromApi,
      getCookie("token"),
      id
    );
    yield put(
      SettingCommissionAction.getListCommissionPackageSuccess(
        response.data.data
      )
    );
    yield put(hideLoader());
  } catch (error) {
    yield put(showMessError());
  }
}
function* createCommissionPackage({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.createCommissionPackageFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status === "success") {
      yield put(
        SettingCommissionAction.createCommissionPackageSuccess(
          response.data.data
        )
      );
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/******************* Commission Combo ****************/
function* getListCommissionCombo({ id }) {
  yield put(showLoader());
  try {
    const response = yield call(
      API.getListCommissionPackageFromApi,
      getCookie("token"),
      id
    );
    yield put(
      SettingCommissionAction.getListCommissionComboSuccess(response.data.data)
    );
    yield put(hideLoader());
  } catch (error) {
    yield put(showMessError());
  }
}
function* createCommissionCombo({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.createCommissionPackageFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(
        SettingCommissionAction.createCommissionComboSuccess(response.data.data)
      );
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/******************* Commission ****************/
function* getListCommission() {
  yield put(showLoader());
  try {
    const response = yield call(
      API.getListCommissionFromApi,
      getCookie("token")
    );
    if (response.data.status_code === 200) {
      yield put(
        SettingCommissionAction.getListCommissionSuccess(response.data.data)
      );
      yield put(hideLoader());
    } else yield put(showMessError(ERROR));
  } catch (error) {
    yield put(showMessError());
  }
}
function* updateCommission({ data }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(
      API.updateCommissionFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      yield put(
        SettingCommissionAction.updateCommissionSuccess(response.data.data)
      );
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/******************************Level Commission ******************************* */
function* getListLevelCommission() {
  yield put(showLoader());
  try {
    const response = yield call(
      API.getListLevelCommissionFromApi,
      getCookie("token")
    );
    if (response.data.status_code === 200) {
      yield put(
        SettingCommissionAction.getListLevelCommissionSuccess(
          response.data.data
        )
      );
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(showMessError());
  }
}

function* createLevelCommission({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.createLevelCommissionFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(
        SettingCommissionAction.createLevelCommissionSuccess(response.data.data)
      );
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* updateLevelCommission({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.updateLevelCommissionFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(
        SettingCommissionAction.updateLevelCommissionSuccess(response.data.data)
      );
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* deleteLevelCommission({ id }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(
      API.deleteLevelCommissionFromApi,
      getCookie("token"),
      id
    );
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      yield put(SettingCommissionAction.deleteLevelCommissionSuccess(id));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/******************************* Watcher ****************************************/
function* watchGetListCommissionPackage() {
  yield takeEvery(Types.GET_LIST_COMMISSION_PACKAGE, getListCommissionPackage);
}
function* watchCreateCommissionPackage() {
  yield takeLatest(Types.CREATE_COMMISSION_PACKAGE, createCommissionPackage);
}
function* watchGetListCommissionCombo() {
  yield takeEvery(Types.GET_LIST_COMMISSION_COMBO, getListCommissionCombo);
}
function* watchCreateCommissionCombo() {
  yield takeLatest(Types.CREATE_COMMISSION_COMBO, createCommissionCombo);
}
function* watchGetListCommission() {
  yield takeLatest(Types.GET_LIST_COMMISSION, getListCommission);
}
function* watchUpdateCommission() {
  yield takeLatest(Types.UPDATE_COMMISSION, updateCommission);
}
/****************** level cms ******************* */
function* watchGetListLevelCommission() {
  yield takeEvery(Types.GET_LIST_LEVEL_COMMISSION, getListLevelCommission);
}
function* watchCreateLevelCommission() {
  yield takeLatest(Types.CREATE_LEVEL_COMMISSION, createLevelCommission);
}
function* watchUpdateLevelCommission() {
  yield takeLatest(Types.UPDATE_LEVEL_COMMISSION, updateLevelCommission);
}
function* watchDeleteLevelCommission() {
  yield takeLatest(Types.DELETE_LEVEL_COMMISSION, deleteLevelCommission);
}
export default function* root() {
  yield all([
    fork(watchGetListCommission),
    fork(watchUpdateCommission),
    fork(watchGetListCommissionPackage),
    fork(watchCreateCommissionPackage),
    fork(watchGetListCommissionCombo),
    fork(watchCreateCommissionCombo),
    fork(watchGetListLevelCommission),
    fork(watchCreateLevelCommission),
    fork(watchUpdateLevelCommission),
    fork(watchDeleteLevelCommission)
  ]);
}
