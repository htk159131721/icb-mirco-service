import React, { Component } from "react";
import { Form, Col, Row, Input, Button, message, Icon, Collapse, Select } from "antd";

import IntlMessages from "util/IntlMessages";
import { NOT_PERMISSON } from "util/messages";

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
        if (this.state.idUpdate !== 0) {
          const data = {
            type: "site",
            settings: {
              name: values.name,
              description: values.description,
              keywords: values.keywords,
              summary: values.summary,
              sponsor_id: values.sponsor
            }
          };
          this.props.onUpdateSystem(data);
        } else {
          message.error(NOT_PERMISSON);
        }
      }
    });
  };
  showFormEdit = record => {
    const { form } = this.props;
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      keywords: record.keywords,
      summary: record.summary,
      sponsor: parseInt(record.sponsor_id)
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
  /**
   * @function optionForSelectSponsor
   */
  optionForSelectSponsor = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.id}>
            {`${obj.username} - ${obj.full_name}`}
          </Select.Option>
        );
      });
    }
    return result;
  };
  render() {
    const { getFieldDecorator } = this.props.form,
      { cusData } = this.props;
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
                  <IntlMessages id="modalPackage.Form.Sponsor" />
                  {getFieldDecorator("sponsor", {
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
                      placeholder="Select a sponsor"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.optionForSelectSponsor(cusData.customers)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
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
                  <span>Keywords</span>
                  {getFieldDecorator("keywords", {
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
                  <span>Summary</span>
                  {getFieldDecorator("summary", {
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
                  })(<Input.TextArea rows="3" />)}
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
