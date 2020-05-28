import React, { Component } from "react";
import {
  Modal,
  Form,
  Button,
  Input,
  Row,
  Col,
  Select,
  Icon,
  Upload,
  message,
  Radio,
  Card
} from "antd";
import IntlMessages from "util/IntlMessages";
class FormAgency extends Component {
  state = {
    idUpdate: 0,
    fileAvarta: null,
    previewImageAvarta: require("assets/images/notFound.png"),
    changeAvarta: false
  };
  /* function for lyfe cycle */
  componentWillUnmount() {
    this.props.onRef(null);
  }
  componentDidMount() {
    this.props.onRef(this);
    const { roleData } = this.props;
    if (roleData.roles.length <= 0) this.props.onGetListRole();
  }
  componentDidUpdate () {
    if (this.props.generalData.flagSuccess) {
      setTimeout(() => {
        this.resetForm()
        this.props.onShowModal(false);
      }, 100);
    }
  }
  /* function for upload */
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChangeFile = file => {
    // Get this url from response in real world.
    this.getBase64(file.file, imageUrl => {
      this.setState({
        previewImageAvarta: imageUrl,
        fileAvarta: file.file
      });
    });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    const { form } = this.props,
      { idUpdate, fileAvarta, password } = this.state;
    // let fieldValidate = [
    //   "username",
    //   "password",
    //   "firstName",
    //   "lastName",
    //   "email",
    //   "passport",
    //   "phone",
    //   "address",
    //   "country",
    //   "province",
    //   "role"
    // ];
    // if (idUpdate !== 0) {
    //   fieldValidate = [
    //     "username",
    //     "firstName",
    //     "lastName",
    //     "email",
    //     "passport",
    //     "phone",
    //     "address",
    //     "country",
    //     "province",
    //     "role"
    //   ];
    // }
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = new FormData();
        data.append("agency_name", values.agencyName);
        data.append("email", values.email);
        data.append("tax_code", values.taxCode);
        data.append("phone_number", values.phone);
        data.append("address", values.address);
        data.append("country", values.country);
        data.append("province", values.province);
        if (fileAvarta) {
          data.append("image", fileAvarta);
        }
        if (idUpdate !== 0) {
          data.append("id", idUpdate);
          this.props.onUpdateAgency(data);
        } else {
          //create
          if (fileAvarta) {
            this.props.onCreateAgency(data);
          } else {
            message.error("Avatar empty!");
          }
        }
      }
    });
  };

  showFormEdit = record => {
    const { form } = this.props;
    form.setFieldsValue({
      agencyName: record.agencyName,
      email: record.email,
      taxCode: record.taxCode,
      phone: record.phone,
      address: record.address,
      country: record.country,
      province: record.province
    });
    this.setState({
      idUpdate: record.id,
      previewImageAvarta: record.avatar
    });
    this.props.onGetDataCities(record.country);
    this.props.onShowModal(true);
  };
  resetForm = () => {
    this.props.form.resetFields();
    this.setState({
      idUpdate: 0,
      previewImageAvarta: require("assets/images/notFound.png"),
      fileAvarta: null
    });
  };

  handleCancel = e => {
    this.resetForm();
    this.props.onShowModal(false);
  };
  // get data georaphy
  onGetCountries = () => {
    if (!sessionStorage.getItem("COUNTRIES")) {
      this.props.onGetDataCountries();
    }
  };

  onChangeCountry = values => {
    if(values)
      this.props.onGetDataCities(values);
  };

  onChangePW = e => this.setState({ password: e.target.value });

  // get data georaphy for select
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

  optionForSelectRole = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.id}>
            {obj.name}
          </Select.Option>
        );
      });
    }
    return result;
  };

  render() {
    const { getFieldDecorator } = this.props.form,
      { georaphyData, roleData } = this.props,
      { idUpdate, fileAvarta, previewImageAvarta } = this.state;
    const props = {
      beforeUpload: file => {
        const typeFile = file.type;
        if (typeFile === "image/jpeg" || typeFile === "image/png") {
          this.setState(state => ({
            fileAvarta: file
          }));
          return false;
        } else {
          message.error("You can only upload JPG, PNG file!");
          return false;
        }
      },
      fileAvarta
    };
    return (
      <div>
        <Modal
          title={idUpdate !== 0 ? "UPDATE AGENCY" : "ADD AGENCY"}
          className="modal-cus"
          maskClosable={false}
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
            </Button>
          ]}
        >
          {/* xl={12} lg={12} md={12} sm={24} xs={24} */}
          <Form className="form-cus">
            <Row>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.AgencyName" />
                  {getFieldDecorator("agencyName", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
             
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.TaxCode" />
                  {getFieldDecorator("taxCode", {
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
                  <IntlMessages id="modalPackage.Form.PhoneNumber" />
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
                  {getFieldDecorator("country", {
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
                  {getFieldDecorator("province", {
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
                  <span style={{ display: "block" }}>Avatar</span>
                  <div className="previewImgEit">
                    <Card
                      hoverable
                      style={{ width: 240, textAlign: "center" }}
                      cover={<img alt="Not Found" src={previewImageAvarta} />}
                    >
                      <Upload
                        {...props}
                        accept=".jpg,.jpeg,.png"
                        showUploadList={false}
                        onChange={this.handleChangeFile}
                      >
                        <Button disabled={this.props.disabled}>
                          <Icon type="upload" /> Select File
                        </Button>
                      </Upload>
                    </Card>
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
export default Form.create()(FormAgency);
