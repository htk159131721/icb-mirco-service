import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";
import { Redirect, withRouter } from 'react-router-dom'

import { activeAccount } from "appRedux/actions/UserAction";
import { hideMessError, hideMessSuccess } from "appRedux/actions/GeneralAction";
import CircularProgress from "components/CircularProgress/index";

class ConfirmActiveAccount extends Component {
  componentDidUpdate() {
    if (this.props.flagSuccess) {
       this.props.history.push("/dashboard")
    }
    if (this.props.flagError) {
      this.props.history.push("/404")
    }
  }
  componentDidMount () {
    this.onActiveAccount()
  }
  onActiveAccount = () => {
    const search = this.props.location.search,
      valuesSearch = new URLSearchParams(search);
    if (search) {
      if (valuesSearch.get("key")) {
        const data = {
          token: valuesSearch.get("key")
        };
        this.props.activeAccount(data);
      } else message.error("Error");
    } else message.error("Error");
  };
  render() {
    return (
      <div className="gx-app-login-wrap">
        <div className="gx-loader-view">
          <CircularProgress />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ GeneralReducer }) => {
  const { flagSuccess, flagError, messAlert } = GeneralReducer;
  return {
    flagSuccess,
    flagError,
    messAlert
  };
};

export default connect(
  mapStateToProps,
  { activeAccount, hideMessError, hideMessSuccess }
)(withRouter(ConfirmActiveAccount));
