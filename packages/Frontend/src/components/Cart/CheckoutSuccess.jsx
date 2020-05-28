import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessage from "util/IntlMessages";
import { Button, Row, Col } from "antd";
import {Redirect} from "react-router-dom"
import CurrencyFormat from "react-currency-format";
import Widget from "components/Widget/index";
import { getCookie } from "helpers/cookie";
import {
  getOrderPaymentAlepayLatest,
  updateOrderPaymentAlepayLatest
} from "../../appRedux/actions/CartAction";

class CheckoutSuccess extends Component {
  componentDidMount() {
    if (getCookie("token")) {
      this.props.onGetOrderLatest();
    } else {
      window.location.href = "/dashboard";
    }
  }
  render() {
    const { cartData } = this.props;
    if(cartData.orderSuccess){ 
      if(cartData.orderSuccess.payment_view === 0){
        return <Redirect to="/dashboard" />
      }
    }
    return (
      <Row className="st-align-center">
        <Col xl={12} lg={12} md={12} xs={24} sm={24}>
          <Widget>
            <div className="gx-media gx-align-items-center gx-mb-4">
              <div className="gx-mr-3">
                <img src={require("assets/images/logo.png")} alt="flying" />
              </div>
              <div className="gx-media-body">
                <h2 className="gx-mb-1">THANH TOÁN THÀNH CÔNG</h2>
                <p className="gx-text-grey gx-mb-0">
                  Đơn hàng:{" "}
                  {cartData.orderSuccess
                    ? cartData.orderSuccess.order_code
                    : null}
                </p>
              </div>
            </div>
            <p className="gx-mb-2">
              Xin chân thành cảm ơn khách hàng:{" "}
              {cartData.orderSuccess
                ? cartData.orderSuccess.customer.full_name
                : ""}
            </p>
            <p className="gx-mb-2">
              Quý khách đã thanh toán đơn hàng thành công.
            </p>
            <p className="gx-mb-2">
              Tổng giá trị đơn hàng:{" "}
              <CurrencyFormat
                value={
                  cartData.orderSuccess ? cartData.orderSuccess.total_pay : 0
                }
                suffix=" USD"
                thousandSeparator={true}
                displayType="text"
              />
            </p>
            <Button
              type="primary"
              href="/dashboard"
              className="gx-mb-1 gx-mt-4"
            >
              Back home
            </Button>
          </Widget>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => {
  return {
    cartData: state.CartReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetOrderLatest: () => dispatch(getOrderPaymentAlepayLatest()),
    onUpdatePaymentView: data => dispatch(updateOrderPaymentAlepayLatest(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutSuccess);
