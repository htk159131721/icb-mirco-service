import React, { Component } from "react";
import { connect } from "react-redux";

import {
  hideMessError,
  hideMessSuccess,
  showModalDynamic
} from "../actions/GeneralAction";
import {
  getListOrder,
  getListOrderToSearch,
  getOrderDetail
} from "appRedux/actions/OrderAction";
import { getListPackage } from "appRedux/actions/ShopAction";
import ListOrder from "../../components/Transaction/Order/ListOrder";
import Search from "../../components/Transaction/Order/Search";
import ModalView from "../../components/Transaction/Order/OrderView";
import CircularProgress from "components/CircularProgress";
class OrderContainer extends Component {
  componentDidMount() {
    this.props.onGetListOrder(null);
  }
  render() {
    const { generalData } = this.props;
    return (
      <div className="padding-wrapper">
        <Search
          orderData={this.props.orderData}
          packageData={this.props.packageData}
          onGetListOrder={this.props.onGetListOrder}
          onGetListOrderToSearch={this.props.onGetListOrderToSearch}
          onGetListPackage={this.props.onGetListPackage}
        />
        <ListOrder
          orderData={this.props.orderData}
          onGetListOrder={this.props.onGetListOrder}
          onGetDetailOrder={this.props.onGetDetailOrder}
        />
        <ModalView
          orderData={this.props.orderData}
          generalData={this.props.generalData}
          onShowModalDynamic={this.props.onShowModalDynamic}
        />
        {generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  /* function handle in ListPackage */
  onShowModalForEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    generalData: state.GeneralReducer,
    orderData: state.OrderReducer,
    packageData: state.PackageReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // order
    onGetListOrder: data => dispatch(getListOrder(data)),
    onGetListOrderToSearch: () => dispatch(getListOrderToSearch(null)),
    onGetDetailOrder: id => dispatch(getOrderDetail(id)),
    //package
    onGetListPackage: () => dispatch(getListPackage()),
    // general
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    onShowModalDynamic: (name, boolean) =>
      dispatch(showModalDynamic(name, boolean))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderContainer);
