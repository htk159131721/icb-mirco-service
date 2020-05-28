import React, { Component } from "react";
import { Modal, Form, Button, Input, Row, Col, Select, DatePicker } from "antd";
import moment from "moment";
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

const { RangePicker } = DatePicker;

class FormPromotion extends Component {
  state = {
    idUpdate: 0,
    editorState: EditorState.createEmpty(),
    idUpdate: 0,
    fileAvarta: null,
    previewImageAvarta: require("assets/images/logo.png")
  };
  componentDidUpdate() {
    if (this.props.generalData.flagSuccess) {
      setTimeout(() => {
        this.resetForm();
        this.props.onShowModal(false);
      }, 100);
    }
  }
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
          title: values.title,
          code: values.codePromotion,
          description: draftToHtml(
            convertToRaw(this.state.editorState.getCurrentContent())
          ),
          start_date: moment(values.rangePromotion[0]).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          end_date: moment(values.rangePromotion[1]).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          value: values.discountValue,
          type_value: values.typeValue
        };
        if (idUpdate !== 0) {
          //update
          data.id = idUpdate;
          this.props.onUpdatePromotion(data)
        } else {
          //create
          this.props.onCreatePromotion(data);
        }
      }
    });
  };

  showFormEdit = record => {
    const { form } = this.props;
    form.resetFields();
    form.setFieldsValue({
      title: record.obj.title,
      codePromotion: record.obj.code,
      rangePromotion: [moment(record.obj.start_date), moment(record.obj.end_date)],
      discountValue: record.obj.value,
      typeValue: record.obj.type_value
    });
    this.setState({
      idUpdate: record.obj.id,
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(record.obj.description))
      ),
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
  //define editor
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form,
      { idUpdate, editorState } = this.state,
      { generalData } = this.props;
    return (
      <div>
        <Modal
          title={idUpdate !== 0 ? "UPDATE PROMOTION" : "ADD PROMOTION"}
          className="modal-add-package"
          visible={this.props.generalData.showModalPackage}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.resetForm}>
              <IntlMessages id="modalPackage.Reset" />
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
          <Form>
            <Row>
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Title" />
                  <small style={{ color: "red" }}>*</small>
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
              <Col xl={6} lg={6} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.CodePromotion" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("codePromotion", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(<Input disabled = {this.state.idUpdate !== 0 ? true : false} />)}
                </Form.Item>
              </Col>
              <Col xl={10} lg={10} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.PricePromotionRange" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("rangePromotion", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="modalPackage.Form.Err.Required" />
                        )
                      }
                    ]
                  })(
                    <RangePicker
                      ranges={{
                        Today: [moment(), moment()],
                        "This Month": [
                          moment().startOf("month"),
                          moment().endOf("month")
                        ]
                      }}
                      showTime
                      format="DD-MM-YYYY HH:mm:ss"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.DiscountValue" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("discountValue", {
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
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.TypeValue" />
                  <small style={{ color: "red" }}>*</small>
                  {getFieldDecorator("typeValue", {
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
                      style={{ width: "100%" }}
                      placeholder="Select a type value"
                    >
                      <Select.Option value={"price"}>USD</Select.Option>
                      <Select.Option value={"percent"}>Percent</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Detail" />
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
export default Form.create()(FormPromotion);
