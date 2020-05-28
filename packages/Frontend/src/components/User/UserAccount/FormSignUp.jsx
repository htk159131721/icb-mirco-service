import React, { Component } from "react";
import {
  Form,
  Button,
  Input,
  Row,
  Col,
  Select,
  Icon,
  Radio,
  Modal,
  message
} from "antd";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import CircularProgress from "components/CircularProgress/index";
import IntlMessages from "util/IntlMessages";
import ReCAPTCHA from "react-google-recaptcha";
import { SITE_KEY } from "config/GoogleRecapcharKey";
import {
  getDataCountries,
  getDataCities
} from "appRedux/actions/GeoraphyAction";
import { hideMessError, hideMessSuccess } from "appRedux/actions/GeneralAction";
import { userSignUp } from "appRedux/actions/UserAction";
import { getCookie } from "helpers/cookie";

const refRecapchar = React.createRef();

class FormSignUp extends Component {
  state = {
    disabledButton: true,
    disable: false
  };
  /* function for lyfe cycle */
  componentDidMount() {
    if (getCookie("token") && sessionStorage.getItem("USER_INF"))
      this.props.history.push("/dashboard");

    this.onGetCountries();
    const search = this.props.location.search;
    if (search) {
      const values = new URLSearchParams(search);
      if (values.get("sponsorkey")) {
        const { form } = this.props;
        form.setFieldsValue({
          sponsorkey: values.get("sponsorkey")
        });
        this.setState({ disable: true });
      }
    } else {
      this.setState({ disable: false });
    }
  }
  componentDidUpdate() {
    if (this.props.generalData.flagSuccess) {
      this.success();
      setTimeout(() => {
        this.props.onHideMessSuccess();
      }, 100);
    }
    if (this.props.generalData.flagError) {
      message.error(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.onHideMessError();
      }, 100);
    }
  }
  success = () => {
    Modal.success({
      title: "SUCCESSFULLY",
      content: "Please check yours mail to active account!!",
      onOk: () => {
        this.props.history.push("/signin");
      }
    });
  };
  handleSubmitForm = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          username: values.username,
          password: values.password,
          sponsorKey: values.sponsorkey ? values.sponsorkey : null,
          phone_number: values.phone,
          country: values.country,
          province: values.province,
          address: values.address,
          gender: values.gender
        };
        this.props.onSignUp(data);
        refRecapchar.current.reset();
        this.setState({
          disabledButton: true
        });
      }
    });
  };
  resetForm = () => {
    this.props.form.resetFields();
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
  /**
   * @function onChangeRecapchar
   * @summary get and set value recapchar allow submit form
   */
  onChangeRecapchar = value => {
    this.setState({ disabledButton: false });
  };
  /**
   * @function onExpiredRecapchar
   * @summary update disable button submit when transaction expried
   */
  onExpiredRecapchar = () => {
    this.setState({ disabledButton: true });
  };
  /**
   * @function onErroredRecapchar
   * @summary update disable button submit when change Error
   */
  onErroredRecapchar = () => {
    this.setState({ disabledButton: true });
  };
  render() {
    const { getFieldDecorator } = this.props.form,
      { georaphyData } = this.props;
    return (
      <div className="gx-login-container gx-signup-container">
        <div className="gx-login-content">
          <div className="gx-login-header gx-text-center">
            <h1 className="gx-login-title">
              <IntlMessages id="app.userAuth.signUp" />
            </h1>
          </div>
          <Form className="form-cus" onSubmit={this.handleSubmitForm}>
            <Row>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      },
                      {
                        pattern: /^(?!.*__.*)(?!.*\.\..*)[a-z0-9_.]+$/,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.NotInvalid" />
                        )
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Username"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
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
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Password"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item className="input-inline">
                  {getFieldDecorator("firstName", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(<Input placeholder="First name" />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item className="input-inline">
                  {getFieldDecorator("lastName", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(<Input placeholder="Last name" />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
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
                  })(<Input placeholder="Phone number" />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
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
                  })(<Input type="email" placeholder="Email address" />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
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
                  {getFieldDecorator("address", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(<Input placeholder="Address" />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item>
                  {getFieldDecorator("sponsorkey", {
                    initialValue: "abcdqwerascnhr"
                  })(
                    <Input
                      disabled={this.state.disable}
                      placeholder="Sponsor key"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <div className="gx-d-flex gx-justify-content-center gx-align-items-center st-capchar">
                  <ReCAPTCHA
                    ref={refRecapchar}
                    sitekey={SITE_KEY}
                    onChange={this.onChangeRecapchar}
                    onExpired={this.onExpiredRecapchar}
                    onErrored={this.onErroredRecapchar}
                  />
                </div>
              </Col>
              <Col
                style={{ marginTop: "1rem" }}
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
              >
                <div className="st-ft-form gx-d-flex gx-flex-row gx-justify-content-between gx-align-items-center gx-mb-3">
                  <div className="gx-align-items-start">
                    <Button
                      type="primary"
                      disabled={this.state.disabledButton}
                      className="gx-mb-0"
                      htmlType="submit"
                    >
                      <IntlMessages id="app.userAuth.signUp" />
                    </Button>
                    <span style={{ marginRight: "1rem" }}>
                      <IntlMessages id="app.userAuth.or" />
                    </span>
                    <Link to="/signin">
                      <IntlMessages id="app.userAuth.signIn" />
                    </Link>
                  </div>
                  <div style={{opacity: ".4"}}>
                    <img src={require("assets/images/logo.png")} />
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
          {this.props.generalData.loaderTotal ? (
            <div
              style={{ left: 0, opacity: "0.1" }}
              className="gx-loader-view-mask"
            >
              <CircularProgress />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    generalData: state.GeneralReducer,
    georaphyData: state.GeoraphyReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    //general
    onHideMessError: () => dispatch(hideMessError()),
    onHideMessSuccess: () => dispatch(hideMessSuccess()),
    // georaphy
    onGetDataCountries: () => dispatch(getDataCountries()),
    onGetDataCities: nameCountry => dispatch(getDataCities(nameCountry)),
    // user
    onSignUp: data => dispatch(userSignUp(data))
  };
};
export default Form.create()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(FormSignUp))
);
