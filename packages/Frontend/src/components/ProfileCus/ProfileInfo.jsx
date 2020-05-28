import React from "react";
import { Col, Row, Tabs, Form, Modal, Input, Select, Button } from "antd";
import Widget from "components/Widget";
import Auxiliary from "util/Auxiliary";
import IntlMessage from "util/IntlMessages";

import BankManager from "./BankManager";
const TabPane = Tabs.TabPane;

class InfoCus extends React.Component {
  state = {
    typeUpdate: 0, 
    tabActive: "1"
  };
  componentDidMount() {
    const { georaphyData } = this.props;
    const search = new URLSearchParams(this.props.location.search);
    if(search){
      if(!!search.get("register") && search.get("register") === "bank"){
        this.setState({tabActive: "3"})
      }
    }
    if (georaphyData.countries.length <= 0) this.props.onGetDataCountries();
  }
  // get data georaphy for select
  optionForSelect = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.name}>
            {obj.name}
          </Select.Option>
        );
      });
    }
    return result;
  };
  onChangeCountry = value => {
    this.props.onGetDataCities(value);
  };
  showModalEdit = () => {
    const { form, userData } = this.props,
      { authUser } = userData;
    this.onChangeCountry(authUser.country);
    form.setFieldsValue({
      first_name: authUser.first_name,
      last_name: authUser.last_name,
      phone_number: authUser.phone_number,
      gender: authUser.gender,
      passport: authUser.passport,
      address: authUser.address,
      country: authUser.country,
      province: authUser.province
    });
    this.props.onShowModalDynamic("modalUpdateInfo", true);
  };
  onUpdate = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const data = {
          first_name: values.first_name,
          last_name: values.last_name,
          phone_number: values.phone_number,
          gender: values.gender,
          passport: values.passport,
          address: values.address,
          country: values.country,
          province: values.province,
          image: null
        };
        this.props.onUpdateProfile(data);
      }
    });
  };
  onCancel = () => this.props.onShowModalDynamic("modalUpdateInfo", false);
  updateTab = key =>{
    this.setState({tabActive: `${key}`})
  }
  render() {
    const { getFieldDecorator } = this.props.form,
      { userData, georaphyData, generalData } = this.props,
      { authUser } = userData;
    return (
      <>
        <Widget
          title="About"
          styleName="gx-card-tabs gx-card-tabs-right gx-card-profile"
        >
          <Tabs onTabClick={this.updateTab} defaultActiveKey={this.state.tabActive} activeKey={this.state.tabActive}>
            <TabPane tab="Overview" key="1">
              <div className="gx-mb-2">
                <Row>
                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                    <Auxiliary>
                      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                        <div className="gx-media-body">
                          <h6 className="gx-mb-1 gx-text-grey">First name</h6>
                          <a >{authUser.first_name}</a>
                        </div>
                      </div>
                    </Auxiliary>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                    <Auxiliary>
                      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                        <div className="gx-media-body">
                          <h6 className="gx-mb-1 gx-text-grey">Last name</h6>
                          <a >{authUser.last_name}</a>
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
                          <a >{authUser.gender}</a>
                        </div>
                      </div>
                    </Auxiliary>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                    <Auxiliary>
                      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                        <div className="gx-media-body">
                          <h6 className="gx-mb-1 gx-text-grey">Phone number</h6>
                          <a >{authUser.phone_number}</a>
                        </div>
                      </div>
                    </Auxiliary>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                    <Auxiliary>
                      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                        <div className="gx-media-body">
                          <h6 className="gx-mb-1 gx-text-grey">ID/Passport</h6>
                          <a >
                            {authUser.passport ? (
                              authUser.passport
                            ) : (
                              <IntlMessage id="app.update" />
                            )}
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
                          <a >
                            {`${authUser.address}, ${authUser.province}, ${authUser.country}`}
                          </a>
                        </div>
                      </div>
                    </Auxiliary>
                  </Col>
                </Row>
                <Row>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Button type="primary" onClick={this.showModalEdit}>
                      Update
                    </Button>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="KYC" key="2">
              <div className="gx-mb-2">KYC</div>
            </TabPane>
            <TabPane tab="Manage Bank" key="3">
              <div className="gx-mb-2">
                <BankManager
                  generalData={generalData}
                  userData={userData}
                  onGetListBank={this.props.onGetListBank}
                  onCreateBank={this.props.onCreateBank}
                  onUpdateBank={this.props.onUpdateBank}
                  onDeleteBank={this.props.onDeleteBank}
                  onShowModalDynamic={this.props.onShowModalDynamic}
                />
              </div>
            </TabPane>
          </Tabs>
        </Widget>
        <Modal
          visible={this.props.generalData.modalUpdateInfo}
          title="Update Profile"
          onCancel={this.onCancel}
          onOk={this.onUpdate}
          footer={[
            <Button key="back" onClick={this.onCancel}>
              <IntlMessage id="modalPackage.Cancel" />
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.props.generalData.loadingBTN}
              onClick={this.onUpdate}
            >
              <IntlMessage id="modalPackage.Save" />
            </Button>
          ]}
        >
          <Form className="form-info">
            <Row>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <Form.Item>
                  <IntlMessage id="modalPackage.Form.FirstName" />
                  {getFieldDecorator("first_name", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessage id="form.empty" />
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <Form.Item>
                  <IntlMessage id="modalPackage.Form.LastName" />
                  {getFieldDecorator("last_name", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessage id="form.empty" />
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <Form.Item>
                  <IntlMessage id="modalPackage.Form.Gender" />
                  {getFieldDecorator("gender", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessage id="form.empty" />
                      }
                    ],
                    initialValue: "male"
                  })(
                    <Select style={{ width: "100%" }}>
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <Form.Item>
                  <IntlMessage id="modalPackage.Form.Passport" />
                  {getFieldDecorator("passport", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessage id="form.empty" />
                      },
                      {
                        pattern: /[0-9]{8,20}\b$/,
                        message: <IntlMessage id="form.invalid" />
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <Form.Item>
                  <IntlMessage id="modalPackage.Form.PhoneNumber" />
                  {getFieldDecorator("phone_number", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessage id="form.empty" />
                      },
                      {
                        pattern: /^(0[1-9])+([0-9]{8,20})\b$/,
                        message: <IntlMessage id="form.invalid" />
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <Form.Item>
                  <IntlMessage id="modalPackage.Form.Country" />
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
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <Form.Item>
                  <IntlMessage id="modalPackage.Form.Province" />
                  {getFieldDecorator("province", {
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
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={12}>
                <Form.Item>
                  <IntlMessage id="modalPackage.Form.Address" />
                  {getFieldDecorator("address", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessage id="form.empty" />
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    );
  }
}

export default Form.create()(InfoCus);
