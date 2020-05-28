import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import GeneralReducer from "./GeneralReducer";
import UserReducer from "./UserReducer";
import PackageReducer from "./PackageReducer";
import CatePackageReducer from "./CatePackageReducer";
import SettingReducer from "./SettingReducer";
import GeoraphyReducer from "./GeoraphyReducer";
import CustomerReducer from "./CustomerReducer";
import PermissionReducer from "./PermissionReducer";
import RoleReducer from "./RoleReducer";
import AgencyReducer from "./AgencyReducer";
import OrderReducer from "./OrderReducer";
import ReportReducer from "./ReportReducer";
import PromotionReducer from "./PromotionReducer";
import ComboReducer from "./ComboReducer";
import SettingCommissionReducer from "./SettingCommissionReducer";
import ReceiptReducer from "./ReceiptReducer";
import CommissionReducer from "./CommissionReducer";
import CurrencyReducer from "./CurrencyReducer";
import NewsReducer from "./NewsReducer"

const reducers = combineReducers({
  auth: Auth,
  AgencyReducer,
  ComboReducer,
  CatePackageReducer,
  CustomerReducer,
  CommissionReducer,
  CurrencyReducer,
  generalReducer: GeneralReducer,
  GeoraphyReducer,
  NewsReducer,
  UserReducer,
  OrderReducer,
  PermissionReducer,
  PackageReducer,
  PromotionReducer,
  routing: routerReducer,
  RoleReducer,
  ReportReducer,
  ReceiptReducer,
  settings: Settings,
  SettingCommissionReducer,
  SettingReducer
});

export default reducers;
