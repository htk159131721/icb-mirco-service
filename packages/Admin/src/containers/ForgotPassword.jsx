import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { Button, Form, Input, message, Modal } from "antd"

import {setNewPassword} from "appRedux/actions/Auth"
import {hideMessError, hideMessSuccess} from "appRedux/actions/GeneralAction"

import IntlMessages from "util/IntlMessages"
import CircularProgress from "components/CircularProgress/index"

class ForgotPassword extends Component {
  state = {
    confirmDirty: false
  };

  componentDidUpdate() {
    // forgot Password
    if(this.props.flagSuccess){
      this.successModal();
      setTimeout(()=>{
        Modal.destroyAll()
        this.props.history.push('/signin')
      }, 2000)
      setTimeout(() => {
        this.props.hideMessSuccess()
      }, 100)
    }
    if(this.props.flagError){
      message.error(this.props.messAlert)
      setTimeout(() => {
        this.props.hideMessError()
      }, 100)
    }
  }
  successModal() {
    Modal.success({
      title: 'Successfully',
      content: 'Successful password recovery',
    });
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const search = this.props.location.search,
          valuesSearch = new URLSearchParams(search);
        if(search){
          if(valuesSearch.get("key")){
            const data = {
              token: valuesSearch.get('key'),
              new_password: values.password
            }
            this.props.setNewPassword(data)
          } else message.error("Error")
        } else message.error("Error")
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
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
                  <IntlMessages id="app.userAuth.forgotPW" />
                </h1>
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
                <Form.Item label="Password" hasFeedback>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                  {getFieldDecorator("confirm", {
                    rules: [
                      {
                        required: true,
                        message: "Please confirm your password!"
                      },
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    loading={this.props.loadingBTN}
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
            {this.props.loaderTotal ? (
              <div className="gx-loader-view">
                <CircularProgress />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ generalReducer }) => {
  const {
    flagSuccess,
    flagError,
    messAlert,
    loadingBTN,
    loaderTotal
  } = generalReducer;
  return {
    flagSuccess,
    flagError,
    messAlert,
    loadingBTN,
    loaderTotal
  };
};

export default Form.create()(
  connect(
    mapStateToProps,
    {setNewPassword, hideMessError, hideMessSuccess}
  )(withRouter(ForgotPassword))
);
