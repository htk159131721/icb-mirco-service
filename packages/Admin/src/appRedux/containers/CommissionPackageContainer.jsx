import React, { Component } from "react";
import { connect } from "react-redux";
import { message, Row, Col } from "antd";

import {
  showModalPackage,
  hideMessError,
  hideMessSuccess
} from "../actions/GeneralAction";
import { getListPackage } from "appRedux/actions/PackageAction";
import {
  getListCommissionPackage,
  createCommissionPackage,
  resetCommissionPackage,
  getListLevelCommission
} from "../actions/SettingCommissionAction";

import CircularProgress from "components/CircularProgress";
import HeaderPackage from "components/Generals/HeaderPackage";
import ListPackageCommission from "components/Sales/Commission/Package/ListPackageCommission";
import FormCommission from "components/Sales/Commission/Package/FormPackageCommission";

class CommissionPackageContainer extends Component {
  componentDidMount() {
    if (this.props.levelCMSData.listLevel.length <= 0)
      this.props.onGetListLevelCMS();
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
            <ListPackageCommission
              location={this.props.location}
              usersData={this.props.usersData}
              generalData={this.props.generalData}
              settingCMSData={this.props.settingCMSData}
              onGetListCommissionPackage={this.props.onGetListCommissionPackage}
              onResetCommissionPackage={this.props.onResetCommissionPackage}
            />
          </Col>
          <Col lg={9} xl={9} md={24} sm={24} xs={24} className="bd-right">
            <FormCommission
              onRef={ref => (this.modalForm = ref)}
              location={this.props.location}
              settingCMSData={this.props.settingCMSData}
              generalData={this.props.generalData}
              packageData={this.props.packageData}
              usersData={this.props.usersData}
              levelCMSData={this.props.levelCMSData}
              onShowModal={this.props.onShowModal}
              onGetListPackage={this.props.onGetListPackage}
              onCreateCommissionPackage={this.props.onCreateCommissionPackage}
              onGetListCommissionPackage={this.props.onGetListCommissionPackage}
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
    packageData: state.PackageReducer,
    settingCMSData: state.SettingCommissionReducer,
    levelCMSData: state.CommissionReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // package
    onGetListPackage: () => dispatch(getListPackage()),
    //commission
    onGetListCommissionPackage: id => dispatch(getListCommissionPackage(id)),
    onCreateCommissionPackage: data => dispatch(createCommissionPackage(data)),
    onResetCommissionPackage: () => dispatch(resetCommissionPackage()),
    onGetListLevelCMS: () => dispatch(getListLevelCommission()),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissionPackageContainer);
