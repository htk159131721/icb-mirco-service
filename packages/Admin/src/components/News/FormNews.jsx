import React, { Component } from "react";
import { Modal, Form, Button, Input, Row, Col, Select, DatePicker, Upload, Card, message, Icon } from "antd";
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
import { getCookie } from "helpers/cookie";
class FormNews extends Component {
  state = {
    idUpdate: 0,
    editorState: EditorState.createEmpty(),
    idUpdate: 0,
    fileAvarta: null,
    previewImageAvarta: require("assets/images/logo.png"),
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
      { idUpdate, fileAvarta } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = new FormData();
        data.append("title", values.title)
        data.append("level_id", values.level_commission)
        data.append("intro", values.description)
        data.append("content", draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        data.append("status", values.status)
        if (fileAvarta) {
          data.append("image", fileAvarta);
        }
        if (idUpdate !== 0) {
          //update
          data.append("id", idUpdate)
          this.props.onUpdateNews(data);
        } else {
          //create
          if (fileAvarta) {
            this.props.onCreateNews(data);
          } else {
            message.error("Avatar empty!");
          }
          
        }
      }
    });
  };

  showFormEdit = record => {
    const { form } = this.props;
    form.resetFields();
    form.setFieldsValue({
      level_commission: parseInt(record.news.level_id),
      title: record.news.title,
      status: parseInt(record.news.status),
      description: record.news.intro
    });
    this.setState({
      idUpdate: record.news.id,
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(record.news.content))
      ),
      previewImageAvarta: process.env.REACT_APP_URL+record.news.image
    });
    this.props.onShowModal(true);
  };
  resetForm = () => {
    this.props.form.resetFields();
    this.setState({
      idUpdate: 0,
      editorState: EditorState.createWithContent(
        ContentState.createFromText("")
      ),
      previewImageAvarta: require('assets/images/logo.png')
    });
  };
  handleCancel = e => {
    this.resetForm();
    this.props.onShowModal(false);
  };

  //define editor
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  
  /**
   * @function showOptionLevel
   * @param levelData 
   */
  showOptionLevel = data => {
    let result = null;
    if(data.listLevel.length > 0){
      result = data.listLevel.map((level, index) => {
        return (
          <Select.Option key={index} value = {level.level} >{level.title}</Select.Option>
        )
      })
    }
    return result;
  }
  // uploadImageEditor = async file => {
  //   const data = new FormData();
  //   data.append("imgPost", file);
  //   data.append("slug", "test");
  //   const response = await axios
  //     .post("url", data, {
  //       headers: { Authorization: getCookie("token") }
  //     })
  //     .then(res => {
  //       if (res.payload.data) {
  //         if (res.payload.data.success)
  //           return {
  //             data: {
  //               link: res.payload.data.data
  //             }
  //           };
  //         return false;
  //       }
  //     });
  //   return response;
  // };

  /* function for upload */
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChangeFile = file => {
    // Get this url from response in real world.
    this.getBase64(file.file, imageUrl => {
      this.setState({
        previewImageAvarta: imageUrl,
        fileAvarta: file.file
      });
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form,
      { idUpdate, editorState, fileAvarta, previewImageAvarta } = this.state,
      { generalData, levelCMS } = this.props;
    const props = {
      beforeUpload: file => {
        const typeFile = file.type;
        if (typeFile === "image/jpeg" || typeFile === "image/png") {
          this.setState(state => ({
            fileAvarta: file
          }));
          return false;
        } else {
          message.error("You can only upload JPG, PNG file!");
          return false;
        }
      },
      fileAvarta
    };
    return (
      <div>
        <Modal
          title={idUpdate !== 0 ? "UPDATE NEWS" : "ADD NEWS"}
          className="modal-add-package"
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
          <Form>
            <Row>
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item>
                <IntlMessages id="modalPackage.Form.LevelCommission" />
                  <small style={{color: "red"}}>*</small>
                  {getFieldDecorator("level_commission", {
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
                      placeholder="Select a level commission"
                      optionFilterProp="children"
                      onChange={this.onChangeSponsor}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.showOptionLevel(levelCMS)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
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
             
              <Col xl={18} lg={18} md={24} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Description" />
                  {getFieldDecorator("description")(<Input.TextArea rows={5} />)}
                </Form.Item>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Detail" />
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor editor-package"
                    onEditorStateChange={this.onEditorStateChange}
                    // toolbar={{
                    //   image: {
                    //     uploadCallback: this.uploadImageEditor,
                    //     deletionEnabled: true,
                    //     alt: { present: true, mandatory: true },
                    //     defaultSize: {
                    //       height: "400px",
                    //       width: "600px"
                    //     },
                    //     previewImage: true
                    //   }
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col xl={6} lg={6} md={24} sm={24} xs={24}>
              <Form.Item>
                  <span>Avatar</span>
                  <small style={{color: "red"}}>*</small>
                  <div className="previewImgEit">
                    <Card
                      hoverable
                      style={{ width: 240, textAlign: "center" }}
                      cover={<img alt="Not Found" src={previewImageAvarta} />}
                    >
                      <Upload
                        {...props}
                        accept=".jpg,.jpeg,.png"
                        showUploadList={false}
                        onChange={this.handleChangeFile}
                      >
                        <Button disabled={this.props.disabled}>
                          <Icon type="upload" /> Select File
                        </Button>
                      </Upload>
                    </Card>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(FormNews);
