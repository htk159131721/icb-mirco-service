import React, { Component } from "react";
import { connect } from "react-redux";
import { message, Row, Col, Alert } from "antd";
import { getDataCountries, getDataCities } from "../actions/GeoraphyAction";
import {
  hideMessError,
  hideMessSuccess,
  showModalPackage,
  showModalDynamic
} from "../actions/GeneralAction";
import { getListOrder } from "appRedux/actions/OrderAction";
import BreadCrumb from "components/Cart/Breadcrumb";
import ItemCart from "components/Cart/ItemCart";
import InfoTotal from "components/Cart/InfoTotal";
import FormUpdate from "components/Cart/FormUpdate";
import EmptyCart from "components/Cart/EmptyCart"
import CircularProgress from "components/CircularProgress";
import IntlMessage from "util/IntlMessages";
import {
  deleteCart,
  updateCart,
  checkPrommotion,
  checkout,
  deleteAllCart
} from "../actions/CartAction";
class CartContainer extends Component {
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
    const { generalData, cartData } = this.props;
    return (
      <div>
        <div className="wrapper-cart">
          <BreadCrumb />
          {cartData.carts.length > 0 ? (
            <Row className="padding-wrapper">
              <Col lg={18} xl={18} md={16} sm={24} xs={24}>
                <ItemCart
                  cartData={this.props.cartData}
                  onDeleteCart={this.props.onDeleteCart}
                  onShowModalForEdit={this.onShowModalForEdit}
                />
                <FormUpdate
                  onRef={ref => (this.formUpdate = ref)}
                  georaphyData={this.props.georaphyData}
                  generalData={this.props.generalData}
                  onGetDataCountries={this.props.onGetDataCountries}
                  onGetDataCities={this.props.onGetDataCities}
                  onShowModal={this.props.onShowModal}
                  onUpdateCart={this.props.onUpdateCart}
                />
              </Col>
              <Col lg={6} xl={6} md={8} sm={24} xs={24}>
                <InfoTotal
                  cartData={this.props.cartData}
                  generalData={this.props.generalData}
                  onCheckPromotion={this.props.onCheckPromotion}
                  onCheckout={this.props.onCheckout}
                  onShowModalDynamic={this.props.onShowModalDynamic}
                  onDeleteAllCart = {this.props.onDeleteAllCart}
                />
              </Col>
            </Row>
          ) : (
            <div className="padding-wrapper">
              <EmptyCart />
            </div>
          )}
        </div>
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
    this.formUpdate.setDataPackage(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    generalData: state.GeneralReducer,
    orderData: state.OrderReducer,
    cartData: state.CartReducer,
    georaphyData: state.GeoraphyReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // order
    onGetListOrder: data => dispatch(getListOrder(data)),
    // general
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    onShowModalDynamic: (name, boolean) =>
      dispatch(showModalDynamic(name, boolean)),
    //cart
    onDeleteCart: id => dispatch(deleteCart(id)),
    onUpdateCart: data => dispatch(updateCart(data)),
    onCheckPromotion: data => dispatch(checkPrommotion(data)),
    onCheckout: data => dispatch(checkout(data)),
    onDeleteAllCart: () => dispatch(deleteAllCart()),
    // georaphy
    onGetDataCountries: () => dispatch(getDataCountries()),
    onGetDataCities: nameCountry => dispatch(getDataCities(nameCountry))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContainer);
