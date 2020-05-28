import React, { Component } from "react";
import { Form, Input, Button, Collapse, Icon, message, Row, Col } from "antd";
import { SketchPicker } from "react-color";
import IntlMessages from "util/IntlMessages";

const { Panel } = Collapse;
let id = 0;
class FormLevelCommission extends Component {
  state = {
    idUpdate: 0,
    keyLength: 0,
    backgroundPickColor: "#fff"
  };
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  handleSubmit = e => {
    e.preventDefault();
    const {cmsData} = this.props;
    let arrayCheckUniqueLevel = [];
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          level: values.level,
          title: values.title,
          color: this.state.backgroundPickColor
        };

        if(this.state.idUpdate !== 0){
          // update
          data.id = this.state.idUpdate;
          this.props.onUpdateLevelCMS(data);
        } else {
          // create
          if(cmsData.listLevel.length > 0){
            arrayCheckUniqueLevel = cmsData.listLevel.filter(level => parseInt(level.level) === parseInt(values.level))
          }
          // check level already exist
          if(arrayCheckUniqueLevel.length > 0){ 
            message.error("Level is unique!")
          } else {
            this.props.onCreateLevelCMS(data);
          }
        }
      }
    });
  };
  showFormEdit = record => {
    const { form } = this.props;
    form.setFieldsValue({
      level: record.obj.level,
      title: record.obj.title
    });
    this.setState({
      idUpdate: record.obj.id,
      backgroundPickColor: record.obj.color
    });
  };
  resetForm = () => {
    this.setState({
      idUpdate: 0
    });
    this.props.form.resetFields();
  };
  handleChangeComplete = color => {
    this.setState({ backgroundPickColor: color.hex });
  };
  render() {
    const { getFieldDecorator } = this.props.form,
      formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      };
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
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                <Form.Item className="st-ant-col">
                  <small>Level</small>
                  {getFieldDecorator(`level`, {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="form.message.DataEmpty" />
                      }
                    ]
                  })(<Input disabled={this.state.idUpdate !== 0 ? true : false} style={{ width: "100%", marginRight: 8 }} type="number" min={1} />)}
                </Form.Item>
              </Col>
              <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                <Form.Item className="st-ant-col">
                  <small>Title</small>
                  {getFieldDecorator(`title`, {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="form.message.DataEmpty" />
                      }
                    ]
                  })(
                    <Input
                      style={{ width: "100%", marginRight: 8 }}
                      className="input-title-pick-color"
                      suffix={
                        <Button
                          className="gx-mt-3"
                          style={{
                            background: `${this.state.backgroundPickColor}`,
                            color: "#fff"
                          }}
                        >
                          Title Demo
                        </Button>
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col lg={16} xl={16} md={16} sm={24} xs={24}>
                <Form.Item className="st-ant-col">
                  <small>Color</small>
                  <SketchPicker
                    width="100%"
                    color={this.state.backgroundPickColor}
                    onChangeComplete={this.handleChangeComplete}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button
                type="primary"
                className="gx-mt-4"
                loading={this.props.generalData.loadingBTN}
                htmlType="submit"
              >
                Save
              </Button>
              <Button
                type="default"
                className="gx-mt-4"
                onClick={this.resetForm}
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    );
  }
}
export default Form.create()(FormLevelCommission);
