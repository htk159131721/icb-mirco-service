import React, { Component } from "react"
import { Form, Col, Row, Input, Button, Collapse, Icon, message } from "antd"

import IntlMessages from "util/IntlMessages"
import {Permission} from "util/Permission"
import {NOT_PERMISSON} from "util/messages"

const { Panel } = Collapse;

class AddCatePackage extends Component {
  state = {
    idUpdate: 0
  };
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  handleSubmit = e => {
    e.preventDefault();
    const { form, usersData } = this.props,
      {authUser} = usersData;
    const { idUpdate } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          cateCode: values.cateCode,
          title: values.title,
          description: values.description
        };
        if (idUpdate !== 0) {
          //update
          data.id = idUpdate
          this.props.onUpdateCatePackage(data);
        } else { // create
          if(Permission("salePackageCategoryCreate", authUser.permissions))
            this.props.onCreateCatePackage(data);
          else message.error(NOT_PERMISSON)
        }
      }
    });
  };
  showFormEdit = record => {
    const { form } = this.props;
    form.setFieldsValue({
      cateCode: record.cateCode,
      title: record.title,
      description: record.description
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
                  <IntlMessages id="modalPackage.Form.Title" />
                  {getFieldDecorator("title", {
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
                  <IntlMessages id="modalPackage.Form.CateCode" />
                  {getFieldDecorator("cateCode", {
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
                  })(<Input.TextArea rows={6} />)}
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
                    <IntlMessages id="modalPackage.Cancel" />
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
export default Form.create()(AddCatePackage);
