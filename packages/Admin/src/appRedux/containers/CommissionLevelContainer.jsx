import React, { Component } from "react";
import { connect } from "react-redux";
import { message, Row, Col } from "antd";
import {
  showModalPackage,
  hideMessError,
  hideMessSuccess
} from "../actions/GeneralAction";
import CircularProgress from "components/CircularProgress";
import ListLevelCommission from "components/Commission/Level/ListLevelCommission";
import FormLevelCommission from "components/Commission/Level/FormLevelCommission";
import {
  getListLevelCommission,
  createLevelCommission,
  updateLevelCommission,
  deleteLevelCommission
} from "../actions/SettingCommissionAction";

class CommissionLevelContainer extends Component {
  componentDidMount() {
    const { cmsData } = this.props;
    if (cmsData.listLevel.length <= 0) this.props.onGetListLevelCMS();
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
        <Row>
          <Col lg={15} xl={15} md={24} sm={24} xs={24} className="bd-right">
            <ListLevelCommission
              usersData={this.props.usersData}
              generalData={this.props.generalData}
              cmsData={this.props.cmsData}
              onDeleteLevelCMS={this.props.onDeleteLevelCMS}
              onShowFormEdit={this.onShowFormEdit}
            />
          </Col>
          <Col lg={9} xl={9} md={24} sm={24} xs={24} className="bd-right">
            <FormLevelCommission
              onRef={ref => (this.modalForm = ref)}
              generalData={this.props.generalData}
              cmsData={this.props.cmsData}
              onCreateLevelCMS={this.props.onCreateLevelCMS}
              onUpdateLevelCMS={this.props.onUpdateLevelCMS}
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
  onShowFormEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    usersData: state.auth,
    generalData: state.generalReducer,
    cmsData: state.CommissionReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    // level cms
    onGetListLevelCMS: () => dispatch(getListLevelCommission()),
    onCreateLevelCMS: data => dispatch(createLevelCommission(data)),
    onUpdateLevelCMS: data => dispatch(updateLevelCommission(data)),
    onDeleteLevelCMS: id => dispatch(deleteLevelCommission(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissionLevelContainer);
