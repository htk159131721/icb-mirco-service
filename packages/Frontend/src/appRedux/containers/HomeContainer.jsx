import React, { Component } from "react";
import { connect } from "react-redux";
import { message, Row, Col } from "antd";
import {
  showModalPackage,
  hideMessError,
  hideMessSuccess,
  showModalDynamic
} from "../actions/GeneralAction";
import { getListBank } from "../actions/UserAction";
import {
  getDashboard,
  postSentEmailInvite,
  createWithdrawRequest
} from "../actions/Dashboard";
import QuickStatistics from "components/Home/QuickStatistics";
import Order from "components/Home/Order";
// import Commission from "components/Home/Commission";
// import Referal from "components/Home/Referal";
// import News from "components/Home/News";
import CircularProgress from "components/CircularProgress";
class HomeContainer extends Component {
  componentDidUpdate() {
    if (this.props.generalData.flagSuccess) {
      message.success(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.hideMessSuccess();
        this.props.onShowModal(false);
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
      <div className="padding-wrapper">
        <Row>
          <Col lg={24}>
            <QuickStatistics
              getDashboarData={this.props.getDashboarData}
              dashboardData={this.props.dashboardData}
              listBank={this.props.listBank}
              onShowModal={this.props.onShowModal}
              generalData={this.props.generalData}
              postSentEmailInvite={this.props.postSentEmailInvite}
              showModalDynamic={this.props.showModalDynamic}
              onCreateWithdraw={this.props.onCreateWithdraw}
              onGetListBank={this.props.onGetListBank}
            />
          </Col>
          {/* <Col lg={12} xl={12} md={12} sm={24} xs={24}>
            <Commission />
          </Col>
          <Col lg={12} xl={12} md={12} sm={24} xs={24}>
            <Referal />
          </Col> */}
          <Col lg={24} xl={24} md={24} sm={24} xs={24}>
            <Order
              getDashboarData={this.props.getDashboarData}
              dashboardData={this.props.dashboardData}
            />
          </Col>
          {/* <Col lg={8} xl={8} md={8} sm={24} xs={24}>
            <News />
          </Col> */}
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
    generalData: state.GeneralReducer,
    listBank: state.UserReducer.banks,
    dashboardData: state.DashboardReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    getDashboarData: () => dispatch(getDashboard()),
    onCreateWithdraw: data => dispatch(createWithdrawRequest(data)),
    postSentEmailInvite: email => dispatch(postSentEmailInvite(email)),
    showModalDynamic: (nameModal, boolean) =>
      dispatch(showModalDynamic(nameModal, boolean)),
    onGetListBank: () => dispatch(getListBank())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
