import React, { Component } from "react";
import {
  Modal,
  Form,
  Button,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  message
} from "antd";
import moment from "moment";
import axios from "axios";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import IntlMessages from "util/IntlMessages";
class FormCombo extends Component {
  state = {
    idUpdate: 0,
    editorState: EditorState.createEmpty()
  };
  componentWillUnmount() {
    this.props.onRef(null);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  handleSubmitForm = e => {
    e.preventDefault();
    const { form } = this.props,
      { idUpdate } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          combo_name: values.title,
          combo_description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
          combo_status: values.status,
          product_of_combo: values.packages,
          price: values.price,
          discounts: values.discount
        };
        if (idUpdate !== 0) {
          //update
          data.id = idUpdate;
          this.props.onUpdateCombo(data);
        } else {
          //create
          this.props.onCreateCombo(data);
        }
      }
    });
  };

  showFormEdit = record => {
    const { form, packageData } = this.props;
    if(packageData.packages.length <= 0) this.getListPackage();
    form.resetFields();
    form.setFieldsValue({
      title: record.obj.combo_name,
      status: parseInt(record.obj.combo_status),
      price: record.obj.price,
      discount: record.obj.discounts,
      packages: record.obj.product_of_combo ? JSON.parse(record.obj.product_of_combo) : []
    });
    this.setState({
      idUpdate: record.obj.id,
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(record.obj.combo_description))
      )
    });
    this.props.onShowModal(true);
  };
  resetForm = () => {
    this.props.form.resetFields();
    this.setState({
      idUpdate: 0,
      editorState: EditorState.createWithContent(
        ContentState.createFromText("")
      )
    });
  };
  handleCancel = e => {
    this.resetForm();
    this.props.onShowModal(false);
  };
  /************************** get data ***************** */
  getOptionForPackage = data => {
    let result;
    if (data.packages.length > 0) {
      result = data.packages.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.id}>
            {obj.title}
          </Select.Option>
        );
      });
    }
    return result;
  };
  //define editor
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  //validator input
  checkRangePromotionBlur = values => {
    this.props.form.validateFieldsAndScroll([
      "pricePromotionRange",
      "pricePromotion"
    ]);
  };

  render() {
    const { getFieldDecorator } = this.props.form,
      { idUpdate, editorState } = this.state,
      { packageData, generalData } = this.props;
    return (
      <div>
        <Modal
          title={idUpdate !== 0 ? "UPDATE COMBO" : "ADD COMBO"}
          className="modal-add-package"
          maskClosable={false}
          visible={this.props.generalData.showModalPackage}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.resetForm}>
              <IntlMessages id="modalPackage.Cancel" />
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={generalData.loadingBTN}
              onClick={this.handleSubmitForm}
            >
              <IntlMessages id="modalPackage.Save" />
            </Button>
          ]}
        >
          {/* xl={12} lg={12} md={12} sm={24} xs={24} */}
          <Form>
            <Row>
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Title" />
                  <small style={{color: "red"}}>*</small>
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
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.PackageOfCombo" />
                  <small style={{color: "red"}}>*</small>
                  {getFieldDecorator("packages", {
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
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Select a packages"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.getOptionForPackage(packageData)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.DisplayHome" />
                  <small style={{color: "red"}}>*</small>
                  {getFieldDecorator("status", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ],
                    initialValue: 1
                  })(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select a status"
                    >
                      <Select.Option value={0}>Hidden</Select.Option>
                      <Select.Option value={1}>Display</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Price" />
                  <small style={{color: "red"}}>*</small>
                  {getFieldDecorator("price", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      },
                      {
                        pattern: /^[0-9\b]+$/,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.NotInvalid" />
                        )
                      }
                    ]
                  })(<Input suffix="USD" />)}
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Discount" />
                  {getFieldDecorator("discount")(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Description" />
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor editor-package"
                    onEditorStateChange={this.onEditorStateChange}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(FormCombo);
