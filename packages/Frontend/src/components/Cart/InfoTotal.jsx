import React, { Component } from "react";
import { Button, Input, Modal, Form, Radio, Row, Col, message } from "antd";
import {withRouter} from "react-router-dom"
import IntlMessages from "util/IntlMessages";
import CurrenyFormat from "react-currency-format";
import { CART_EMPTY_FOR_CHECKOUT } from "constants/messages";

class InfoTotal extends Component {

  componentDidUpdate(){
    const {generalData, cartData} = this.props;
    if(generalData.checkoutNotifi ){
      this.successNotifi();
    }
  }
  
  /**
   * @function 
   * @summary define show modal checkout success
   */
  successNotifi = () => {
    Modal.success({
      title: "SUCCESSFULLY",
      content: "Create order successful. System will send a message via your email",
      onOk: () => {
        Modal.destroyAll()
        this.props.onDeleteAllCart()
        this.props.history.push("/dashboard")
      }
    });
  }

  /**
   * @function calculateSubTotal
   */
  calculateSubTotal = data => {
    let result = 0;
    if (data.carts.length > 0) {
      result = data.carts.reduce(
        (sum, cart) => (sum += cart.price * cart.quantity),
        0
      );
    }
    return result;
  };
  /**
   * @function calculateTotal
   */
  calculateTotal = data => {
    let result = 0;
    if (data.carts.length > 0) {
      result = data.carts.reduce(
        (sum, cart) => (sum += cart.price * cart.quantity),
        0
      );
    }
    if (result > 0) {
      if (data.discount) {
        result -= data.discount;
      }
    }
    return result;
  };

  /**
   * @function submitCode
   * @summary check promotion code
   */
  submitCode = value => {
    this.props.onCheckPromotion({ promotion_code: value });
  };

  /**
   * @function onShowModalCheckout
   * @summary show modal checkout
   */
  onShowModalCheckout = () => this.props.onShowModalDynamic("checkout", true);

  /**
   * @function handleCancel
   * @summary hide modal check out
   */
  handleCancel = () => this.props.onShowModalDynamic("checkout", false);

  /**
   * @function handleSubmitForm
   * @summary hanlde checkout
   */
  handleSubmitForm = () => {
    const { form, cartData } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        if (cartData.carts.length > 0) {
          const order_details = {};
          // add cart into object order_details
          cartData.carts.map((cart, index) => {
            Object.assign(order_details, {[`${index+1}`]: cart})
          })
          // caculate price
          const sumPrice = cartData.carts.reduce(
              (sum, cart) => (sum += cart.price),
              0
            ),
            sumTotal = sumPrice - cartData.discount,
            data = {
              quantity: cartData.carts.length,
              promotion_code: (cartData.code !== 0 ? cartData.code : ""),
              promotion_value: cartData.discount,
              total_pay: sumTotal,
              node: "",
              payment_type: values.paymentMethod,
              order_details
            };
              this.props.onCheckout(data)
        } else {
          message.error(CART_EMPTY_FOR_CHECKOUT);
        }
      }
    });
  };
  render() {
    const { cartData } = this.props,
      { getFieldDecorator } = this.props.form;
    return (
      <>
        <div className="info-total">
          <div className="info-tt-header">
            <IntlMessages id="cart.cartTotal" />
          </div>
          <div className="content-total">
            <div className="sub-total">
              <div className="text-align-left">
                <IntlMessages id="cart.subTotal" />:
              </div>
              <div className="text-align-right">
                <CurrenyFormat
                  value={this.calculateSubTotal(cartData)}
                  suffix=" USD"
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </div>
            </div>
            <div className="sub-total">
              <div className="text-align-left">
                <IntlMessages id="cart.promotion" />:
              </div>
              <div className="text-align-right">
                <CurrenyFormat
                  value={cartData.discount ? cartData.discount : 0}
                  suffix=" USD"
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </div>
            </div>
            <div
              className="sub-total"
              style={{ fontSize: "17px", fontWeight: "500" }}
            >
              <div className="text-align-left">
                <IntlMessages id="cart.total" />:
              </div>
              <div className="text-align-right">
                <CurrenyFormat
                  value={this.calculateTotal(cartData)}
                  suffix=" USD"
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </div>
            </div>
          </div>
          <div className="footer-total">
            <Button type="primary" onClick={this.onShowModalCheckout}>
              <IntlMessages id="cart.checkout" />
            </Button>
          </div>
        </div>
        <div className="code-discount">
          <Input.Search
            placeholder="code"
            enterButton="Submit"
            size="large"
            onSearch={this.submitCode}
          />
        </div>
        {/* Modal checkout */}
        <Modal
          title={<IntlMessages id="app.paymentMethod" />}
          visible={this.props.generalData.checkout}
          onOk={this.handleSubmitForm}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              <IntlMessages id="modalPackage.Cancel" />
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.props.generalData.loadingBTN}
              onClick={this.handleSubmitForm}
            >
              <IntlMessages id="modalPackage.Save" />
            </Button>
          ]}
        >
          {/* xl={12} lg={12} md={12} sm={24} xs={24} */}
          <Form className="form-cus form-checkout">
            <Row>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  {getFieldDecorator("paymentMethod", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ],
                    initialValue: "cod"
                  })(
                    <Radio.Group name="radiogroup">
                      <Radio value="cod">
                        <IntlMessages id="app.shipCod" />
                      </Radio>
                      <Radio value="banktransfer">
                        <IntlMessages id="app.bankTransfer" />
                      </Radio>
                      <Radio value="alepay">
                        <IntlMessages id="app.alepay" />
                      </Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    );
  }
}
export default Form.create()(withRouter(InfoTotal));
