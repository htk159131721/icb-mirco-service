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
import { getCookie } from "../../../../helpers/cookie";

const { Option } = Select,
  { RangePicker } = DatePicker;
class AddPackage extends Component {
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
        data.append("package_code", values.packageCode)
        data.append("description", values.description)
        data.append("content", draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        data.append("price", values.price)
        data.append("price_sale", values.pricePromotion ? values.pricePromotion : 0)
        data.append("category_id", values.category)
        data.append("status", values.status)
        // if(values.pricePromotionRange) data.append("promotion_from", moment(values.pricePromotionRange[0]).format("YYYY-MM-DD HH:mm:ss"))
        // if(values.pricePromotionRange) data.append("promotion_to", moment(values.pricePromotionRange[1]).format("YYYY-MM-DD HH:mm:ss"))
        if (fileAvarta) {
          data.append("image", fileAvarta);
        }
        if (idUpdate !== 0) {
          //update
          data.append("id", idUpdate)
          this.props.onUpdatePackage(data);
        } else {
          //create
          if (fileAvarta) {
            this.props.onCreatePackage(data);
          } else {
            message.error("Avatar empty!");
          }
          
        }
      }
    });
  };

  onChangeCategory = value => {};

  showFormEdit = record => {
    const { form, dataCatePackage } = this.props;
    this.onGetCatePackages(dataCatePackage);
    form.resetFields();
    form.setFieldsValue({
      category: record.categoryValue,
      title: record.title,
      packageCode: record.code,
      price: record.price,
      pricePromotion: record.promotionPrice ? record.promotionPrice : 0,
      status: record.status,
      description: record.desc
    });
    this.setState({
      idUpdate: record.id,
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(record.content))
      ),
      previewImageAvarta: record.image
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
  onChangePromotionPrice = (value, dateString) => {};
  onOkPromotionPrice = value => {};
  handleCancel = e => {
    this.resetForm();
    this.props.onShowModal(false);
  };
  /************************** get data ***************** */
  getOptionForCatePackage = data => {
    let result;
    if (data.catePackages.length > 0) {
      result = data.catePackages.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.id}>
            {obj.title}
          </Select.Option>
        );
      });
    }
    return result;
  };
  onGetCatePackages = data => {
    if (data.catePackages.length <= 0) {
      this.props.onGetListCatePackage();
    }
  };
  //define editor
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  uploadImageEditor = async file => {
    const data = new FormData();
    data.append("imgPost", file);
    data.append("slug", "test");
    const response = await axios
      .post("url", data, {
        headers: { Authorization: getCookie("token") }
      })
      .then(res => {
        if (res.payload.data) {
          if (res.payload.data.success)
            return {
              data: {
                link: res.payload.data.data
              }
            };
          return false;
        }
      });
    return response;
  };
  //validator input
  checkRangePromotionBlur = values => {
    this.props.form.validateFieldsAndScroll([
      "pricePromotionRange",
      "pricePromotion"
    ]);
  };
  checkRangePromotion = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (!!getFieldValue("pricePromotionRange")) {
      if (getFieldValue("pricePromotionRange").length <= 0) {
        callback();
      } else {
        if (!!getFieldValue("pricePromotion")) {
          callback();
        } else callback(<IntlMessages id="modalPackage.Form.Err.Required" />);
      }
    } else callback();
  };
  checkHasPromotion = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;

    if (!!getFieldValue("pricePromotion")) {
      if (value) {
        if (value.length <= 0)
          callback(<IntlMessages id="modalPackage.Form.Err.Required" />);
        else callback();
      } else callback(<IntlMessages id="modalPackage.Form.Err.Required" />);
    } else callback();
  };
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
      { dataCatePackage, generalData } = this.props;
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
          title={idUpdate !== 0 ? "UPDATE PACKAGE" : "ADD PACKAGE"}
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
                  <IntlMessages id="modalPackage.Form.Category" />
                  <small style={{color: "red"}}>*</small>
                  {getFieldDecorator("category", {
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
                      placeholder="Select a category"
                      optionFilterProp="children"
                      onChange={this.onChangeCategory}
                      //onFocus={() => this.onGetCatePackages(dataCatePackage)}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.getOptionForCatePackage(dataCatePackage)}
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
                  <IntlMessages id="modalPackage.Form.PackageCode" />
                  <small style={{color: "red"}}>*</small>
                  {getFieldDecorator("packageCode", {
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
                  <IntlMessages id="modalPackage.Form.PricePromotion" />
                  {getFieldDecorator("pricePromotion")(
                    <Input
                      suffix="USD"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                {/* <Form.Item>
                  <IntlMessages id="modalPackage.Form.PricePromotionRange" />
                  {getFieldDecorator("pricePromotionRange", {
                    rules: [
                      {
                        // required: true,
                        // message: (
                        //   <IntlMessages id="modalPackage.Form.Err.Required" />
                        // )
                        validator: this.checkHasPromotion
                      }
                    ]
                  })(
                    <RangePicker
                      style={{ width: "100%" }}
                      showTime={{ format: "HH:mm" }}
                      format="DD/MM/YYYY HH:mm"
                      placeholder={["Promotion From", "To"]}
                      onChange={this.onChangePromotionPrice}
                      onBlur={this.checkRangePromotionBlur}
                      onOk={this.onOkPromotionPrice}
                    />
                  )}
                </Form.Item> */}
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
              {/* <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.PointPromotionRange" />
                  {getFieldDecorator("pointPromotionRange", {
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
                        style={{ width: "100%" }}
                        showTime={{ format: "HH:mm" }}
                        format="DD/MM/YYYY HH:mm"
                        placeholder={["Promotion From", "To"]}
                        onChange={this.onChangePromotionPoint}
                        onOk={this.onOkPromotionPoint}
                      />
                  )}
                </Form.Item>
              </Col> */}
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
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(AddPackage);
