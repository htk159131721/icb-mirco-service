import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  hideMessError,
  hideMessSuccess,
  showModalPackage
} from "../actions/GeneralAction";

import CircularProgress from "components/CircularProgress";
import HeaderSearch from "components/Report/HeaderSearch";
import ReportView from "components/Report/PaymentReport/ReportView";
import { getListPayment } from "../actions/ReportAction";

class PaymentReportContainer extends Component {
  render() {
    return (
      <div>
        <HeaderSearch page="paymentReport" {...this.props} />
        <ReportView
          reportData={this.props.reportData}
          onGetListPaymentReport={this.props.onGetListPaymentReport}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
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
    onGetListPaymentReport: () => dispatch(getListPayment())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentReportContainer);
