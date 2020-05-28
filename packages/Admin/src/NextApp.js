import React from "react";
import {ConnectedRouter} from "react-router-redux";
import {Provider} from "react-redux";
import {Route, Switch, Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import "assets/vendors/style";
import "styles/wieldy.less";
import 'pretty-checkbox/src/pretty-checkbox.scss';
import configureStore, {history} from "./appRedux/store";
import "./firebase/firebase";
import App from "./containers/App/index";


export const store = configureStore();

const NextApp = () =>
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  </Provider>;


export default NextApp;
