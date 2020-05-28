import React, { Component } from "react";
import { Icon, Form, Button, Input, Modal } from "antd";
import Widget from "components/Widget";
import IntlMessage from "util/IntlMessages";

class ProfileContact extends Component {
  state = {
    confirmDirty: false
  };
  /**
   * @function showModalChangePassword
   *
   */
  showModalChangePassword = () => {
    this.props.onShowModalDynamic(
      "modalChangePassword",
      !this.props.generalData.modalChangePassword
    );
  };

  /**
   * @function handleSubmitUpdatePassword
   * @summary handle update password
   */
  handleSubmitUpdatePassword = () => {
    const fieldsValidate = ["oldPassword", "newPassword", "confirm"];
    this.props.form.validateFieldsAndScroll(fieldsValidate, (err, values) => {
      if (!err) {
        const data = {
          current_password: values.oldPassword,
          password: values.newPassword
        };
        this.props.onChangePassword(data)
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("newPassword")) {
      callback(<IntlMessage id="form.confirmPW" />);
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
  render() {
    const { userData, form } = this.props,
      { getFieldDecorator } = form;
    return (
      <Widget title="Account" styleName="gx-card-profile-sm">
        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className="icon icon-email gx-fs-xxl gx-text-grey" />
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Email</span>
            <p className="gx-mb-0">
              <a>
                {userData.authUser ? userData.authUser.email : null}
              </a>
            </p>
          </div>
        </div>

        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className="icon icon-user gx-fs-xxl gx-text-grey" />
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Username</span>
            <p className="gx-mb-0">
              <a>
                {userData.authUser ? userData.authUser.username : null}
              </a>
            </p>
          </div>
        </div>

        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className="icon icon-forgot-password gx-fs-xxl gx-text-grey" />
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Password</span>
            <p className="gx-mb-0">
              <a onClick={this.showModalChangePassword}>
                ************
                <Icon type="edit" theme="twoTone" />
              </a>
              {/* Modal change password */}
            </p>
          </div>
        </div>
        <Modal
          visible={this.props.generalData.modalChangePassword}
          width="400px"
          title={<IntlMessage id="modal.Form.ChangePW" />}
          onOk={this.handleSubmitUpdatePassword}
          onCancel={() => this.showModalChangePassword("modalChangePassword")}
          footer={[
            <Button
              key="back"
              onClick={() =>
                this.showModalChangePassword("modalChangePassword")
              }
            >
              <IntlMessage id="modalPackage.Cancel" />
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.props.generalData.loadingBTN}
              onClick={this.handleSubmitUpdatePassword}
            >
              <IntlMessage id="modalPackage.Save" />
            </Button>
          ]}
        >
          <Form layout="vertical">
            <Form.Item>
              <IntlMessage id="modal.Form.OldPW" />
              {getFieldDecorator("oldPassword", {
                rules: [
                  {
                    required: true,
                    message: <IntlMessage id="form.empty" />
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item>
              <IntlMessage id="modal.Form.NewPW" />
              {getFieldDecorator("newPassword", {
                rules: [
                  {
                    required: true,
                    message: <IntlMessage id="form.empty" />
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item>
              <IntlMessage id="modal.Form.ConfirmPW" />
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: <IntlMessage id="form.confirmPW" />
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
          </Form>
        </Modal>
      </Widget>
    );
  }
}

export default Form.create()(ProfileContact);
