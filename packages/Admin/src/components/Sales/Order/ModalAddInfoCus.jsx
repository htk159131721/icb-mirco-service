import React, { Component } from "react";
import { Row, Col, Form, Input, Button, Modal, Select, DatePicker } from "antd";
import moment from "moment";
import IntlMessages from "util/IntlMessages";

class FormAddInfoCus extends Component {
  state = {
    packageData: null,
    typeAction: "ADD",
    indexUpdate: null,
    typeService: null,
    idService: null,
    nameService: ""
  };
  componentDidMount() {
    this.props.onRef(this);
    if (!sessionStorage.getItem("COUNTRIES")) {
      this.props.onGetDataCountries();
    }
    this.props.onGetDataCities('Vietnam');
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  handleHideModal = () => {
    const { form } = this.props;
    form.resetFields();
    this.props.onShowModal(false);
  };
  setDataForForm = (type, data) => {
    if (type === "UPDATE") {
      console.log("object");
      const { form } = this.props;
      this.props.onGetDataCities(data.service.country);
      form.setFieldsValue({
        firstName: data.service.first_name,
        lastName: data.service.last_name,
        gender: data.service.gender,
        phone: data.service.phone_number,
        address: data.service.address,
        email: data.service.email,
        country: data.service.country,
        province: data.service.province,
        company: data.service.company,
        birthday: moment(data.service.birthday)
      });
      this.setState({
        indexUpdate: data.index,
        typeAction: type,
        typeService: data.service.type,
        idService: data.service.product_id,
        price: data.service.price,
        nameService: data.service.name
      });
    } else {
      if(!!this.props.orderData.cusSelected){
        
        const {cusSelected} = this.props.orderData;
        this.props.form.setFieldsValue({
          firstName: cusSelected.first_name,
          lastName: cusSelected.last_name,
          gender: cusSelected.gender,
          phone: cusSelected.phone_number,
          address: cusSelected.address,
          email: cusSelected.email,
          country: cusSelected.country,
          province: cusSelected.province,
          company: cusSelected.company,
          birthday: moment(cusSelected.birthday)
        });
      }
      this.setState({
        typeAction: data.typeAction,
        typeService: data.typeService,
        idService: data.id,
        price: data.price,
        nameService: data.name
      });
    }
    this.props.onShowModal(true);
  };
  handleSubmitBuy = () => {
    const { form } = this.props,
      {
        indexUpdate,
        typeAction,
        typeService,
        idService,
        price,
        nameService
      } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          product_id: idService,
          name: nameService,
          price: price,
          quantity: 1,
          total: price,
          last_name: values.lastName,
          first_name: values.firstName,
          phone_number: values.phone,
          email: values.email,
          gender: values.gender,
          address: values.address,
          province: values.province,
          note: "Empty",
          country: values.country,
          birthday: moment(values.birthday).format("YYYY-MM-DD"),
          company: values.company,
          type: typeService
        };
        if (typeAction === "ADD") this.props.onSaveListService(data);
        else this.props.onUpdateListService(data, indexUpdate);
        this.props.onShowLoadingBTN();
        setTimeout(() => {
          this.props.onHideLoadingBTN();
          this.props.onShowModal(false);
          this.props.onShowMessSuccess("Successfully");
        }, 1000);
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
  /**
   * @function onGetCountries
   * @summary call api get data countries
   */
  onGetCountries = () => {
    if (!sessionStorage.getItem("COUNTRIES")) {
      this.props.onGetDataCountries();
    }
  };

  /**
   * @function onChangeCountry
   * @summary call api get data city
   */
  onChangeCountry = values => {
    this.setState({ countriSelected: values });
    this.props.onGetDataCities(values);
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
export default Form.create()(FormAddInfoCus);
