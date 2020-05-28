import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  hideMessError,
  hideMessSuccess,
  showModalPackage
} from "../actions/GeneralAction";
import {getListRef } from '../actions/CustomerAction'

import CircularProgress from "components/CircularProgress";
import ReferalView from "components/Referal/ReferalView";

class ReferalContainner extends Component {
  componentDidUpdate() {
    if (this.props.generalData.flagSuccess) {
      message.success(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.hideMessSuccess();
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
        <ReferalView 
          customerData = {this.props.customerData}
          onGetListRef = {this.props.onGetListRef}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  /* function handle in ListCustomer */
  onShowModalForEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    generalData: state.generalReducer,
    customerData: state.CustomerReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // general
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    //customer
    onGetListRef: () => dispatch(getListRef())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferalContainner);
