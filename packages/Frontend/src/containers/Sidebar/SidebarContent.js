import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link, Route, NavLink } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import pathRoute from "../../constants/pathRoute";
import Auxiliary from "util/Auxiliary";
import { Permission } from "util/Permission";

import UserProfile from "components/User/UserLogo/LogoWidthLG";
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
            {/* <AppsNavigation /> */}
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              // style={{background: "#038fde", color: "#fff"}}
              theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
              mode="inline"
            >
              {/* <MenuItemGroup
                key="main"
                className="gx-menu-group"
                title={<IntlMessages id="sidebar.main" />}
              > */}
              <MenuLink
                key="dashboard"
                idLabel="sidebar.dashboard"
                icon="dasbhoard"
                to={pathRoute.HOME}
                activeOnlyWhenExact={true}
              />
              {/* <MenuLink
                key="wallet"
                idLabel="sidebar.wallet"
                icon="tab"
                to={pathRoute.WALLET}
                activeOnlyWhenExact={true}
              /> */}
              <SubMenu
                key="transaction"
                className={this.getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>
                    <i className="icon icon-chart" />
                    <IntlMessages id="sidebar.transaction" />
                  </span>
                }
              >
                <MenuLink
                  key="transaction/orders"
                  idLabel="sidebar.transaction.orders"
                  icon="copy"
                  to={pathRoute.ORDER}
                  activeOnlyWhenExact={false}
                />
                <MenuLink
                  key="transaction/commission"
                  idLabel="sidebar.transaction.commissions"
                  icon="anchor"
                  to={pathRoute.LIST_COMMISSION}
                  activeOnlyWhenExact={false}
                />
                <MenuLink
                  key="transaction/withdraw"
                  idLabel="sidebar.transaction.withdraws"
                  icon="forward"
                  to={pathRoute.LIST_WITHDRAW}
                  activeOnlyWhenExact={false}
                />
              </SubMenu>
              <MenuLink
                key="refuser"
                idLabel="sidebar.refuser"
                icon="map-street-view"
                to={pathRoute.REF_USER}
                activeOnlyWhenExact={false}
              />
              <SubMenu
                key="shop"
                className={this.getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>
                    <i className="icon icon-shopping-cart" />
                    <IntlMessages id="sidebar.shop" />
                  </span>
                }
              >
                <MenuLink
                  key="combo"
                  idLabel="sidebar.combo"
                  icon="anchor"
                  to={pathRoute.COMBO}
                  activeOnlyWhenExact={false}
                />
                <MenuLink
                  key="package"
                  idLabel="sidebar.package"
                  icon="orders"
                  to={pathRoute.PACKAGE}
                  activeOnlyWhenExact={false}
                />
              </SubMenu>

              {/* <MenuLink
                key="news"
                idLabel="sidebar.news"
                icon="notification-new"
                to={pathRoute.NEWS}
                activeOnlyWhenExact={true}
              /> */}

              <MenuLink
                key="profile"
                idLabel="sidebar.profile"
                icon="profile"
                to={pathRoute.PROFILE}
                activeOnlyWhenExact={false}
              />
              {/* <MenuLink
                key="setting"
                idLabel="sidebar.setting"
                icon="setting"
                to={pathRoute.SETTING}
                activeOnlyWhenExact={false}
              /> */}

              {/* </MenuItemGroup> */}
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
