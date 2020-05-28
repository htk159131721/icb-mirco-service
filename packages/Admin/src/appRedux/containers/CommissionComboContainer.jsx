import React, { Component } from "react";
import { connect } from "react-redux";
import { message, Row, Col } from "antd";
import {
  showModalPackage,
  hideMessError,
  hideMessSuccess
} from "../actions/GeneralAction";
import { getListCombo } from "appRedux/actions/ComboAction";
import {
  getListCommissionCombo,
  createCommissionCombo,
  resetCommissionCombo,
  getListLevelCommission
} from "../actions/SettingCommissionAction";

import CircularProgress from "components/CircularProgress";
import HeaderPackage from "components/Generals/HeaderPackage";
import ListComboCommission from "components/Sales/Commission/Combo/ListComboCommission";
import FormCommission from "components/Sales/Commission/Combo/FormComboCommission";

class CommissionComboContainer extends Component {

  componentDidMount(){
    if(this.props.levelCMSData.listLevel.length <= 0)
      this.props.onGetListLevelCMS()
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
      <div>
        <HeaderPackage match={this.props.match} />
        <Row>
          <Col lg={15} xl={15} md={24} sm={24} xs={24} className="bd-right">
            <ListComboCommission
              location={this.props.location}
              usersData={this.props.usersData}
              generalData={this.props.generalData}
              settingCMSData = {this.props.settingCMSData}
              onGetListCommissionCombo = {this.props.onGetListCommissionCombo}
              onResetCommissionCombo = {this.props.onResetCommissionCombo}
            />
          </Col>
          <Col lg={9} xl={9} md={24} sm={24} xs={24} className="bd-right">
            <FormCommission
              onRef={ref => (this.modalForm = ref)}
              location={this.props.location}
              generalData={this.props.generalData}
              settingCMSData = {this.props.settingCMSData}
              comboData={this.props.comboData}
              usersData={this.props.usersData}
              levelCMSData={this.props.levelCMSData}
              onShowModal={this.props.onShowModal}
              onGetListCombo={this.props.onGetListCombo}
              onCreateCommissionCombo={this.props.onCreateCommissionCombo}
              onGetListCommissionCombo = {this.props.onGetListCommissionCombo}
            />
          </Col>
        </Row>
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  /* function handle in ListPackage */
  onShowModalForEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    usersData: state.auth,
    generalData: state.generalReducer,
    comboData: state.ComboReducer,
    settingCMSData: state.SettingCommissionReducer,
    levelCMSData: state.CommissionReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // package
    onGetListCombo: () => dispatch(getListCombo()),
    //commission
    onGetListCommissionCombo: id => dispatch(getListCommissionCombo(id)),
    onCreateCommissionCombo: data => dispatch(createCommissionCombo(data)),
    onResetCommissionCombo: () => dispatch(resetCommissionCombo()),
    onGetListLevelCMS:() => dispatch(getListLevelCommission()),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissionComboContainer);
