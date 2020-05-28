import { all, call, fork, put, takeEvery, takeLatest, delay } from "redux-saga/effects";
import {API} from './ApiUser'
import * as Types from '../../constants/ActionTypes'
import * as AuthAction from '../actions/Auth'
import {showMessError, hideLoader, showLoader, showLoadingBtn, hideLoadingBtn, showMessSuccess} from '../actions/GeneralAction'
import {setCookie, getCookie, delCookie} from '../../helpers/cookie' 
import {
  SUCCESSFULLY,
  ERROR
} from "../../util/messages";
// import {
//   auth,
//   facebookAuthProvider,
//   githubAuthProvider,
//   googleAuthProvider,
//   twitterAuthProvider
// } from "../../firebase/firebase";
// import {
//   SIGNIN_FACEBOOK_USER,
//   SIGNIN_GITHUB_USER,
//   SIGNIN_GOOGLE_USER,
//   SIGNIN_TWITTER_USER,
//   SIGNIN_USER,
//   SIGNOUT_USER,
//   SIGNUP_USER
// } from "constants/ActionTypes";
// import {
//   showAuthMessage,
//   userSignInSuccess,
//   userSignOutSuccess,
//   userSignUpSuccess
// } from "../../appRedux/actions/Auth";
// import {
//   userFacebookSignInSuccess,
//   userGithubSignInSuccess,
//   userGoogleSignInSuccess,
//   userTwitterSignInSuccess
// } from "../actions/Auth";
/*************************************** Theme's*************************************** */
// const createUserWithEmailPasswordRequest = async (email, password) =>
//   await auth
//     .createUserWithEmailAndPassword(email, password)
//     .then(authUser => authUser)
//     .catch(error => error);

// const signInUserWithEmailPasswordRequest = async (email, password) =>
//   await auth
//     .signInWithEmailAndPassword(email, password)
//     .then(authUser => authUser)
//     .catch(error => error);

// const signOutRequest = async () =>
//   await auth
//     .signOut()
//     .then(authUser => authUser)
//     .catch(error => error);

// const signInUserWithGoogleRequest = async () =>
//   await auth
//     .signInWithPopup(googleAuthProvider)
//     .then(authUser => authUser)
//     .catch(error => error);

// const signInUserWithFacebookRequest = async () =>
//   await auth
//     .signInWithPopup(facebookAuthProvider)
//     .then(authUser => authUser)
//     .catch(error => error);

// const signInUserWithGithubRequest = async () =>
//   await auth
//     .signInWithPopup(githubAuthProvider)
//     .then(authUser => authUser)
//     .catch(error => error);

// const signInUserWithTwitterRequest = async () =>
//   await auth
//     .signInWithPopup(twitterAuthProvider)
//     .then(authUser => authUser)
//     .catch(error => error);

// function* createUserWithEmailPassword({ payload }) {
//   const { email, password } = payload;
//   try {
//     const signUpUser = yield call(
//       createUserWithEmailPasswordRequest,
//       email,
//       password
//     );
//     if (signUpUser.message) {
//       yield put(showAuthMessage(signUpUser.message));
//     } else {
//       localStorage.setItem("user_id", signUpUser.user.uid);
//       yield put(userSignUpSuccess(signUpUser.user.uid));
//     }
//   } catch (error) {
//     yield put(showAuthMessage(error));
//   }
// }

// function* signInUserWithGoogle() {
//   try {
//     const signUpUser = yield call(signInUserWithGoogleRequest);
//     if (signUpUser.message) {
//       yield put(showAuthMessage(signUpUser.message));
//     } else {
//       localStorage.setItem("user_id", signUpUser.user.uid);
//       yield put(userGoogleSignInSuccess(signUpUser.user.uid));
//     }
//   } catch (error) {
//     yield put(showAuthMessage(error));
//   }
// }

// function* signInUserWithFacebook() {
//   try {
//     const signUpUser = yield call(signInUserWithFacebookRequest);
//     if (signUpUser.message) {
//       yield put(showAuthMessage(signUpUser.message));
//     } else {
//       localStorage.setItem("user_id", signUpUser.user.uid);
//       yield put(userFacebookSignInSuccess(signUpUser.user.uid));
//     }
//   } catch (error) {
//     yield put(showAuthMessage(error));
//   }
// }

// function* signInUserWithGithub() {
//   try {
//     const signUpUser = yield call(signInUserWithGithubRequest);
//     if (signUpUser.message) {
//       yield put(showAuthMessage(signUpUser.message));
//     } else {
//       localStorage.setItem("user_id", signUpUser.user.uid);
//       yield put(userGithubSignInSuccess(signUpUser.user.uid));
//     }
//   } catch (error) {
//     yield put(showAuthMessage(error));
//   }
// }

// function* signInUserWithTwitter() {
//   try {
//     const signUpUser = yield call(signInUserWithTwitterRequest);
//     if (signUpUser.message) {
//       if (signUpUser.message.length > 100) {
//         yield put(showAuthMessage("Your request has been canceled."));
//       } else {
//         yield put(showAuthMessage(signUpUser.message));
//       }
//     } else {
//       localStorage.setItem("user_id", signUpUser.user.uid);
//       yield put(userTwitterSignInSuccess(signUpUser.user.uid));
//     }
//   } catch (error) {
//     yield put(showAuthMessage(error));
//   }
// }

// function* signInUserWithEmailPassword({ payload }) {
//   const { email, password } = payload;
//   try {
//     const signInUser = yield call(
//       signInUserWithEmailPasswordRequest,
//       email,
//       password
//     );
//     if (signInUser.message) {
//       yield put(showAuthMessage(signInUser.message));
//     } else {
//       localStorage.setItem("user_id", signInUser.user.uid);
//       yield put(userSignInSuccess(signInUser.user.uid));
//     }
//   } catch (error) {
//     yield put(showAuthMessage(error));
//   }
// }

// function* signOut() {
//   try {
//     const signOutUser = yield call(signOutRequest);
//     if (signOutUser === undefined) {
//       localStorage.removeItem("user_id");
//       yield put(userSignOutSuccess(signOutUser));
//     } else {
//       yield put(showAuthMessage(signOutUser.message));
//     }
//   } catch (error) {
//     yield put(showAuthMessage(error));
//   }
// }

// export function* createUserAccount() {
//   yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
// }

// export function* signInWithGoogle() {
//   yield takeEvery(SIGNIN_GOOGLE_USER, signInUserWithGoogle);
// }

// export function* signInWithFacebook() {
//   yield takeEvery(SIGNIN_FACEBOOK_USER, signInUserWithFacebook);
// }

// export function* signInWithTwitter() {
//   yield takeEvery(SIGNIN_TWITTER_USER, signInUserWithTwitter);
// }

// export function* signInWithGithub() {
//   yield takeEvery(SIGNIN_GITHUB_USER, signInUserWithGithub);
// }

// export function* signInUser() {
  
//   yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
// }

// export function* signOutUser() {
//   yield takeEvery(SIGNOUT_USER, signOut);
// }
/* ************************************** Your self ************************************************ */
function* loginUser ({user}) {
  try {
    const request = yield API.loginAdmin(user)
    if(request.data.status === "success"){
      //login successfully
      sessionStorage.setItem("user_id", JSON.stringify(request.data.data))
      setCookie("token", request.data.data.token, 1);
      yield put(AuthAction.userSignInSuccess(request.data.data))
      yield put(hideLoader())
    } else {
      yield put(AuthAction.showAuthMessage(request.data.message))
    }
  } catch (error) {
    yield put(AuthAction.showAuthMessage(ERROR));
  }
}
function* signOut() {
  yield put(showLoader())
  try {
    const signOutUser = yield API.signOutAdmin(getCookie('token'));
    if (signOutUser.data.status === 'success') {
      sessionStorage.removeItem("user_id");
      delCookie('token');
      yield put(AuthAction.userSignOutSuccess(signOutUser));
    } else {
      sessionStorage.removeItem("user_id");
      delCookie('token');
      yield put(AuthAction.userSignOutSuccess(signOutUser));
    }
    yield put(hideLoader())
  } catch (error) {
    yield put(AuthAction.showAuthMessage(error));
  }
}
function* getForgotPassword({ data }) {
  yield put(showLoadingBtn());
  try {
    yield delay(500);
    const request = yield call(API.getForgotPasswordFromApi, data);
    yield put(hideLoadingBtn());
    if (request.data.status_code === 200) {
      yield put(AuthAction.getForgotPWSuccess(request.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(request.data.message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
function* setNewPassword({ data }) {
  yield put(showLoader());
  try {
    yield delay(500);
    const request = yield call(API.setNewPasswordFromApi, data);
    yield put(hideLoader());
    if (request.data.status_code === 200) {
      yield put(AuthAction.getForgotPWSuccess(request.data.data));
      yield put(showMessSuccess(SUCCESSFULLY));
    } else {
      yield put(showMessError(request.data.message));
    }
  } catch (error) {
    yield put(showMessError(ERROR));
  }
}
/*************************************Export******************************** */
function* watchSignOutUser() {
  yield takeLatest(Types.SIGNOUT_USER, signOut);
}
function* watchLoginUser () {
  yield takeEvery(Types.SIGNIN_USER, loginUser)
}
export function* watchGetForgotPassword() {
  yield takeLatest(Types.GET_FORGOT_PW, getForgotPassword);
}
export function* watchSetNewPassword() {
  yield takeLatest(Types.SET_NEW_PASSWORD, setNewPassword);
}
export default function* rootSaga() {
  yield all([
    // fork(signInUser),
    // fork(createUserAccount),
    // fork(signInWithGoogle),
    // fork(signInWithFacebook),
    // fork(signInWithTwitter),
    // fork(signInWithGithub),
    fork(watchSignOutUser),
    fork(watchLoginUser),
    fork(watchGetForgotPassword),
    fork(watchSetNewPassword)
  ]);
}
