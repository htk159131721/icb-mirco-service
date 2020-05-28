import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  hideMessError,
  hideMessSuccess,
  showModalPackage
} from "../actions/GeneralAction";
import {getListSaleReport, getOrderDetailOfReport} from "../actions/ReportAction"
import CircularProgress from "components/CircularProgress";
import HeaderSearch from 'components/Report/HeaderSearch'
import ReportView from 'components/Report/SaleReport/ReportView'
import ModalDetailView from 'components/Report/SaleReport/ModalDetailView'

class SaleReportContainer extends Component {
  componentDidUpdate() {
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
        <HeaderSearch page="saleReport" {...this.props} />
        <ReportView
            reportData = {this.props.reportData}
            onTurnOnShowModal = {this.onTurnOnShowModal}
            onGetListSaleReport = {this.props.onGetListSaleReport}
        />
        <ModalDetailView 
            onRef={ref => (this.modalViewDetail = ref)}
            generalData={this.props.generalData}
            reportData={this.props.reportData}
            onGetDetailReport={this.props.onGetDetailReport}
            onShowModal={this.props.onShowModal}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  /* function handle in ListCustomer */
  onTurnOnShowModal = id => {
    this.modalViewDetail.showModal(id);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    generalData: state.generalReducer,
    reportData: state.ReportReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // general
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    //report
    onGetListSaleReport: () => dispatch(getListSaleReport()),
    onGetDetailReport: id => dispatch(getOrderDetailOfReport(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleReportContainer);
