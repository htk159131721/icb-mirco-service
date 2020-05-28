import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  showModalPackage,
  hideMessError,
  hideMessSuccess
} from "appRedux/actions/GeneralAction";
import { getListReceipt, createReceipt } from "appRedux/actions/ReceiptAction";
import { getListOrderPending } from "appRedux/actions/OrderAction";
import CircularProgress from "components/CircularProgress";
import ListReceipt from "components/Receipt/ListReceipt";
import FormReceipt from "components/Receipt/FormReceipt";
import HeaderPackage from "components/Generals/HeaderPackage";
import { deleteReceipt } from "../actions/ReceiptAction";

class ReceiptContainner extends Component {
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
  componentDidMount() {
    this.props.onGetListOrderPending();
  }
  render() {
    return (
      <div>
        <HeaderPackage {...this.props} />
        <ListReceipt
          onShowModal={this.props.onShowModal}
          onGetListReceipt={this.props.onGetListReceipt}
          generalData={this.props.generalData}
          usersData={this.props.usersData}
          receiptData={this.props.receiptData}
          onDeleteReceipt={this.props.onDeleteReceipt}
          onCallModalUpdate={this.onCallModalUpdate}
        />
        <FormReceipt
          onRef={ref => (this.modalForm = ref)}
          roleData={this.props.roleData}
          generalData={this.props.generalData}
          orderData={this.props.orderData}
          georaphyData={this.props.georaphyData}
          // function
          onShowModal={this.props.onShowModal}
          onCreateReceipt={this.props.onCreateReceipt}
          onGetListOrderPending={this.props.onGetListOrderPending}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }

  onCallModalUpdate = data => {
    this.modalForm.onShowDataForm(data);
  };
}
const mapStateToProps = state => {
  return {
    generalData: state.generalReducer,
    usersData: state.auth,
    receiptData: state.ReceiptReducer,
    orderData: state.OrderReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // receipt
    onGetListReceipt: () => dispatch(getListReceipt()),
    onCreateReceipt: data => dispatch(createReceipt(data)),
    onDeleteReceipt: id => dispatch(deleteReceipt(id)),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    // order
    onGetListOrderPending: () => dispatch(getListOrderPending())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptContainner);
