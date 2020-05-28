import React, { Component } from "react";
import { connect } from "react-redux";
import { Collapse, Icon, Row, Col, message } from "antd";

import {
  hideMessError,
  hideMessSuccess,
  showModalPackage
} from "../actions/GeneralAction";
import * as SystemAction from "../actions/SettingAction";
import { getListCustomer } from "../actions/CustomerAction";

import CircularProgress from "components/CircularProgress";

import ListSite from "components/Settings/System/Site/ListSite";
import FormSite from "components/Settings/System/Site/FormSite";

import ListCompany from "components/Settings/System/Company/ListCompany";
import FormCompany from "components/Settings/System/Company/FormCompany";

import ListSMTPEmail from "components/Settings/System/SMTPEmail/ListSMTPEmail";
import FormSMTPEmail from "components/Settings/System/SMTPEmail/FormSMTPEmail";

const { Panel } = Collapse;
const genExtra = () => (
  <Icon
    type="setting"
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);
class SystemComponent extends Component {
  componentDidMount() {
    if (this.props.dataSystems.systems.length <= 0)
      this.props.onGetListSystem();
    if (this.props.cusData.customers.length <= 0)
      this.props.onGetListCustomer();
  }
  componentDidUpdate() {
    if (this.props.generalData.flagSuccess) {
      message.success(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.hideMessSuccess();
      }, 100);
    }
    if (this.props.generalData.flagError) {
      message.error(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.hideMessError();
      }, 100);
    }
  }
  render() {
    return (
      <>
        <Collapse
          // defaultActiveKey={["1"]}
          onChange={this.callback}
          expandIconPosition="right"
        >
          {/* Setting Site comonent */}
          <Panel header="Site" key="1" extra={genExtra()}>
            <Row>
              <Col lg={16} xl={16} md={24} sm={24} xs={24} className="bd-right">
                <ListSite
                  onShowDataForEdit={this.onShowModalForEditSite}
                  dataSystems={this.props.dataSystems}
                />
              </Col>
              <Col lg={8} xl={8} md={24} sm={24} xs={24}>
                <FormSite
                  onRef={ref => (this.formSite = ref)}
                  onUpdateSystem={this.props.onUpdateSystem}
                  cusData={this.props.cusData}
                />
              </Col>
            </Row>
          </Panel>
          {/* Setting company comonent */}
          <Panel header="Company" key="2" extra={genExtra()}>
            <Row>
              <Col lg={16} xl={16} md={24} sm={24} xs={24} className="bd-right">
                <ListCompany
                  onShowDataForEdit={this.onShowModalForEditCompany}
                  dataSystems={this.props.dataSystems}
                />
              </Col>
              <Col lg={8} xl={8} md={24} sm={24} xs={24}>
                <FormCompany
                  onRef={ref => (this.formCompany = ref)}
                  onUpdateSystem={this.props.onUpdateSystem}
                />
              </Col>
            </Row>
          </Panel>
          {/* Setting SMTP Email comonent */}
          <Panel header="SMTP Email" key="3" extra={genExtra()}>
            <Row>
              <Col lg={24} xl={24} md={24} sm={24} xs={24} className="bd-right">
                <ListSMTPEmail
                  onShowDataForEdit={this.onShowDataForEditSMTP}
                  onShowModal={this.props.onShowModal}
                  dataSystems={this.props.dataSystems}
                />
                <FormSMTPEmail
                  onRef={ref => (this.formSMTPEmail = ref)}
                  generalData={this.props.generalData}
                  onShowModal={this.props.onShowModal}
                  onUpdateSystem={this.props.onUpdateSystem}
                />
              </Col>
            </Row>
          </Panel>
        </Collapse>
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </>
    );
  }
  /* functional program general */
  callback = key => {};
  /* functional program Site */
  onShowModalForEditSite = record => {
    this.formSite.showFormEdit(record);
  };
  /* functional program Company */
  onShowModalForEditCompany = record => {
    this.formCompany.showFormEdit(record);
  };
  /* functional program SMTP Email */
  onShowDataForEditSMTP = record => {
    this.formSMTPEmail.showFormEdit(record);
  };
}
const mapStateToProps = state => {
  return {
    generalData: state.generalReducer,
    dataSystems: state.SettingReducer,
    cusData: state.CustomerReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetListSystem: () => dispatch(SystemAction.getListSystem()),
    onUpdateSystem: data => dispatch(SystemAction.updateSystem(data)),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    onGetListCustomer: () => dispatch(getListCustomer())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemComponent);
