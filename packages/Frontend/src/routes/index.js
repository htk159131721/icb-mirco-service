import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";
import pathRoute from "../constants/pathRoute"

import NotFound from './NotFound'

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route exact path={pathRoute.HOME} component={asyncComponent(() => import('components/Home'))}/>
      <Route path={pathRoute.PACKAGE} component={asyncComponent(() => import('components/Shop/Package'))}/>
      <Route path={pathRoute.COMBO} component={asyncComponent(() => import('components/Shop/Combo'))}/>
      <Route path={pathRoute.ORDER} component={asyncComponent(() => import('components/Transaction/Order'))}/>
      <Route path={pathRoute.PROFILE} component={asyncComponent(() => import('components/ProfileCus'))}/>
      <Route path={pathRoute.CART} component={asyncComponent(() => import('components/Cart'))}/>
      <Route path={pathRoute.REF_USER} component={asyncComponent(() => import('components/Referal'))}/>
      <Route path={pathRoute.NEWS} component={asyncComponent(() => import('components/News/List'))}/>
      <Route path={pathRoute.NEWS_DETAIL} component={asyncComponent(() => import('components/News/Detail'))}/>
      <Route path={pathRoute.LIST_COMMISSION} component={asyncComponent(() => import('components/Commission'))}/>
      <Route path={pathRoute.LIST_WITHDRAW} component={asyncComponent(() => import('components/Transaction/Withdraw'))}/>
      {/* <Route path={pathRoute.WALLET} component={asyncComponent(() => import('components/Wallet'))}/> */}
      <Route component={NotFound}/>
    </Switch>
  </div>
);

export default App;
