import React, { Component } from "react"
import { Form, Col, Row, Input, Button, Icon, Collapse, message } from "antd"

import IntlMessages from "util/IntlMessages"
import {NOT_PERMISSON} from "util/messages"

const { Panel } = Collapse;
class FormCompany extends Component {
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
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(this.state.idUpdate !== 0){
          const data = {
            type: "company",
            settings: {
              company_name: values.name,
              company_decription: values.description,
              company_hotline: values.hotline,
              company_email: values.email
            }
          };
          this.props.onUpdateSystem(data);
        } else {
          message.error(NOT_PERMISSON)
        }
      }
    });
  };
  showFormEdit = record => {
    const { form } = this.props;
    form.setFieldsValue({
      description: record.description,
      name: record.name,
      hotline: record.hotline,
      address: record.address,
      email: record.email
    });
    this.setState({
      idUpdate: record.id
    });
  };
  resetForm = () => {
    this.setState({
      idUpdate: 0
    });
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        className="collapse-hd-system"
        expandIcon={({ isActive }) => (
          <Icon type="caret-right" rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel header="FORM" key="1">
          <Form className="input-100-percent" onSubmit={this.handleSubmit}>
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <span>Name</span>
                  {getFieldDecorator("name", {
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
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <span>Hotline</span>
                  {getFieldDecorator("hotline", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(<Input suffix={<Icon type="phone" />} />)}
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
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
                  })(<Input suffix={<Icon type="mail" />} />)}
                </Form.Item>
              </Col>
              {/* <Col xl={24} lg={24} md={24} sm={24} xs={24}>
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
              </Col> */}
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Description" />
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(<Input.TextArea rows={3} />)}
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  <IntlMessages id="modalPackage.Save" />
                </Button>
                {this.state.idUpdate !== 0 ? (
                  <Button type="danger" ghost onClick={this.resetForm}>
                    <IntlMessages id="modalPackage.Reset" />
                  </Button>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>
    );
  }
}
export default Form.create()(FormCompany);
