import React, { Component } from "react";
import { Layout, Popover } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import languageData from "./languageData";
import {
  switchLanguage,
  toggleCollapsedSideNav
} from "../../appRedux/actions/Setting";
import SearchBox from "components/SearchBox";
import UserInfo from "components/User/UserLogo/LogoWidthMD";
import AppNotification from "components/AppNotification";
import MailNotification from "components/MailNotification";
import ItemCartSmall from "components/Cart/ItemCartSmall";
import Auxiliary from "util/Auxiliary";

import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE
} from "../../constants/ThemeSetting";
import { connect } from "react-redux";

const { Header } = Layout;

class Topbar extends Component {
  state = {
    searchText: ""
  };

  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)}
            onClick={e => this.props.switchLanguage(language)}
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  updateSearchChatUser = evt => {
    this.setState({
      searchText: evt.target.value
    });
  };

  render() {
    const { locale, width, navCollapsed, navStyle } = this.props;
    return (
      <Auxiliary>
        <Header>
          {navStyle === NAV_STYLE_DRAWER ||
          ((navStyle === NAV_STYLE_FIXED ||
            navStyle === NAV_STYLE_MINI_SIDEBAR) &&
            width < TAB_SIZE) ? (
            <div className="gx-linebar gx-mr-3">
              <i
                className="gx-icon-btn icon icon-menu"
                onClick={() => {
                  this.props.toggleCollapsedSideNav(!navCollapsed);
                }}
              />
            </div>
          ) : null}
          <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
            <img alt="" src={require("assets/images/w-logo.png")} />
          </Link>

          
          <ul className="gx-header-notifications gx-ml-auto">
            <li className="gx-notify" style={{marginRight: "0px"}}>
              <Popover
                overlayClassName="gx-popover-horizantal"
                placement="bottomRight"
                content={<ItemCartSmall />}
                trigger="click"
              >
                <div className="gx-user-thumb gx-mr-3" >
                  <span className="gx-pointer gx-status-pos gx-d-block">
                    <i
                      style={{ fontSize: "23px" }}
                      className="icon icon-shopping-cart"
                    />
                  </span>
                  <span className="gx-status gx-badge gx-badge-danger gx-text-white gx-rounded-circle">
                    {this.props.carts.length}
                  </span>
                </div>
              </Popover>
            </li>
            {/* <li className="gx-language">
              <Popover
                overlayClassName="gx-popover-horizantal"
                placement="bottomRight"
                content={this.languageMenu()}
                trigger="click"
              >
                <span className="gx-pointer gx-flex-row gx-align-items-center">
                  <i className={`flag flag-24 flag-${locale.icon}`} />
                  <span className="gx-pl-2 gx-language-name">
                    {locale.name}
                  </span>
                  <i className="icon icon-chevron-down gx-pl-2" />
                </span>
              </Popover>
            </li> */}
            {width >= TAB_SIZE ? null : (
              <Auxiliary>
                <li className="gx-user-nav">
                  <UserInfo />
                </li>
              </Auxiliary>
            )}
          </ul>
        </Header>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({ settings, CartReducer }) => {
  const { locale, navStyle, navCollapsed, width } = settings,
  {carts} = CartReducer;

  return { locale, navStyle, navCollapsed, width, carts };
};

export default connect(
  mapStateToProps,
  { toggleCollapsedSideNav, switchLanguage }
)(Topbar);
