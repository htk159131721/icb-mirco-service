import React, {Component} from "react";
import {connect} from "react-redux";
import URLSearchParams from 'url-search-params'
import {Redirect, Route, Switch} from "react-router-dom";
import {ConfigProvider} from "antd";
import {IntlProvider} from "react-intl";
import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from 'components/User/UserAccount/SignIn';
import SignUp from 'components/User/UserAccount/FormSignUp';
import ForgotPW from 'components/User/UserAccount/ForgotPassword';
import ActiveAccount from 'components/User/UserAccount/ConfirmActiveAccount';
import PaymentSuccess from 'components/Cart/CheckoutSuccess';
import {setInitUrl} from "appRedux/actions/Auth";
import {onLayoutTypeChange, onNavStyleChange, setThemeType} from "appRedux/actions/Setting";
import pathRoute from "constants/pathRoute"

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK
} from "../../constants/ThemeSetting";

const RestrictedRoute = ({component: Component, authUser, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location}
          }}
        />}
  />;


class App extends Component {

  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  componentWillMount() {
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    const params = new URLSearchParams(this.props.location.search);

    if (params.has("theme")) {
      this.props.setThemeType(params.get('theme'));
    }
    if (params.has("nav-style")) {
      this.props.onNavStyleChange(params.get('nav-style'));
    }
    if (params.has("layout-type")) {
      this.props.onLayoutTypeChange(params.get('layout-type'));
    }
  }

  render() {
    const {match, location, themeType, layoutType, navStyle, locale, authUser, initURL} = this.props;
    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add('dark-theme');
    }
    if (location.pathname === '/') {
      if (authUser === null) {
        return ( <Redirect to={'/signin'}/> );
      } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
        return ( <Redirect to={'/dashboard'}/> );
      } else {
        return ( <Redirect to={initURL}/> );
      }
    }
    this.setLayoutType(layoutType);

    this.setNavStyle(navStyle);

    const currentAppLocale = AppLocale[locale.locale];
    
    return (
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>
            
          <Switch>
            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/forgot' component={ForgotPW}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/active' component={ActiveAccount}/>
            <Route path={pathRoute.CHECK_OUT_SUCCESS} component={PaymentSuccess}/>
            <RestrictedRoute path={`${match.url}`} authUser={authUser}
                             component={MainApp}/>
          </Switch>
        </IntlProvider>
      </ConfigProvider>
    )
  }
}

const mapStateToProps = ({settings, auth, UserReducer}) => {
  const {locale, navStyle, themeType, layoutType} = settings;
  const {initURL} = auth;
  const {authUser} = UserReducer;

  return {locale, navStyle, themeType, layoutType, authUser, initURL}
  // return {
  //   dataSetting: state.settings,
  //   dataAuth: state.auth
  // }
};
export default connect(mapStateToProps, {setInitUrl, setThemeType, onNavStyleChange, onLayoutTypeChange})(App);
