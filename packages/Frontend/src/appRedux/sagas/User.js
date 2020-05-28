import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  delay
} from "redux-saga/effects";
import { API } from "./ApiUser";
import * as Types from "../../constants/ActionTypes";
import * as UserAction from "../actions/UserAction";
import {deleteAllCart, deletePromotion} from "../actions/CartAction"
import {
  showMessError,
  showNotification,
  hideLoader,
  showLoader,
  showLoadingBtn,
  hideLoadingBtn,
  showMessSuccess,
  showModalDynamic,
  hideMessSuccess
} from "../actions/GeneralAction";
import { setCookie, getCookie, delCookie } from "../../helpers/cookie";
import {
  SUCCESSFULLY,
  ERROR,
  CHANGE_PASSWORD_SUCCESS,
  OLD_PASSWORD_WRONG,
  USERNAME_ALLREADY,
  EMAIL_ALLREADY,
  ACCOUNT_NOT_CORRECT
} from "../../constants/messages";

function* signupUser({ data }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(API.signupUserFromAPI, data);
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      //login successfully
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      let message;
      if (response.data.data.length > 0) {
        switch (response.data.data[0].field) {
          case "username":
            message = USERNAME_ALLREADY;
            break;
          case "email":
            message = EMAIL_ALLREADY;
            break;
          default:
            message = response.data.data.message;
            break;
        }
      }
      yield put(showMessError(message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* loginUser({ user }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield API.loginUser(user);
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      //login successfully
      if(response.data.data){
        sessionStorage.setItem("USER_INF", JSON.stringify(response.data.data));
        setCookie("token", response.data.data.token, 1);
        yield put(UserAction.userSignInSuccess(response.data.data));
      }
    } else {
      yield put(showMessError(response.data.message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* activeAccount({ data }) {
  try {
    const response = yield call(API.activeAccountFromAPI, data);
    if (response.data.status_code === 200) {
      //login successfully
      sessionStorage.setItem("USER_INF", JSON.stringify(response.data.data));
      setCookie("token", response.data.data.token, 1);
      yield put(UserAction.userSignInSuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(response.data.message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* signOut() {
  yield put(showLoader());
  try {
    const signOutUser = yield call(API.signOutUser, getCookie("token"));
      sessionStorage.removeItem("USER_INF");
      delCookie("token");
      yield put(UserAction.userSignOutSuccess(signOutUser));
      yield put(deleteAllCart())
      yield put(deletePromotion())
      yield put(hideLoader());
  } catch (error) {
    yield put(showMessError(error));
  }
}
function* getForgotPassword({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(API.getForgotPW, data);
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(UserAction.getForgotPWSuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
      yield put(hideMessSuccess())
    } else {
      yield put(showMessError(response.data.message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* setNewPassword({ data }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(API.setNewPW, data);
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      yield put(UserAction.getForgotPWSuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
      yield put(hideMessSuccess())
    } else {
      yield put(showMessError("The token has expired"));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* getReferal() {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(API.getReferalFromAPI, getCookie("token"));
    if (response.data.status_code === 200) {
      yield put(UserAction.getReferalSuccess(response.data.data));
      yield put(hideLoader());
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* updateProfile({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.updateProfileFromAPI,
      getCookie("token"),
      data
    );
    if (response.data.status_code === 200) {
      sessionStorage.setItem("USER_INF", JSON.stringify(response.data.data));
      yield put(UserAction.updateProfileSuccess(response.data.data));
      yield put(showModalDynamic("modalUpdateInfo", false))
    } else {
      yield put(showMessError(ERROR));
    }
    yield put(hideLoadingBtn());
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* changePassword({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.changePasswordFromAPI,
      getCookie("token"),
      data
    );
    if (response.data.status_code === 200) {
      yield put(showMessSuccess(CHANGE_PASSWORD_SUCCESS));
      yield put(showModalDynamic("modalChangePassword", false))
    } else if (response.data.status_code === 404){
      yield put(showMessError(OLD_PASSWORD_WRONG));
    } else {
      yield put(showMessError(ERROR));
    }
    yield put(hideLoadingBtn());
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/**
 * @memberof Bank Manager
 * @summary CRUD bank
 */

function* getListBank() {
  yield put(showLoader());
  try {
    const response = yield call(API.getListBankFromApi, getCookie("token"));
    yield put(UserAction.getListBankSuccess(response.data.data));
    yield put(hideLoader());
  } catch (error) {
    yield put(showMessError(error));
  }
}
function* createBank({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(API.createBankFromApi, getCookie("token"), data);
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(UserAction.createBankSuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* updateBank({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(API.updateBankFromApi, getCookie("token"), data);
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(UserAction.updateBankSuccess(response.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* deleteBank({ id }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(API.deleteBankFromApi, getCookie("token"), id);
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      yield put(UserAction.deleteBankSuccess(id));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/*************************************User******************************** */
function* watchSignOutUser() {
  yield takeLatest(Types.SIGNOUT_USER, signOut);
}
function* watchLoginUser() {
  yield takeEvery(Types.SIGNIN_USER, loginUser);
}
function* watchSignupUser() {
  yield takeEvery(Types.SIGNUP_USER, signupUser);
}
function* watchGetForgotPassword() {
  yield takeLatest(Types.GET_FORGOT_PW, getForgotPassword);
}
function* watchGetReferal() {
  yield takeLatest(Types.GET_REFERAL, getReferal);
}
function* watchSetNewPassword() {
  yield takeLatest(Types.SET_NEW_PASSWORD, setNewPassword);
}
function* watchActiveAccount() {
  yield takeLatest(Types.ACTIVE_ACCOUNT, activeAccount);
}
function* watchUpdateProfile() {
  yield takeLatest(Types.UPDATE_PROFILE, updateProfile);
}
function* watchChangePassword() {
  yield takeLatest(Types.CHANGE_PASSWORD, changePassword);
}
/*************************************Bank******************************** */
function* watchGetListBank() {
  yield takeEvery(Types.GET_LIST_BANK_MANAGER, getListBank);
}
function* watchCreateBank() {
  yield takeLatest(Types.CREATE_BANK_MANAGER, createBank);
}
function* watchUpdateBank() {
  yield takeLatest(Types.UPDATE_BANK_MANAGER, updateBank);
}
function* watchDeleteBank() {
  yield takeLatest(Types.DELETE_BANK_MANAGER, deleteBank);
}
export default function* rootSaga() {
  yield all([
    fork(watchSignOutUser),
    fork(watchLoginUser),
    fork(watchGetForgotPassword),
    fork(watchSetNewPassword),
    fork(watchActiveAccount),
    fork(watchSignupUser),
    fork(watchUpdateProfile),
    fork(watchGetReferal),
    fork(watchChangePassword),
    /************** bank ********** */
    fork(watchGetListBank),
    fork(watchCreateBank),
    fork(watchUpdateBank),
    fork(watchDeleteBank)
  ]);
}
