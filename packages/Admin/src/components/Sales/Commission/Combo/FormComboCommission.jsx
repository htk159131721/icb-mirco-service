import React, { Component } from "react";
import { Form, Input, Button, Collapse, Icon, Select, Row, Col } from "antd";
import { matchLevelCMSDataWithServiceCMS } from "helpers";

import IntlMessages from "util/IntlMessages";

const { Panel } = Collapse;
let id = 0;
class FormComboCommission extends Component {
  state = {
    idUpdate: 0,
    keyLength: 0
  };
  componentDidMount() {
    this.props.onRef(this);
    const { comboData } = this.props;
    if (comboData.listCombo.length <= 0) this.props.onGetListCombo();
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  getOptionForCombo = data => {
    let result;
    if (data.listCombo.length > 0) {
      result = data.listCombo.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.id}>
            {obj.combo_name}
          </Select.Option>
        );
      });
    }
    return result;
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { keys, value } = values,
          configData = {};
        keys.map((key, index) => {
          const obj = {};
          obj[`${index + 1}`] = { level_type: index + 1, value: value[key] };
          Object.assign(configData, obj);
        });
        const data = {
          type: "combo",
          product_id: values.package,
          configs: configData
        };
        this.props.onCreateCommissionCombo(data);
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
  onChangeCombo = value => {
    this.props.form.resetFields();
    this.props.onGetListCommissionCombo([value, "combo"]);
  };
  setIntialValue = () => {
    const search = this.props.location.search,
      values = new URLSearchParams(search);
    let result = null;
    if (search) {
      result = parseInt(values.get("id"));
    }
    return result;
  };

  showEdit = data => {
    let result,
      keys = [];
    const { getFieldDecorator } = this.props.form,
      { levelCMSData } = this.props,
      { price } = data.cmsCombos.price;
    const cmsData = matchLevelCMSDataWithServiceCMS(
      levelCMSData.listLevel,
      data.cmsCombos.commisions
    );
    result = cmsData.map((obj, index) => {
      keys.push(index);
      return (
        <Row key={index}>
          <Col lg={3} xl={3} md={3} sm={3} xs={3}>
            <Form.Item className="st-ant-col">
              <small>Level</small>
              <Input
                style={{ width: "100%", marginRight: 8 }}
                defaultValue={`F${index + 1}`}
                disabled
              />
            </Form.Item>
          </Col>
          <Col lg={10} xl={10} md={10} sm={10} xs={10}>
            <Form.Item className="st-ant-col">
              <small>USD</small>
              {getFieldDecorator(`value[${index}]`, {
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="form.message.DataEmpty" />
                  },
                  {
                    pattern: /^[0-9\b]+$/,
                    message: (
                      <IntlMessages id="modalPackage.Form.Err.NotInvalid" />
                    )
                  }
                ],
                initialValue: Number(obj.value.toFixed(2))
              })(
                <Input
                  placeholder="Value commission"
                  onChange={e =>
                    this.changeToPercent(e, index, data.cmsCombos.price.price)
                  }
                  style={{ width: "100%", marginRight: 8 }}
                />
              )}
            </Form.Item>
          </Col>
          <Col lg={8} xl={8} md={8} sm={8} xs={8}>
            <Form.Item className="st-ant-col">
              <small>Percent</small>
              {getFieldDecorator(`percent[${index}]`, {
                rules: [
                  {
                    pattern: /^[0-9]+(\.[0-9]{1,2})?$/gm,
                    message: (
                      <IntlMessages id="modalPackage.Form.Err.NotInvalid" />
                    )
                  }
                ],
                initialValue: Number(
                  ((parseFloat(obj.value) * 100) / parseFloat(price)).toFixed(2)
                )
              })(
                <Input
                  placeholder="Value %"
                  onChange={e =>
                    this.changeToUSD(e, index, data.cmsCombos.price.price)
                  }
                  style={{ width: "80%", marginRight: 8 }}
                />
              )}
            </Form.Item>
          </Col>
          <Col lg={3} xl={3} md={3} sm={3} xs={3}>
            {data.cmsPackages.length > 5 ? (
              <Icon
                style={{ marginTop: "20px" }}
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(index)}
              />
            ) : null}
          </Col>
        </Row>
      );
    });
    getFieldDecorator("keys", {
      initialValue: keys
    });
    return result;
  };

  /*************** */
  changeToPercent = (e, index, price) => {
    const { form } = this.props;
    let percent = 0;
    if (!!e.target.value)
      percent = (parseFloat(e.target.value) * 100) / parseFloat(price);
    form.setFieldsValue({
      [`percent[${index}]`]: !!percent ? Number(percent.toFixed(2)) : 0
    });
  };
  changeToUSD = (e, index, price) => {
    const { form } = this.props;
    let usd = 0;
    if (!!e.target.value)
      usd = (parseFloat(e.target.value) * parseFloat(price)) / 100;
    form.setFieldsValue({
      [`value[${index}]`]: !!usd ? Number(usd.toFixed(2)) : 0
    });
  };
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form,
      formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      },
      { comboData, settingCMSData } = this.props;
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
            <Form.Item className="st-ant-col" style={{ width: "100%" }}>
              <span>Select Combo</span>{" "}
              <small style={{ color: "red" }}>*</small>
              {getFieldDecorator("package", {
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="form.message.DataEmpty" />
                  }
                ],
                initialValue: this.setIntialValue()
              })(
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select a package"
                  optionFilterProp="children"
                  onChange={this.onChangeCombo}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.getOptionForCombo(comboData)}
                </Select>
              )}
            </Form.Item>
            {settingCMSData.cmsCombos.commisions
              ? this.showEdit(settingCMSData)
              : null}
            {/* <Form.Item className="st-ant-col">
              <Button type="dashed" onClick={this.add} style={{ width: "90%" }}>
                <Icon type="plus" /> Add field
              </Button>
            </Form.Item> */}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button
                type="primary"
                loading={this.props.generalData.loadingBTN}
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    );
  }
}
export default Form.create()(FormComboCommission);
