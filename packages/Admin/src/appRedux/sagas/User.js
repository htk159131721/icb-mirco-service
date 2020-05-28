import {
  all,
  put,
  call,
  takeLatest,
  delay
} from "redux-saga/effects";
import * as Types from "../../constants/ActionTypes";
import * as UserAction from "../actions/UserActions";
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
import { API } from "./ApiUser";

function* getListUser() {
  try {
    const request = yield call(API.getListUserFromApi, getCookie("token"));
    yield put(UserAction.getListUserSuccess(request.data.data));
  } catch (error) {
    yield put(UserAction.getListUserSuccess(error));
  }
}
function* getUserProfile() {
  try {
    const request = yield call(API.getUserProfile, getCookie("token"));
    yield put(UserAction.getProfileSuccess(request.data.data));
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* createUser({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const request = yield call(API.createUserFromApi, getCookie("token"), data);
    yield put(hideLoadingBtn());
    if (request.data.status === "success") {
      yield put(
        UserAction.createUserSuccess(request.data.data, data.get("role_id"))
      );
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      let message;
      if (request.data.data.length > 0) {
        switch (request.data.data[0].field) {
          case "username":
            message = USERNAME_ALLREADY;
            break;
          case "email":
            message = EMAIL_ALLREADY;
            break;
          default:
            message = request.data.data.message;
            break;
        }
      }
      yield put(showMessError(message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* updateUser({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const request = yield call(API.updateUserFromApi, getCookie("token"), data);
    yield put(hideLoadingBtn());
    if (request.data.status === "success") {
      yield put(
        UserAction.updateUserSuccess(request.data.data, data.get("role_id"))
      );
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      let message;
      if (request.data.data.length > 0) {
        switch (request.data.data[0].field) {
          case "username":
            message = USERNAME_ALLREADY;
            break;
          case "email":
            message = EMAIL_ALLREADY;
            break;
          default:
            message = request.data.data.message;
            break;
        }
      }
      yield put(showMessError(message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* deleteUser({ id }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const request = yield call(API.deleteUserFromApi, getCookie("token"), id);
    yield put(hideLoader());
    if (request.data.status === "success") {
      yield put(UserAction.deleteUserSuccess(id));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

/*************************************** Watcher*********************************************/
function* watchGetUserProfile() {
  yield takeLatest(Types.GET_PROFILE, getUserProfile);
}
function* watchGetListUser() {
  yield takeLatest(Types.GET_LIST_USER, getListUser);
}
export function* watchCreateUser() {
  yield takeLatest(Types.CREATE_USER, createUser);
}
export function* watchUpdateUser() {
  yield takeLatest(Types.UPDATE_USER, updateUser);
}
export function* watchDeleteUser() {
  yield takeLatest(Types.DELETE_USER, deleteUser);
}

export default function* rootUser() {
  yield all([
    watchGetListUser(),
    watchGetUserProfile(),
    watchCreateUser(),
    watchUpdateUser(),
    watchDeleteUser()
  ]);
}
