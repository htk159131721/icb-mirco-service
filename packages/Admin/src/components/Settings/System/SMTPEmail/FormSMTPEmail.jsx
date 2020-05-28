import React, { Component } from "react";
import { Form, Col, Row, Input, Button, Modal, message } from "antd";

import IntlMessages from "util/IntlMessages";
import {NOT_PERMISSON} from "util/messages";

class FormSMTPEmail extends Component {
  state = {
    idUpdate: 0
  };
  /* function for lyfe cycle */
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  handleCancel = e => {
    this.resetForm();
    this.props.onShowModal(false);
  };
  handleSubmitForm = e => {
    e.preventDefault();
    const { form } = this.props;
    const { idUpdate } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(idUpdate !== 0){
          const data = {
            type: "smtp_email",
            settings: {
              smtp_host: values.host,
              smtp_port: values.port,
              smtp_username: values.username,
              smtp_password: values.password,
              smtp_from_name: values.fromName,
              smtp_from_address: values.fromAddress
            }
          };
          this.props.onUpdateSystem(data)
        } else {
          message.error(NOT_PERMISSON)
        }
      }
    });
  };
  showFormEdit = record => {
    const { form } = this.props;
    form.setFieldsValue({
      host: record.host,
      port: record.port,
      username: record.username,
      password: record.password,
      fromName: record.fromName,
      fromAddress: record.fromAddress
    });
    this.setState({
      idUpdate: record.id
    });
    this.props.onShowModal(true);
  };
  resetForm = () => {
    this.setState({
      idUpdate: 0
    });
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form,
      { idUpdate } = this.state;
    return (
      <Modal
        title={idUpdate !== 0 ? "UPDATE SMTP EMAIL" : "ADD SMTP EMAIL"}
        visible={this.props.generalData.showModalPackage}
        onOk={this.handleSubmitForm}
        onCancel={this.handleCancel}
        footer={[
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
        <Form className="input-100-percent" onSubmit={this.handleSubmit}>
          <Row>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item>
                <span>SMTP Host</span>
                {getFieldDecorator("host", {
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
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item>
                <span>SMTP Port</span>
                {getFieldDecorator("port", {
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
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
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
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
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
                })(<Input.Password />)}
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item>
                <span>From Name</span>
                {getFieldDecorator("fromName", {
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

            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item>
                <span>From Address</span>
                {getFieldDecorator("fromAddress", {
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
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(FormSMTPEmail);
