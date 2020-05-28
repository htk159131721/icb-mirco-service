import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";
import pathRoute from "constants/pathRoute"

import NotFound from './NotFound'

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route exact path={pathRoute.ADMIN} component={asyncComponent(() => import('./Dashboard'), "dashboardView")}/>
      <Route path={pathRoute.CUSTOMER} component={asyncComponent(() => import('components/Customer'), "customerView")}/>
      <Route path={pathRoute.COMBO} component={asyncComponent(() => import('components/Sales/Combo'), "comboView")}/>
      <Route path={pathRoute.USER} component={asyncComponent(() => import('components/Users'), "userView")}/>
      <Route path={pathRoute.ROLE} component={asyncComponent(() => import('components/Roles'), "userRoleView")}/>
      <Route path={pathRoute.REFERAL} component={asyncComponent(() => import('components/Referal'), "dashboardView")}/>
      <Route path={pathRoute.PROMOTION} component={asyncComponent(() => import('components/Promotion'), "promotionView")}/>
      <Route path={pathRoute.SALE_REPORT} component={asyncComponent(() => import('components/Report/SaleReport'), "reportView")}/>
      <Route path={pathRoute.PAYMENT_REPORT} component={asyncComponent(() => import('components/Report/PaymentReport'), "reportView")}/>
      <Route path={pathRoute.COMMISSION_REPORT} component={asyncComponent(() => import('components/Report/CommissionReport'), "reportView")}/>
      <Route path={pathRoute.WITHDRAW_REPORT} component={asyncComponent(() => import('components/Report/WithdrawReport'), "reportView")}/>
      <Route path={pathRoute.PARTNER_REPORT} component={asyncComponent(() => import('components/Report/PartnerReport'), "reportView")}/>
      <Route path={pathRoute.PACKAGE_REPORT} component={asyncComponent(() => import('components/Report/PackageReport'), "reportView")}/>
      {/* not rule */}
      <Route path={pathRoute.LIST_COMMISSION} component={asyncComponent(() => import('components/Commission/List'), "salePackageView")}/>
      <Route path={pathRoute.SETTING_LEVEL_COMMISSION} component={asyncComponent(() => import('components/Commission/Level'), "salePackageView")}/>
      {/* not role */} 
      <Route path={pathRoute.COMMISSION_PACKAGE} component={asyncComponent(() => import('components/Sales/Commission/Package'), "dashboardView")}/>
      <Route path={pathRoute.COMMISSION_COMBO} component={asyncComponent(() => import('components/Sales/Commission/Combo'), "dashboardView")}/>
      {/* not role */} 
      <Route path={pathRoute.NEWS} component={asyncComponent(() => import('components/News'), "dashboardView")}/>
      <Route path={pathRoute.EXCHANGE_CURRENCY} component={asyncComponent(() => import('components/Currency'), "exchangeRateView")}/>
      <Route exact path={pathRoute.ORDER} component={asyncComponent(() => import('components/Sales/Order'), "saleOrderView")}/>
      <Route path={pathRoute.CREATE_ORDER} component={asyncComponent(() => import('components/Sales/Order/FormOrder'), "saleOrderCreate")}/>
      <Route path={pathRoute.PACKAGE} component={asyncComponent(() => import('components/Sales/Package/Main'), "salePackageView")}/>
      <Route path={pathRoute.CATE_PACKAGE} component={asyncComponent(() => import('components/Sales/Package/CategoryPackage'), "salePackageCategoryView")}/>
      <Route path={pathRoute.AGENCY} component={asyncComponent(() => import('components/Agency'), "agencyView")}/>
      <Route path={pathRoute.SETTING_PAYMENT} component={asyncComponent(() => import('components/Settings/Payment'), "settingPaymentView")}/> 
      <Route path={pathRoute.SETTING_SYSTEM} component={asyncComponent(() => import('components/Settings/System'), "settingSystemView")}/>
      {/* not role */}
      <Route path={pathRoute.RECEIPT} component={asyncComponent(() => import('components/Receipt'), "settingSystemView")}/>
      {/* <Route path='/register' component={asyncComponent(() => import('components/Customer/TestUserFE'), "customerView")}/> */}
      <Route component={NotFound}/>
    </Switch>
  </div>
);

export default App;
