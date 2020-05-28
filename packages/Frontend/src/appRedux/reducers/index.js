import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import GeneralReducer from './GeneralReducer'
import GeoraphyReducer from './GeoraphyReducer'
import UserReducer from './UserReducer'
import ShopReducer from './ShopReducer'
import OrderReducer from './OrderReducer'
import CartReducer from './CartReducer'
import DashboardReducer from './DashboardReducer'
import TransactionReducer from './TransactionReducer'
import NewsReducer from './NewsReducer'


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  UserReducer,
  GeneralReducer,
  TransactionReducer,
  ShopReducer,
  OrderReducer,
  CartReducer,
  NewsReducer,
  GeoraphyReducer,
  DashboardReducer
});

export default reducers;
