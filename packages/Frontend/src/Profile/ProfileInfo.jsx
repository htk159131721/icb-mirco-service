import React from "react";
import { Col, Row, Tabs, Form, Modal, Input, Select } from "antd";
import Widget from "components/Widget";
import Auxiliary from "util/Auxiliary";
import IntlMessage from "util/IntlMessages";

const TabPane = Tabs.TabPane;

class InfoCus extends React.Component {
  state = {
    typeUpdate: 0
  };
  componentDidMount () {
    const {georaphyData} = this.props;
    if(georaphyData.countries.length <= 0) this.props.onGetDataCountries()
  }
  // get data georaphy for select
  optionForSelect = data => {
    let result;
    if(data.length > 0){
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.name} >{obj.name}</Select.Option>
        )
      })
    }
    return result;
  }
  onChangeCountry = value => {
    this.props.onGetDataCities(value)
  }
  showModalEdit = (e, typeUpdate, value) => {
    e.preventDefault();
    this.setState({ typeUpdate });
    const { form } = this.props;
    this.props.onShowModal(true);
    
    setTimeout(()=>{
      if(typeUpdate !== "address"){
        form.setFieldsValue({
          fieldName: value
        });
      } else {
        this.props.onGetDataCities(value[0])
        form.setFieldsValue({
          country: value[0], 
          city: value[1],
          address: value[2]
        });
      }
    }, 100)
  };
  onCancel = () => this.props.onShowModal(false);
  render() {
    const { getFieldDecorator } = this.props.form,
      { userData, georaphyData } = this.props,
      { authUser } = userData;
    return (
      <>
        <Widget
          title="About"
          styleName="gx-card-tabs gx-card-tabs-right gx-card-profile"
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Overview" key="1">
              <div className="gx-mb-2">
                <Row>
                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                    <Auxiliary>
                      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                        <div className="gx-media-body">
                          <h6 className="gx-mb-1 gx-text-grey">First name</h6>
                          <a
                            onClick={e =>
                              this.showModalEdit(
                                e,
                                "firstName",
                                authUser.first_name
                              )
                            }
                            className="show-edit"
                            href="javascript:;"
                          >
                            {authUser.first_name}
                            <i className="icon icon-edit cursor-edit" />
                          </a>
                        </div>
                      </div>
                    </Auxiliary>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                    <Auxiliary>
                      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                        <div className="gx-media-body">
                          <h6 className="gx-mb-1 gx-text-grey">Last name</h6>
                          <a
                            onClick={e =>
                              this.showModalEdit(
                                e,
                                "lastName",
                                authUser.last_name
                              )
                            }
                            className="show-edit"
                            href="javascript:;"
                          >
                            {authUser.last_name}
                            <i className="icon icon-edit cursor-edit" />
                          </a>
                        </div>
                      </div>
                    </Auxiliary>
                  </Col>
                </Row>
                <Row>
                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                    <Auxiliary>
                      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                        <div className="gx-media-body">
                          <h6 className="gx-mb-1 gx-text-grey">Gender</h6>
                          <a
                            onClick={e =>
                              this.showModalEdit(e, "gender", authUser.gender)
                            }
                            className="show-edit"
                            href="javascript:;"
                          >
                            {authUser.gender}
                            <i className="icon icon-edit cursor-edit" />
                          </a>
                        </div>
                      </div>
                    </Auxiliary>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                    <Auxiliary>
                      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                        <div className="gx-media-body">
                          <h6 className="gx-mb-1 gx-text-grey">Phone number</h6>
                          <a
                            onClick={e =>
                              this.showModalEdit(
                                e,
                                "phone",
                                authUser.phone_number
                              )
                            }
                            className="show-edit"
                            href="javascript:;"
                          >
                            {authUser.phone_number}
                            <i className="icon icon-edit cursor-edit" />
                          </a>
                        </div>
                      </div>
                    </Auxiliary>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                    <Auxiliary>
                      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                        <div className="gx-media-body">
                          <h6 className="gx-mb-1 gx-text-grey">ID/Passport</h6>
                          <a
                            onClick={e =>
                              this.showModalEdit(
                                e,
                                "passport",
                                authUser.passport ? authUser.passport : ""
                              )
                            }
                            className="show-edit"
                            href="javascript:;"
                          >
                            {authUser.passport ? (
                              authUser.passport
                            ) : (
                              <IntlMessage id="app.update" />
                            )}
                            <i className="icon icon-edit cursor-edit" />
                          </a>
                        </div>
                      </div>
                    </Auxiliary>
                  </Col>
                </Row>
                <Row>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Auxiliary>
                      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                        <div className="gx-media-body">
                          <h6 className="gx-mb-1 gx-text-grey">Address</h6>
                          <a
                            onClick={e =>
                              this.showModalEdit(e, "address", [
                                authUser.country,
                                authUser.province,
                                authUser.address
                              ])
                            }
                            className="show-edit"
                            href="javascript:;"
                          >
                            {`${authUser.address}, ${authUser.province}, ${
                              authUser.country
                            }`}
                            <i className="icon icon-edit cursor-edit" />
                          </a>
                        </div>
                      </div>
                    </Auxiliary>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="KYC" key="2">
              <div className="gx-mb-2">KYC</div>
            </TabPane>
          </Tabs>
        </Widget>
        <Modal
          visible={this.props.generalData.showModalPackage}
          title="Update Profile"
          forceRender = {true}
          width="350px"
          okText="Update"
          onCancel={this.onCancel}
          onOk={this.onUpdate}
        >
          <Form layout="vertical">
            {this.state.typeUpdate === "gender" ? (
              <Form.Item>
                {getFieldDecorator("fieldName")(
                  <Select
                    style={{ width: "100%" }}
                    onChange={this.handleChange}
                  >
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                  </Select>
                )}
              </Form.Item>
            ) : this.state.typeUpdate === "address" ? (
              <>
                <Form.Item>
                  {getFieldDecorator("country", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessage id="form.empty" />
                      }
                    ]
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a country"
                      optionFilterProp="children"
                      onChange={this.onChangeCountry}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.optionForSelect(georaphyData.countries)}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("city", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessage id="form.empty" />
                      }
                    ]
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a province"
                      optionFilterProp="children"
                      onChange={this.onChangeCiti}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.optionForSelect(georaphyData.cities)}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator("address", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessage id="form.empty" />
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              </>
            ) : (
              <Form.Item>
                {getFieldDecorator("fieldName", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessage id="form.empty" />
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            )}
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(InfoCus);
