import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, message } from "antd";

import {hideMessError, hideMessSuccess, showModalPackage} from '../actions/GeneralAction'
import * as SystemAction from '../actions/SettingAction'

import CircularProgress from "components/CircularProgress";

import ListPayment from "components/Settings/Payment/ListPayment";
import FormPayment from "components/Settings/Payment/FormPayment";


class PaymentComponent extends Component {
  componentDidMount(){
    if(this.props.dataSystems.systems.length <=0 )
      this.props.onGetListSystem()
  }
  componentDidUpdate() {
    if(this.props.generalData.flagSuccess){
      message.success(this.props.generalData.messAlert)
      setTimeout(() => {
        this.props.hideMessSuccess()
      }, 100)
    }
    if(this.props.generalData.flagError){
      message.error(this.props.generalData.messAlert)
      setTimeout(() => {
        this.props.hideMessError()
      }, 100)
    }
  }
  render() {
    return (
        <>
          <Row>
            <Col lg={16} xl={16} md={24} sm={24} xs={24} className="bd-right">
              <ListPayment 
                onShowDataForEdit={this.onShowModalForEditPayment}
                dataSystems = {this.props.dataSystems}
                />
            </Col>
            <Col lg={8} xl={8} md={24} sm={24} xs={24}>
              <FormPayment onRef={ref => (this.formPayment = ref)}
                onUpdateSystem = {this.props.onUpdateSystem}
              />
            </Col>
          </Row>
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </>
    );
  }
  onShowModalForEditPayment = record => {
    this.formPayment.showFormEdit(record);
  };
}
const mapStateToProps = state => {
  return {
    generalData: state.generalReducer,
    dataSystems: state.SettingReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetListSystem: () => dispatch(SystemAction.getListSystem()),
    onUpdateSystem: data => dispatch(SystemAction.updateSystem(data)),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentComponent);
