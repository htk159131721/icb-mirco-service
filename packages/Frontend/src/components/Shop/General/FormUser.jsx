import React, { Component } from "react";
import { Row, Col, Form, Input, Button, Modal, Select, DatePicker } from "antd";
import moment from "moment"
import IntlMessages from "util/IntlMessages";

import {getOS, getIP} from "helpers/Cart"

class FormUser extends Component {
  state = {
    packageData: null
  };
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  handleHideModal = () => {
    this.props.onShowModal(false);
  };
  setDataPackage = data => {
    const {userData} = this.props,
      {authUser} = userData,
      {form} = this.props;
    this.props.onGetDataCities(authUser.country)
    form.setFieldsValue({
      firstName: authUser.first_name,
      lastName: authUser.last_name,
      gender: authUser.gender,
      phone: authUser.phone_number,
      address: authUser.address,
      email: authUser.email,
      country: authUser.country,
      province: authUser.province
    })
    this.setState({ packageData: data });
  };
  handleSubmitBuy = () => {
    const { form } = this.props,
        {packageData} = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let priceApply = packageData.price;
        if(packageData.type === "package")
          if(packageData.price_sale && packageData.price > packageData.price_sale)
            priceApply = packageData.price_sale;
        
        const data = {
          os_device: getOS(),
          name: packageData.type === "combo" ? packageData.combo_name : packageData.title,
          product_id: packageData.id,
          ip_address: getIP(),
          price: priceApply,
          quantity: 1,
          total: priceApply,
          type: packageData.type,
          last_name: values.lastName,
          first_name: values.firstName,
          phone_number: values.phone,
          email: values.email,
          gender: values.gender,
          address: values.address,
          province: values.province,
          country: values.country,
          birthday: moment(values.birthday).format("YYYY-MM-DD"),
          company: values.company
        };
        this.props.onCreateCart(data)
      }
    });
  };
  optionForSelect = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.name}>
            {obj.name}
          </Select.Option>
        );
      });
    }
    return result;
  };
  onGetCountries = () => {
    if (!sessionStorage.getItem("COUNTRIES")) {
      this.props.onGetDataCountries();
    }
  };

  onChangeCountry = values => {
    if (values) this.props.onGetDataCities(values);
  };
  render() {
    const { getFieldDecorator } = this.props.form,
      { georaphyData } = this.props;
    return (
      <div>
        <Modal
          title={<IntlMessages id="app.UserInfo" />}
          visible={this.props.generalData.showModalPackage}
          onOk={this.handleSubmitBuy}
          onCancel={this.handleHideModal}
          footer={[
            <Button key="back" onClick={this.handleHideModal}>
              <IntlMessages id="modalPackage.Cancel" />
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.props.generalData.loadingBTN}
              onClick={this.handleSubmitBuy}
            >
              <IntlMessages id="modalPackage.Submit" />
            </Button>
          ]}
        >
          <Form className="form-cus">
            <Row>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.FirstName" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("firstName", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.LastName" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("lastName", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Gender" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("gender", {
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
                      placeholder="Select a gender"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Birthday" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("birthday", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(<DatePicker format="DD/MM/YYYY" />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.PhoneNumber" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("phone", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      },
                      {
                        pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.NotInvalid" />
                        )
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Email" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      },
                      {
                        type: "email",
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.NotInvalid" />
                        )
                      }
                    ]
                  })(<Input type="email" />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Country" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("country", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ],
                    initialValue: "Vietnam"
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a country"
                      optionFilterProp="children"
                      onFocus={this.onGetCountries}
                      onChange={this.onChangeCountry}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.optionForSelect(georaphyData.countries)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Province" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("province", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ],
                    initialValue: "Hồ Chí Minh"
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a province"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.optionForSelect(georaphyData.cities)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Address" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("address", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Company" />
                  {getFieldDecorator("company")(<Input />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(FormUser);
