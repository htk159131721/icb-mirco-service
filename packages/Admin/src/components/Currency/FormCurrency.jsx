import React, { Component } from "react";
import { Modal, Form, Button, Input, Row, Col, Select } from "antd";
import IntlMessages from "util/IntlMessages";

class FormCurrency extends Component {
  state = {
    idUpdate: 0,
  };
  componentWillUnmount() {
    this.props.onRef(null);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentDidUpdate() {
    if (this.props.generalData.flagSuccess) {
      setTimeout(() => {
        this.resetForm();
        this.props.onShowModal(false);
      }, 100);
    }
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          from_currency: values.from_currency,
          from_currency_value: 1,
          to_currency: "VND",
          to_currency_value: values.to_value,
        };
        if (this.state.idUpdate === 0) {
          this.props.onCreateCurrency(data);
        } else {
          data.id = this.state.idUpdate;
          this.props.onUpdateCurrency(data);
        }
      }
    });
  };

  resetForm = () => {
    this.props.form.resetFields();
    this.setState({
      idUpdate: 0,
    });
  };

  handleCancel = (e) => {
    this.resetForm();
    this.props.onShowModal(false);
  };
  /**
   * @function showFormEdit
   */
  showFormEdit = (record) => {
    const { form } = this.props;
    form.setFieldsValue({
      from_currency: record.currency.from_currency,
      to_value: record.currency.to_currency_value,
    });
    this.setState({
      idUpdate: record.currency.id,
    });
    this.props.onShowModal(true);
  };
  /**
   * @function showOptionCurrency
   */
  showOptionCurrency = () => {
    let result = "";
    const data = [
      {
        id: 1,
        currency: "USD",
      },
      {
        id: 2,
        currency: "ICB",
      },
    ];
    result = data.map((obj, index) => {
      return (
        <Select.Option key={index} value={obj.currency}>
          {obj.currency}
        </Select.Option>
      );
    });
    return result;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title={
            this.state.idUpdate === 0
              ? "CREATE EXCHANGE CURRENCY"
              : "UPDATE EXCHANGE CURRENCY"
          }
          visible={this.props.generalData.showModalPackage}
          onOk={this.handleSubmitForm}
          onCancel={this.handleCancel}
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
            </Button>,
          ]}
        >
          <Form className="form-cus">
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <span>From currency</span>
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("from_currency", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        ),
                      },
                    ],
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select from category currency"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.showOptionCurrency()}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <span>To value (VND)</span>
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("to_value", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        ),
                      },
                      {
                        pattern: /^[0-9]+(\.[0-9]{1,10})?$/gm,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.NotInvalid" />
                        ),
                      },
                    ],
                  })(<Input style={{ width: "100%" }} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(FormCurrency);
