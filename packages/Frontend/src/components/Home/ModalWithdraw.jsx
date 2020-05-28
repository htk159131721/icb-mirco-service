import React, { Component } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
import IntlMessage from "util/IntlMessages";

class ModalWithdraw extends Component {
  componentDidUpdate() {
    const { flagSuccess } = this.props.generalData;
    if (flagSuccess) {
      setTimeout(() => {
        this.props.handleHideModal("withdrawModal");
      }, 100);
    }
  }

  componentWillUnmount() {
    this.props.handleHideModal("withdrawModal");
  }

  /**
   * @function checkTotalAmount
   * @summary check total withdraw illegent
   */
  checkTotalAmount = (rule, value, callback) => {
    const {customerCommission} = this.props;
    if(value){
      if(value > customerCommission){
        callback("Total amount of illegal withdraws")
      }
      if(value < customerCommission && value < 50){
        callback("Minimum total amount withdraw 50$")
      }
    }
    callback()
  }
  handleCancel = () => {
    this.props.handleHideModal("withdrawModal");
  };
  /**
   * @function handleSubmitForm
   * @summary submit form create withdraw request
   * @output create withdraw request
   */
  handleSubmitForm = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const data = {
          account_name: values.account_name,
          account_number: values.account_number,
          account_address: values.account_address,
          account_code: values.account_code,
          amount: values.total_payment,
          note: values.note ? values.note : "Empty"
        };
        this.props.onCreateWithdraw(data);
      }
    });
  };
  /**
   * @function onChangeBank
   * @summary get data bank pour into inputs
   */
  onChangeBank = value => {
    const { listBank, form } = this.props;
    const bankSelected = listBank.filter(bank => bank.id === value);
    if (bankSelected.length > 0) {
      form.setFieldsValue({
        account_name: bankSelected[0].account_name,
        account_address: bankSelected[0].account_address,
        account_code: bankSelected[0].account_code,
        account_number: bankSelected[0].account_number
      });
    }
  };
  /**
   * @function getListBank
   * @summary get list bank to withdraw
   */
  getListBank = () => {
    if (this.props.listBank.length <= 0) {
      this.props.onGetListBank();
    }
  };
  /**
   * @function optionForSelectBank
   * @summary show option for select tag
   */
  optionForSelectBank = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.id}>
            {`${obj.account_name} - ${obj.account_number} - ${obj.account_address}`}
          </Select.Option>
        );
      });
    }
    return result;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={this.props.generalData.withdrawModal}
        title="Withdraw request"
        width="400px"
        onOk={this.handleSubmitForm}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={this.handleSubmitForm}
            loading={this.props.generalData.loadingBTN}
          >
            Submit
          </Button>
        ]}
      >
        <Form layout="vertical" className="st-mb-form-item">
          <Form.Item>
            <span className="gx-mb-1 gx-inline-block">Select account bank</span>
            {getFieldDecorator("account_bank", {
              rules: [
                {
                  required: true,
                  message: <IntlMessage id="modalPackage.Form.Err.Required" />
                }
              ]
            })(
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a account Bank"
                optionFilterProp="children"
                onChange={this.onChangeBank}
                onFocus={this.getListBank}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.optionForSelectBank(this.props.listBank)}
              </Select>
            )}
            <i className="gx-mt-1 gx-d-block gx-text-right">
              Register bank{" "}
              <Link
                to={{
                  pathname: "/profile",
                  search: "?register=bank"
                }}
              >
                here
              </Link>
            </i>
          </Form.Item>
          <Form.Item>
            <span className="gx-mb-1 gx-inline-block">Account name</span>
            {getFieldDecorator("account_name")(<Input disabled />)}
          </Form.Item>
          <Form.Item>
            <span className="gx-mb-1 gx-inline-block">Account number</span>
            {getFieldDecorator("account_number")(<Input disabled />)}
          </Form.Item>
          <Form.Item>
            <span className="gx-mb-1 gx-inline-block">Bank address</span>
            {getFieldDecorator("account_address")(<Input disabled />)}
          </Form.Item>
          <Form.Item>
            <span className="gx-mb-1 gx-inline-block">Bank name</span>
            {getFieldDecorator("account_code")(<Input disabled />)}
          </Form.Item>
          <Form.Item>
            <span className="gx-mb-1 gx-inline-block">Total payment</span>
            {getFieldDecorator("total_payment", {
              rules: [
                {
                  required: true,
                  message: <IntlMessage id="modalPackage.Form.Err.Required" />
                },
                { validator: this.checkTotalAmount }
              ]
            })(<Input type="number" min={1} suffix=" USD" />)}
          </Form.Item>
          <Form.Item>
            <span className="gx-mb-1 gx-inline-block">Note</span>
            {getFieldDecorator("note")(<Input.TextArea rows={2} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(ModalWithdraw);
