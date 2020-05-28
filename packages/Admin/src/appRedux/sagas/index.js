import {all} from "redux-saga/effects"
import AuthSagas from "./Auth"
import UserSagas from './User'
import PackageSagas from './Package'
import CatePackage from './CatePackage'
import SettingSystem from './SettingSystem'
import Georaphy from './Georaphy'
import Customer from './Customer'
import Permission from './Permission'
import Role from './Role'
import Order from './Order'
import Report from './Report'
import Agency from './Agency'
import Combo from './Combo'
import Promotion from './Promotion'
import SettingCommission from './SettingCommission'
import Receipt from './Receipt'
import Currency from './Currency'
import News from "./News"

export default function* rootSaga() {
  yield all([
    AuthSagas(),
    UserSagas(),
    PackageSagas(),
    CatePackage(),
    SettingSystem(),
    Agency(),
    News(),
    Currency(),
    Combo(),
    Report(),
    Customer(),
    Permission(),
    SettingCommission(),
    Promotion(),
    Role(),
    Order(),
    Receipt(),
    Georaphy()
  ]);
}
