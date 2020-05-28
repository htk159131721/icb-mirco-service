import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";
import {
  showModalPackage,
  hideMessError,
  hideMessSuccess
} from "../actions/GeneralAction";
import {
  getListCommission,
  updateCommission
} from "../actions/SettingCommissionAction";

import CircularProgress from "components/CircularProgress";
import Header from "components/Generals/HeaderPackage";
import ListCommission from "components/Commission/List/ListCommission";

class CommissionContainer extends Component {
  componentDidUpdate() {
    if (this.props.generalData.flagSuccess) {
      message.success(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.hideMessSuccess();
        this.props.onShowModal(false);
      }, 100);
    }
    if (this.props.generalData.flagError) {
      message.error(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.hideMessError();
      }, 100);
    }
  }
  render() {
    return (
      <div>
        <Header match={this.props.match} />
        <ListCommission
          onShowModalForEdit={this.onShowModalForEdit}
          commissionData={this.props.commissionData}
          usersData={this.props.usersData}
          generalData={this.props.generalData}
          onGetListCommission={this.props.onGetListCommission}
          onUpdateCommission={this.props.onUpdateCommission}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    usersData: state.auth,
    generalData: state.generalReducer,
    commissionData: state.CommissionReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // package
    onGetListCommission: () => dispatch(getListCommission()),
    onUpdateCommission: data => dispatch(updateCommission(data)),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissionContainer);
