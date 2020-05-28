import React, { Component } from "react";
import { Modal, Form, Button, Input, Row, Col, Select } from "antd";
import CurrencyFormat from "react-currency-format";
import IntlMessages from "util/IntlMessages";

class FormReceipt extends Component {
  state = {
    totalReceipt: null,
    totalPay: -1,
    idUpdate: 0
  };
  componentDidUpdate() {
    if (this.props.generalData.flagSuccess) {
      setTimeout(() => {
        this.resetForm();
        this.props.onShowModal(false);
      }, 100);
    }
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(null);
  }

  onShowDataForm = data => {
    this.props.onGetListOrderPending()
    this.props.form.setFieldsValue({
      order: data.receipt.order_id,
      payment: data.receipt.payment_method,
      amount: data.receipt.amount,
      note: data.receipt.note ? data.receipt.note : null,
      status: data.receipt.status
    });
    
    this.setState({
      idUpdate: data.receipt.id,
      // totalReceipt: ,
      // totalPay: ,
    });
    this.props.onShowModal(true);
  };

  handleSubmitForm = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          order_id: values.order,
          payment_method: values.payment,
          type: "admin",
          amount: values.amount,
          status: values.status,
          note: values.note ? values.note : ""
        };
        if (this.state.idUpdate === 0) this.props.onCreateReceipt(data);
        else {
          data.id = this.state.idUpdate;
          console.log(data);
        }
      }
    });
  };

  resetForm = () => {
    this.props.form.resetFields();
    this.setState({
      totalPay: -1,
      totalReceipt: null
    });
  };

  /**
   * 
   */
  onShowModalAndGetListOrder = (boolean) => {
    this.props.onGetListOrderPending()
    this.props.onShowModal(boolean);
  }

  onGetListOrderPending = () => {
    // if create then call every focus to update orderest
    if(this.state.idUpdate === 0){
      this.props.onGetListOrderPending()
    }
  }

  handleCancel = e => {
    this.resetForm();
    this.props.onShowModal(false);
  };
  /**
   * @function onChangeOrder
   * @summary get total receipt
   */
  onChangeOrder = (value, option) => {
    this.resetForm();
    this.setState({
      totalReceipt: option.props.slc_total_receipt,
      totalPay: option.props.slc_total_pay
    });
  };

  onSelectStatus = value => {
    this.props.form.resetFields(["amount"]);
    const { totalPay, totalReceipt } = this.state;
    if (value === 1) {
      this.props.form.setFieldsValue({
        amount: totalPay - totalReceipt
      });
    }
  };

  /**
   * @function showOptionOrder
   * @summary show option for select order
   */
  showOptionOrder = data => {
    let result;
    if (data.length > 0) {
      result = data.sort((a, b) => b.id - a.id).map((obj, index) => {
        return (
          <Select.Option
            key={index}
            slc_total_receipt={obj.totalReceipts}
            slc_total_pay={obj.total_pay}
            value={obj.id}
          >
            {`${obj.id} - ${obj.order_code}`}
          </Select.Option>
        );
      });
    }
    return result;
  };
  /**
   * @function checkValueInput
   * @summary check amount <= total_pay - total_amount_paid
   */
  checkValueInput = (rule, value, cb) => {
    const { totalPay, totalReceipt } = this.state;
    if (totalPay !== -1) {
      const avg = totalPay - (parseFloat(value) + totalReceipt);
      if (avg < 0) {
        cb(<IntlMessages id="modalPackage.Form.Err.ExceedLimitPayment" />);
      } else if (avg === 0) {
        this.props.form.setFieldsValue({
          status: 1
        });
        cb();
      } else {
        {
          this.props.form.setFieldsValue({
            status: 0
          });
          cb();
        }
      }
    } else {
      cb(<IntlMessages id="modalPackage.Form.Err.RequiredSelectOrderID" />);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form,
      { orderData } = this.props;
    return (
      <div>
        <Modal
          title="CREATE RECEIPT"
          visible={this.props.generalData.showModalPackage}
          onOk={this.handleSubmitForm}
          width={"420px"}
          onCancel={this.handleCancel}
          className="st-no-padding"
          footer={[
            <Button key="back" onClick={this.resetForm}>
              <IntlMessages id="modalPackage.Reset" />
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
          <Form className="form-cus">
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Order" />
                  {getFieldDecorator("order", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a order"
                      onFocus={this.onGetListOrderPending}
                      onChange={this.onChangeOrder}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.showOptionOrder(orderData.ordersPending)}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.PaymentMethod" />
                  {getFieldDecorator("payment", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a payment method"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Select.Option value="cash">Cash</Select.Option>
                      <Select.Option value="banktransfer">
                        Bank Transfer
                      </Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Status" />
                  {getFieldDecorator("status", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a status"
                      onChange={this.onSelectStatus}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Select.Option value={1}>Complete</Select.Option>
                      <Select.Option value={0}>Pending</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.TotalPay" />
                  {getFieldDecorator("amount", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      },
                      {
                        pattern: /^[0-9\b]+$/g,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.NotInvalid" />
                        )
                      },
                      {
                        validator: this.checkValueInput
                      }
                    ]
                  })(<Input style={{ width: "100%" }} suffix="USD" />)}
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <span className="gx-d-block">Note</span>
                  {getFieldDecorator("note")(
                    <Input.TextArea rows={2} style={{ width: "100%" }} />
                  )}
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <div className="total-pay">
                    <IntlMessages id="modalPackage.Form.TotalOrder" />:
                    <CurrencyFormat
                      suffix=" USD"
                      prefix=" "
                      value={this.state.totalPay !== -1 ? this.state.totalPay : 0}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </div>
                  <div className="total-pay">
                    <IntlMessages id="modalPackage.Form.TotalAmountPaid" />:
                    <CurrencyFormat
                      suffix=" USD"
                      prefix=" "
                      value={
                        this.state.totalReceipt ? this.state.totalReceipt : 0
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </div>
                  <div className="total-pay">
                    <IntlMessages id="modalPackage.Form.AmountOwed" />:
                    <CurrencyFormat
                      suffix=" USD"
                      prefix=" "
                      value={
                        this.state.totalReceipt
                          ? this.state.totalPay - this.state.totalReceipt
                          : 0
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(FormReceipt);
