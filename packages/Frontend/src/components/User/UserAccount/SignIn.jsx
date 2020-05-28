import React from "react";
import { Button, Modal, Form, Icon, Input, message, Row, Col } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userSignIn, getForgotPW } from "appRedux/actions/UserAction";
import {
  hideMessError,
  hideMessSuccess,
  showModalPackage
} from "appRedux/actions/GeneralAction";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import ReCAPTCHA from "react-google-recaptcha";
import { SITE_KEY } from "config/GoogleRecapcharKey";

const FormItem = Form.Item;
const refRecapchar = React.createRef();

class SignIn extends React.Component {
  state = {
    visible: false,
    disabledButton: true
  };
  componentDidUpdate() {
    // forgot Password
    if (this.props.flagSuccess) {
      this.successModal();
      setTimeout(() => {
        this.showModalForGotPW();
      }, 100);
    }
    if (this.props.flagError) {
      message.error(this.props.messAlert);
      setTimeout(() => {
        this.props.hideMessError();
      }, 100);
      setTimeout(() => {
        this.updateCapchar();
      }, 1000);
    }
    //account not actived
    if (this.props.notification) {
      this.warningModal();
    }
    // login success
    if (this.props.authUser !== null) {
      this.props.history.push("/");
    }
  }
  /**
   * @function updateCapchar
   */
  updateCapchar = () => {
    this.setState({ disabledButton: true });
    refRecapchar.current.reset();
  };
  successModal() {
    Modal.success({
      title: "Successfully",
      content:
        "The message has just been sent to your email. Please check your email to reset password!"
    });
  }
  warningModal = () => {
    Modal.warning({
      title: "NOTIFICATION",
      content:
        "The account has not been activated. Please check yours mail to active account!!"
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(["email", "password"], (err, values) => {
      if (!err) {
        const data = {
          email: values.email,
          password: values.password
        };
        this.props.userSignIn(data);
      }
    });
  };
  handleSubmitForGotPassword = e => {
    e.preventDefault();
    this.props.form.validateFields(["emailForgotPW"], (err, values) => {
      if (!err) {
        const data = {
          email: values.emailForgotPW
        };
        this.props.getForgotPW(data);
      }
    });
  };
  showModalForGotPW = () => {
    this.setState({ visible: !this.state.visible });
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
    const { getFieldDecorator } = this.props.form;
    const { loaderTotal } = this.props;
    const local = `${process.env.NODE_ENV}` !== "production" ? true : false;

    return (
      <>
        <div className="gx-login-container st-pd-form">
          <div className="gx-login-content">
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title">
                <IntlMessages id="app.userAuth.signIn" />
              </h1>
            </div>
            <Form
              onSubmit={this.handleSubmit}
              className="gx-login-form gx-form-row0"
            >
              <FormItem>
                {getFieldDecorator("email", {
                  // initialValue: !local ? "huynhkha8295@gmail.com" : "",
                  rules: [
                    {
                      required: true,
                      message: "The user name is not empty!"
                    }
                  ]
                })(<Input placeholder="Email" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  // initialValue: !local ? "123456" : "",
                  rules: [
                    {
                      required: true,
                      message: "Please input your Password!"
                    }
                  ]
                })(<Input type="password" placeholder="Password" />)}
              </FormItem>
              <FormItem>
                <ReCAPTCHA
                  className="g-recapchar"
                  ref={refRecapchar}
                  sitekey={SITE_KEY}
                  onChange={this.onChangeRecapchar}
                  onExpired={this.onExpiredRecapchar}
                  onErrored={this.onErroredRecapchar}
                />
              </FormItem>
              <FormItem>
                <a onClick={this.showModalForGotPW}>
                  <IntlMessages id="app.userAuth.forgotPW" />
                </a>
              </FormItem>
              <div className="st-ft-form gx-d-flex gx-flex-row gx-justify-content-between gx-align-items-center">
                <div className="gx-align-items-start">
                  <Button
                    type="primary"
                    disabled={!local ? this.state.disabledButton : false}
                    className="gx-mb-0"
                    htmlType="submit"
                  >
                    <IntlMessages id="app.userAuth.signIn" />
                  </Button>
                  <span>
                    <IntlMessages id="app.userAuth.or" />
                  </span>
                  <Link style={{ marginLeft: "1rem" }} to="/signup">
                    <IntlMessages id="app.userAuth.signUp" />
                  </Link>
                </div>
                <div style={{ opacity: ".4" }}>
                  <img src={require("assets/images/logo.png")} />
                </div>
              </div>
            </Form>
            {loaderTotal ? (
              <div
                style={{ left: 0, opacity: "0.1" }}
                className="gx-loader-view-mask"
              >
                <CircularProgress />
              </div>
            ) : null}
          </div>
        </div>
        <Modal
          title="FORGOT PASSWORD"
          width={"400px"}
          visible={this.state.visible}
          onCancel={this.showModalForGotPW}
          footer={[
            <Button key="cancel" onClick={this.showModalForGotPW}>
              Cancel
            </Button>,
            <Button
              type="primary"
              loading={this.props.loadingBTN}
              key="submit"
              onClick={this.handleSubmitForGotPassword}
            >
              Submit
            </Button>
          ]}
        >
          <Form>
            <div className="forgot-pw">
              <Row>
                <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                  <FormItem>
                    {getFieldDecorator("emailForgotPW", {
                      rules: [
                        {
                          required: true,
                          type: "email",
                          message: "The Email is not valid!"
                        }
                      ]
                    })(<Input placeholder="Email" />)}
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Form>
        </Modal>
      </>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({ auth, GeneralReducer, UserReducer }) => {
  const { alertMessage, showMessage } = auth,
    { authUser } = UserReducer,
    {
      flagSuccess,
      flagError,
      messAlert,
      loadingBTN,
      loaderTotal,
      notification
    } = GeneralReducer;
  return {
    loaderTotal,
    alertMessage,
    showMessage,
    authUser,
    flagSuccess,
    flagError,
    messAlert,
    notification,
    loadingBTN
  };
};

export default connect(
  mapStateToProps,
  {
    userSignIn,
    hideMessError,
    hideMessSuccess,
    showModalPackage,
    getForgotPW
  }
)(WrappedNormalLoginForm);
