import {all} from "redux-saga/effects"
//import AuthSagas from "./Auth"
import UserSagas from './User'
import GeoraphySagas from './Georaphy'
import ShopSagas from './Shop'
import OrderSagas from './Order'
import CartSagas from './Cart'
import DashboardSagas from './Dashboard'
import TransactionSagas from './Transaction'
import NewsSagas from './News'

export default function* rootSaga() {
  yield all([
    UserSagas(),
    GeoraphySagas(),
    ShopSagas(),
    TransactionSagas(),
    NewsSagas(),
    CartSagas(),
    DashboardSagas(),
    OrderSagas()
  ]);
}
