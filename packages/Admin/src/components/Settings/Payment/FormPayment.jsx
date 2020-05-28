import React, { Component } from "react";
import {
  Form,
  Col,
  Row,
  Input,
  Button,
  Upload,
  Modal,
  message,
  Icon,
  Collapse
} from "antd";

import IntlMessages from "util/IntlMessages";
import {NOT_PERMISSON} from "util/messages";

const { Panel } = Collapse;

class FormSite extends Component {
  state = {
    idUpdate: 0,
    fileAvatar: [],
    previewVisibleAvatar: false,
    previewImageAvatar: "",
    changeAvatar: false
  };
  /* function for upload */
  handleCancelPreview = () => this.setState({ previewVisibleAvatar: false });

  handlePreview = file => {
    this.setState({
      previewImageAvatar: file.url || file.thumbUrl,
      previewVisibleAvatar: true
    });
  };

  handleChange = ({ fileList }) =>
    this.setState({ fileAvatar: fileList, changeAvatar: true });
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
            type: "payment",
            settings: {
              payment_name: values.name,
              payment_email: values.email,
              payment_wallet_address: values.walletAddress
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
      name: record.name,
      email: record.email,
      walletAddress: record.wallet_address
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
                  <span>Email</span>
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
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <span>Wallet Address</span>
                  {getFieldDecorator("walletAddress", {
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
export default Form.create()(FormSite);
