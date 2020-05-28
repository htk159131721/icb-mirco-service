import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  showModalPackage,
  hideMessError,
  hideMessSuccess,
  showDynamicModal
} from "../actions/GeneralAction";
import * as OrderAction from "appRedux/actions/OrderAction";
import CircularProgress from "components/CircularProgress";
import Header from "components/Generals/HeaderPackage";
import ListOrder from "components/Sales/Order/ListOrder";
import OrderView from "components/Sales/Order/OrderView";

class OrderContainer extends Component {
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
        <Header match={this.props.match} />
        <ListOrder 
            usersData = {this.props.usersData}
            orderData = {this.props.orderData}
            generalData={this.props.generalData}
            onShowModalForEdit={this.onShowModalForEdit} 
            onGetListOrder = {this.props.onGetListOrder}
            onUpdateStatusOrder = {this.props.onUpdateStatusOrder}
            />
        <OrderView
          onRef={ref => (this.modalForm = ref)}
          generalData={this.props.generalData}
          orderData = {this.props.orderData}
          onShowModal={this.props.onShowModal}
          onShowDynamicModal = {this.props.onShowDynamicModal}
          onGetDetailOrder = {this.props.onGetDetailOrder}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  /* function handle in ListOrder */
  onShowModalForEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    usersData: state.auth,
    generalData: state.generalReducer,
    orderData: state.OrderReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
      // order
    onGetListOrder: () => dispatch(OrderAction.getListOrder()),
    onGetDetailOrder: id => dispatch(OrderAction.getDetailOrder(id)),
    onCreateOrder: data => dispatch(OrderAction.createOrder(data)),
    onUpdateOrder: data => dispatch(OrderAction.updateOrder(data)),
    onUpdateStatusOrder: data => dispatch(OrderAction.updateStatusOrder(data)),
      //general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    onShowDynamicModal: (name, boolean) => dispatch(showDynamicModal(name, boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderContainer);
