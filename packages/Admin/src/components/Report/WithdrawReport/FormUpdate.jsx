import React, { Component } from "react";
import {
  Modal,
  Form,
  Button,
  Input,
  Row,
  Col,
  Select,
  Icon,
  Upload,
  message,
  Card
} from "antd";
import IntlMessages from "util/IntlMessages";

class FormCustomer extends Component {
  state = {
    idUpdate: 0,
    fileAvarta: null,
    previewImageAvarta: require("assets/images/logo.png")
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
  /* function for lyfe cycle */
  componentWillUnmount() {
    this.props.onRef(null);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentDidUpdate() {
    if (this.props.generalData.flagSuccess) {
      setTimeout(() => {
        this.resetForm();
        this.props.onShowModal(false);
      }, 100);
    }
  }
  handleSubmitForm = e => {
    e.preventDefault();
    const { form } = this.props,
      { idUpdate, fileAvarta } = this.state;

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = new FormData();
        data.append("status", values.status);
        data.append("note", values.note);
        data.append("id", idUpdate);

        if (fileAvarta) {
          data.append("file_transaction", fileAvarta);
        } else {
          data.append("file_transaction", null);
        }
        this.props.onUpdateWithdraw(data);
      }
    });
  };

  showFormEdit = record => {
    const { form } = this.props;
    form.setFieldsValue({
      note: record.report.note,
      status: record.report.status
    });
    this.setState({
      idUpdate: record.report.id,
      previewImageAvarta: `${process.env.REACT_APP_URL}/${record.report.file_transaction}`
    });
    this.props.onShowModal(true);
  };
  resetForm = () => {
    this.props.form.resetFields();
    this.setState({
      idUpdate: 0,
      previewImageAvarta: require("assets/images/logo.png"),
      fileAvarta: null
    });
  };

  handleCancel = e => {
    this.resetForm();
    this.props.onShowModal(false);
  };

  render() {
    const { getFieldDecorator } = this.props.form,
      { fileAvarta, previewImageAvarta } = this.state;
    const props = {
      beforeUpload: file => {
        const typeFile = file.type,
          { size } = file;
        if (typeFile === "image/jpeg" || typeFile === "image/png") {
          if (size <= 2097000) {
            this.setState(state => ({
              fileAvarta: file
            }));
            return false;
          } else {
            message.error("Upload file under 2MB!");
            return false;
          }
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
          title="UPDATE WITHDRAW"
          visible={this.props.generalData.showModalPackage}
          onOk={this.handleSubmitForm}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              <IntlMessages id="modalPackage.Cancel" />
            </Button>,
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
          <Form className="form-cus">
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Status" />
                  {getFieldDecorator("status", {
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
                      placeholder="Select a status"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Select.Option value="completed">Completed</Select.Option>
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="failed">Failed</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Note" />
                  {getFieldDecorator("note")(<Input.TextArea rows={3} />)}
                </Form.Item>
              </Col>

              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <span style={{ display: "block" }}>File Transaction</span>
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
                        <Button disabled={this.state.disabled}>
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
export default Form.create()(FormCustomer);
