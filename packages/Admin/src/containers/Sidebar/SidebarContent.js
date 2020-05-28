import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link, Route, NavLink } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import pathRoute from "constants/pathRoute";
import Auxiliary from "util/Auxiliary";
import { Permission } from "util/Permission";

import UserProfile from "./UserProfile";
import SidebarLogo from "./SidebarLogo";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const MenuLink = ({ key, idLabel, icon, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        let active = match ? "ant-menu-item-selected" : "";
        return (
          <li
            key={key}
            className={`ant-menu-item ${active}`}
            style={{ paddingLeft: "24px" }}
          >
            <NavLink to={to}>
              <i className={`icon icon-${icon}`} />
              <IntlMessages id={idLabel} />
            </NavLink>
          </li>
        );
      }}
    />
  );
};

class SidebarContent extends Component {
  getNoHeaderClass = navStyle => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = navStyle => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const { themeType, navStyle, pathname, authUser } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split("/")[1];
    return (
      <Auxiliary>
        <SidebarLogo />
        <div className="gx-sidebar-content">
          <div
            className={`gx-sidebar-notifications ${this.getNoHeaderClass(
              navStyle
            )}`}
          >
            <UserProfile />
            <AppsNavigation />
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
              mode="inline"
            >
              <MenuItemGroup
                key="main"
                className="gx-menu-group"
                title={<IntlMessages id="sidebar.main" />}
              >
                {Permission("dashboardView", authUser.permissions) ? (
                  <MenuLink
                    key="dashboard"
                    idLabel="sidebar.dashboard"
                    icon="dasbhoard"
                    to={pathRoute.ADMIN}
                    activeOnlyWhenExact={true}
                  />
                ) : null}
                {Permission("saleOrderView", authUser.permissions) ||
                Permission("salePackageView", authUser.permissions) ||
                Permission("comboView", authUser.permissions) ? (
                  <SubMenu
                    key="sale"
                    className={this.getNavStyleSubMenuClass(navStyle)}
                    title={
                      <span>
                        <i className="icon icon-chart" />
                        <IntlMessages id="sidebar.sales" />
                      </span>
                    }
                  >
                    {Permission("saleOrderView", authUser.permissions) ? (
                      <MenuLink
                        key="sale/orders"
                        idLabel="sidebar.sales.orders"
                        icon="copy"
                        to={pathRoute.ORDER}
                        activeOnlyWhenExact={false}
                      />
                    ) : null}

                    {Permission("salePackageView", authUser.permissions) ? (
                      <MenuLink
                        key="sale/packages"
                        idLabel="sidebar.sales.packages"
                        icon="product-grid"
                        to={pathRoute.PACKAGE}
                        activeOnlyWhenExact={false}
                      />
                    ) : null}
                    {Permission("comboView", authUser.permissions) ? (
                      <MenuLink
                        key="sale/combo"
                        idLabel="sidebar.sales.combo"
                        icon="basic-calendar"
                        to={pathRoute.COMBO}
                        activeOnlyWhenExact={false}
                      />
                    ) : null}
                    {Permission("promotionView", authUser.permissions) ? (
                      <MenuLink
                        key="promotion"
                        idLabel="sidebar.promotion"
                        icon="etherium"
                        to={pathRoute.PROMOTION}
                        activeOnlyWhenExact={false}
                      />
                    ) : null}
                    {Permission("promotionView", authUser.permissions) ? (
                      <MenuLink
                        key="receipts"
                        idLabel="sidebar.receipts"
                        icon="select"
                        to={pathRoute.RECEIPT}
                        activeOnlyWhenExact={false}
                      />
                    ) : null}
                  </SubMenu>
                ) : null}

                {Permission("dashboardView", authUser.permissions) ? (
                  <MenuLink
                    key="list/commission"
                    idLabel="sidebar.listcommission"
                    icon="anchor"
                    to={pathRoute.LIST_COMMISSION}
                    activeOnlyWhenExact={false}
                  />
                ) : null}

                {/* {Permission("agencyView", authUser.permissions) ? (
                  <MenuLink
                    key="agency"
                    idLabel="sidebar.agency"
                    icon="map-street-view"
                    to={pathRoute.AGENCY}
                    activeOnlyWhenExact={false}
                  />
                ) : null} */}

                {Permission("customerView", authUser.permissions) ? (
                  <MenuLink
                    key="customer"
                    idLabel="sidebar.customer"
                    icon="profile"
                    to={pathRoute.CUSTOMER}
                    activeOnlyWhenExact={false}
                  />
                ) : null}

                {/* {Permission("dashboardView", authUser.permissions) ? (
                  <MenuLink
                    key="news"
                    idLabel="sidebar.news"
                    icon="ckeditor"
                    to={pathRoute.NEWS}
                    activeOnlyWhenExact={false}
                  />
                ) : null} */}

                {Permission("settingPaymentView", authUser.permissions) ||
                Permission("settingSystemView", authUser.permissions) ? (
                  <SubMenu
                    key="settings"
                    className={this.getNavStyleSubMenuClass(navStyle)}
                    title={
                      <span>
                        <i className="icon icon-setting" />
                        <IntlMessages id="sidebar.setting" />
                      </span>
                    }
                  >
                    {Permission("dashboardView", authUser.permissions) ? (
                      <MenuLink
                        key="level/commission"
                        idLabel="sidebar.levelcommission"
                        icon="crm"
                        to={pathRoute.SETTING_LEVEL_COMMISSION}
                        activeOnlyWhenExact={false}
                      />
                    ) : null}

                    {Permission("exchangeRateView", authUser.permissions) ? (
                      <MenuLink
                        key="exchange"
                        idLabel="sidebar.exchange"
                        icon="revenue-new"
                        to={pathRoute.EXCHANGE_CURRENCY}
                        activeOnlyWhenExact={false}
                      />
                    ) : null}

                    {Permission("settingPaymentView", authUser.permissions) ? (
                      <MenuLink
                        key="setting/payment"
                        idLabel="sidebar.setting.payment"
                        icon="select"
                        to={pathRoute.SETTING_PAYMENT}
                        activeOnlyWhenExact={false}
                      />
                    ) : null}

                    {Permission("settingSystemView", authUser.permissions) ? (
                      <MenuLink
                        key="setting/system"
                        idLabel="sidebar.setting.system"
                        icon="extra-components"
                        to={pathRoute.SETTING_SYSTEM}
                        activeOnlyWhenExact={false}
                      />
                    ) : null}
                    {Permission("userView", authUser.permissions) ||
                    Permission("userRoleView", authUser.permissions) ? (
                      <SubMenu
                        key="user"
                        className={this.getNavStyleSubMenuClass(navStyle)}
                        title={
                          <span>
                            <i className="icon icon-user" />
                            <IntlMessages id="sidebar.user" />
                          </span>
                        }
                      >
                        {Permission("userView", authUser.permissions) ? (
                          <MenuLink
                            key="user-manage"
                            idLabel="sidebar.user"
                            icon="wall"
                            to={pathRoute.USER}
                            activeOnlyWhenExact={false}
                          />
                        ) : null}

                        {Permission("userRoleView", authUser.permissions) ? (
                          <MenuLink
                            key="roles"
                            idLabel="sidebar.user.roles"
                            icon="basic-calendar"
                            to={pathRoute.ROLE}
                            activeOnlyWhenExact={false}
                          />
                        ) : null}
                        <MenuLink
                          key="referal"
                          idLabel="sidebar.referal"
                          icon="family"
                          to={pathRoute.REFERAL}
                          activeOnlyWhenExact={false}
                        />
                      </SubMenu>
                    ) : null}
                  </SubMenu>
                ) : null}

                {Permission("reportView", authUser.permissions) ? (
                  <SubMenu
                    key="report"
                    className={this.getNavStyleSubMenuClass(navStyle)}
                    title={
                      <span>
                        <i className="icon icon-apps" />
                        <IntlMessages id="sidebar.report" />
                      </span>
                    }
                  >
                    <MenuLink
                      key="sale-report"
                      idLabel="sidebar.report.sale"
                      icon="data-display"
                      to={pathRoute.SALE_REPORT}
                      activeOnlyWhenExact={false}
                    />

                    <MenuLink
                      key="payment-report"
                      idLabel="sidebar.report.payment"
                      icon="chart-pie"
                      to={pathRoute.PAYMENT_REPORT}
                      activeOnlyWhenExact={false}
                    />

                    <MenuLink
                      key="commission-report"
                      idLabel="sidebar.report.commission"
                      icon="orders"
                      to={pathRoute.COMMISSION_REPORT}
                      activeOnlyWhenExact={false}
                    />

                    <MenuLink
                      key="withdraw-report"
                      idLabel="sidebar.report.withdraw"
                      icon="forward"
                      to={pathRoute.WITHDRAW_REPORT}
                      activeOnlyWhenExact={false}
                    />
                    <MenuLink
                      key="partner-report"
                      idLabel="sidebar.report.partner"
                      icon="team"
                      to={pathRoute.PARTNER_REPORT}
                      activeOnlyWhenExact={false}
                    />
                    <MenuLink
                      key="package-report"
                      idLabel="sidebar.report.package"
                      icon="ticket-new"
                      to={pathRoute.PACKAGE_REPORT}
                      activeOnlyWhenExact={false}
                    />
                  </SubMenu>
                ) : null}
              </MenuItemGroup>
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings, auth }) => {
  const { navStyle, themeType, locale, pathname } = settings,
    { authUser } = auth;
  return {
    authUser,
    navStyle,
    themeType,
    locale,
    pathname
  };
};
export default connect(mapStateToProps)(SidebarContent);
