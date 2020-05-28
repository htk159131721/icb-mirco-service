import React from "react";
import { Button, Modal, Form, Icon, Input, message, Row, Col } from "antd";
import { connect } from "react-redux";

import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn,
  getForgotPW
} from "appRedux/actions/Auth";
import {hideMessError, hideMessSuccess} from "appRedux/actions/GeneralAction";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";

const FormItem = Form.Item;

class SignIn extends React.Component {
  state = {
    visible: false
  };
  componentDidUpdate() {
    if (this.props.showMessage) {
      message.error(this.props.alertMessage);
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    // forgot Password
    if(this.props.flagSuccess){
      this.successModal()
      setTimeout(() => {
        this.props.hideMessSuccess()
        this.showModalForGotPW()
      }, 100)
    }
    if(this.props.flagError){
      message.error(this.props.messAlert)
      setTimeout(() => {
        this.props.hideMessError()
      }, 100)
    }
    if (this.props.authUser !== null) {
      this.props.history.push("/");
    }
  }
  successModal() {
    Modal.success({
      title: 'Successfully',
      content: 'The message has just been sent to your email. Please check your email to reset password!',
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(["email", "password"], (err, values) => {
      if (!err) {
        const data = {
          email: values.email,
          password: values.password
        };
        this.props.showAuthLoader();
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
  
  showModalForGotPW = () => this.setState({ visible: !this.state.visible });
  render() {
    const { getFieldDecorator } = this.props.form;
    const { showMessage, loader, alertMessage } = this.props;

    return (
      <>
        <div className="gx-app-login-wrap">
          <div className="gx-app-login-container">
            <div className="gx-app-login-main-content">
              <div className="gx-app-logo-content">
                <div className="gx-app-logo-content-bg">
                  <img
                    src={require("assets/images/background-signin.jpg")}
                    alt="Neature"
                  />
                </div>
                <div className="gx-app-logo-wid">
                  <h1>
                    <IntlMessages id="app.userAuth.signIn" />
                  </h1>
                  <p>
                    <IntlMessages id="app.userAuth.bySigning" />
                  </p>
                  <p>
                    <IntlMessages id="app.userAuth.getAccount" />
                  </p>
                </div>
                <div className="gx-app-logo">
                  <img alt="example" src={require("assets/images/logo.png")} />
                </div>
              </div>
              <div className="gx-app-login-content">
                <Form
                  onSubmit={this.handleSubmit}
                  className="gx-signin-form gx-form-row0"
                >
                  <FormItem>
                    {getFieldDecorator("email", {
                      // initialValue: "nguyentandat43@gmail.com",
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
                      // initialValue: "123456",
                      rules: [
                        {
                          required: true,
                          message: "Please input your Password!"
                        }
                      ]
                    })(<Input type="password" placeholder="Password" />)}
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      className="gx-mb-0"
                      htmlType="submit"
                    >
                      <IntlMessages id="app.userAuth.signIn" />
                    </Button>
                    <span>
                      <IntlMessages id="app.userAuth.or" />
                    </span>
                    <a
                      style={{ marginLeft: "1rem" }}
                      onClick={this.showModalForGotPW}
                    >
                      <IntlMessages id="app.userAuth.forgotPW" />
                    </a>
                  </FormItem>
                </Form>
              </div>
              {loader ? (
                <div className="gx-loader-view">
                  <CircularProgress />
                </div>
              ) : (
                ""
              )}
            </div>
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
            <Button type="primary" loading={this.props.loadingBTN} key="submit" onClick={this.handleSubmitForGotPassword}>
              Submit
            </Button>,
          ]}
        >
          <Form >
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

const mapStateToProps = ({ auth, generalReducer }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  const { flagSuccess, flagError, messAlert, loadingBTN} = generalReducer;
  return { loader, alertMessage, showMessage, authUser, flagSuccess, flagError, messAlert, loadingBTN };
};

export default connect(
  mapStateToProps,
  {
    userSignIn,
    hideMessage,
    showAuthLoader,
    userFacebookSignIn,
    userGoogleSignIn,
    userGithubSignIn,
    userTwitterSignIn,
    getForgotPW,
    hideMessError,
    hideMessSuccess
  }
)(WrappedNormalLoginForm);
