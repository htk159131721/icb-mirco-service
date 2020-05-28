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
import * as CustomerAction from "../actions/CustomerAction";
import {userSignOut} from "../actions/Auth"
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
  USERNAME_ALLREADY,
  EMAIL_ALLREADY,
  TOKEN_EXPRITED
} from "../../util/messages";
import { getCookie } from "../../helpers/cookie";
import { API } from "./ApiCustomer";

function* getListCustomer() {
  yield put(showLoader());
  try {
    const response = yield call(API.getListCustomerFromApi, getCookie("token"));
    if(response.data.status_code === 200){
      yield put(CustomerAction.getListCustomerSuccess(response.data.data));
      yield put(hideLoader());
    } else if(response.data.status_code === 404){
      yield put(showMessError(TOKEN_EXPRITED))
      yield delay(1000, true)
      yield put(userSignOut())
    } else {
      yield put(showMessError(ERROR))
    }
  } catch (error) {
    yield put(showMessError(error));
  }
}
function* getListRef() {
  yield put(showLoader());
  try {
    const response = yield call(API.getListRefFromApi, getCookie("token"));
    yield put(CustomerAction.getListRefSuccess(response.data.data));
    yield put(hideLoader());
  } catch (error) {
    yield put(showMessError(error));
  }
}
function* createCustomer({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.createCustomerFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(CustomerAction.createCustomerSuccess(response.data.data));
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
function* updateCustomer({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const response = yield call(
      API.updateCustomerFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoadingBtn());
    if (response.data.status_code === 200) {
      yield put(CustomerAction.updateCustomerSuccess(response.data.data));
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
      } else {
        message = response.data.message;
      }
      yield put(showMessError(message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* deleteCustomer({ id }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(
      API.deleteCustomerFromApi,
      getCookie("token"),
      id
    );
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      yield put(CustomerAction.deleteCustomerSuccess(id));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}

function* updateStatusCustomer({ data }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const response = yield call(
      API.updateStatusCustomerFromApi,
      getCookie("token"),
      data
    );
    yield put(hideLoader());
    if (response.data.status_code === 200) {
      yield put(CustomerAction.updateStatusCustomerSuccess(data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(ERROR));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/****************************************Watcher****************************** */
export function* watchGetListCustomer() {
  yield takeEvery(Types.GET_LIST_CUSTOMER, getListCustomer);
}
export function* watchGetListRef() {
  yield takeEvery(Types.GET_LIST_REF, getListRef);
}
export function* watchCreateCustomer() {
  yield takeLatest(Types.CREATE_CUSTOMER, createCustomer);
}
export function* watchUpdateCustomer() {
  yield takeLatest(Types.UPDATE_CUSTOMER, updateCustomer);
}
export function* watchDeleteCustomer() {
  yield takeLatest(Types.DELETE_CUSTOMER, deleteCustomer);
}
export function* watchUpdateStatusCustomer() {
  yield takeLatest(Types.UPDATE_STATUS_CUSTOMER, updateStatusCustomer);
}
export default function* root() {
  yield all([
    watchGetListCustomer(),
    watchCreateCustomer(),
    watchUpdateCustomer(),
    watchDeleteCustomer(),
    watchGetListRef(),
    watchUpdateStatusCustomer()
  ]);
}
