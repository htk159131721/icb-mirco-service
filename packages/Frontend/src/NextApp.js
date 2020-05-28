import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import "assets/vendors/style";
import "styles/wieldy.less";
import "pretty-checkbox/src/pretty-checkbox.scss";
import configureStore, { history } from "./appRedux/store";
//import "./firebase/firebase";
import App from "./containers/App/index";

const store = configureStore();
const NextApp = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>
);

export default NextApp;
