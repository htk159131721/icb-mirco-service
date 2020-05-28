import React, { Component } from "react";
import {
  Modal,
  Form,
  Button,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Icon,
  Upload,
  message,
  Radio,
  Card
} from "antd";
import IntlMessages from "util/IntlMessages";
class FormCustomer extends Component {
  state = {
    idUpdate: 0,
    fileAvarta: null,
    previewImageAvarta: require("assets/images/notFound.png"),
    changeAvarta: false,
    showImgEdit: false,
    password: null
  };
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
  /* function for lyfe cycle */
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
  handleSubmitForm = e => {
    e.preventDefault();
    const { form } = this.props,
      { idUpdate, fileAvarta, password } = this.state;
    let fieldValidate = [
      "username",
      "password",
      "firstName",
      "lastName",
      "email",
      "passport",
      "phone",
      "address",
      "country",
      "province",
      "gender",
      "sponsorkey"
    ];
    if (idUpdate !== 0) {
      fieldValidate = [
        "username",
        "firstName",
        "lastName",
        "email",
        "passport",
        "phone",
        "address",
        "country",
        "province",
        "gender",
        "sponsorkey"
      ];
    }

    form.validateFieldsAndScroll(fieldValidate, (err, values) => {
      if (!err) {
        const data = new FormData();
        data.append("username", values.username);
        if (password) data.append("password", password);
        data.append("first_name", values.firstName);
        data.append("last_name", values.lastName);
        data.append("email", values.email);
        data.append("passport", values.passport);
        data.append("phone_number", values.phone);
        data.append("address", values.address);
        data.append("country", values.country);
        data.append("province", values.province);
        data.append("gender", values.gender);
        data.append("sponsorKey", values.sponsorkey);
        if (fileAvarta) {
          data.append("image", fileAvarta);
        }
        if (idUpdate !== 0) {
          data.append("id", idUpdate);
          this.props.onUpdateCustomer(data);
        } else {
          //create
          if (fileAvarta) {
            this.props.onCreateCustomer(data);
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
      username: record.userName,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      passport: record.passport,
      phone: record.phone,
      address: record.address,
      country: record.country,
      province: record.province,
      role: record.role,
      gender: record.gender
    });
    this.setState({
      idUpdate: record.id,
      previewImageAvarta: record.avatar,
      showImgEdit: true
    });
    this.props.onGetDataCities(record.country);
    this.props.onShowModal(true);
  };
  resetForm = () => {
    this.props.form.resetFields();
    this.setState({
      idUpdate: 0,
      previewImageAvarta: require("assets/images/notFound.png"),
      fileAvarta: null,
      password: null
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
    this.props.onGetDataCities(values);
  };
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
  onChangePW = e => this.setState({ password: e.target.value });
  render() {
    const { getFieldDecorator } = this.props.form,
      { georaphyData } = this.props,
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
        {/* xl={12} lg={12} md={12} sm={24} xs={24} */}
        <Form className="form-cus">
          <Row>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item>
                <IntlMessages id="modalPackage.Form.Username" />
                {getFieldDecorator("username", {
                  rules: [
                    {
                      required: true,
                      message: (
                        <IntlMessages id="modalPackage.Form.Err.Required" />
                      )
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                )}
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item>
                <IntlMessages id="modalPackage.Form.Password" />
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: (
                        <IntlMessages id="modalPackage.Form.Err.Required" />
                      )
                    }
                  ]
                })(
                  <Input.Password
                    onChange={this.onChangePW}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                )}
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item className="input-inline">
                <IntlMessages id="modalPackage.Form.FirstName" />
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
              <Form.Item className="input-inline">
                <IntlMessages id="modalPackage.Form.LastName" />
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
                {getFieldDecorator("gender", {
                  rules: [
                    {
                      required: true,
                      message: (
                        <IntlMessages id="modalPackage.Form.Err.Required" />
                      )
                    }
                  ],
                  initialValue: "male"
                })(
                  <Radio.Group style={{ display: "block" }}>
                    <Radio value={"male"}>
                      <IntlMessages id="modalPackage.Form.Male" />
                    </Radio>
                    <Radio value={"female"}>
                      <IntlMessages id="modalPackage.Form.Female" />
                    </Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item>
                <IntlMessages id="modalPackage.Form.Passport" />
                {getFieldDecorator("passport", {
                  rules: [
                    {
                      required: true,
                      message: (
                        <IntlMessages id="modalPackage.Form.Err.Required" />
                      )
                    },
                    {
                      pattern: /^[0-9\b]*$/g,
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
              <Form.Item>
                <IntlMessages id="modalPackage.Form.SponsorKey" />
                {getFieldDecorator("sponsorkey", {
                  rules: [
                    {
                      required: true,
                      message: (
                        <IntlMessages id="modalPackage.Form.Err.Required" />
                      )
                    }
                  ],
                  initialValue: "abcdqwerascnhr"
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
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Button
                key="submit"
                type="primary"
                loading={this.props.generalData.loadingBTN}
                onClick={this.handleSubmitForm}
              >
                <IntlMessages id="app.userAuth.signUp" />
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default Form.create()(FormCustomer);
