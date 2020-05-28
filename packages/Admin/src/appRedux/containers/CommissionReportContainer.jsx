import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import { hideMessError, hideMessSuccess, showModalPackage } from "../actions/GeneralAction";
import CircularProgress from "components/CircularProgress";
import HeaderSearch from "components/Report/HeaderSearch";
//import ReportView from "components/Report/CommissionReport/ReportView";
import { getListCommissionReport } from "../actions/ReportAction";

const ReportView = React.lazy(() =>
  import("components/Report/CommissionReport/ReportView")
);

class CommissionReportContainer extends Component {
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
      <React.Suspense
        fallback={
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        }
      >
        <HeaderSearch page="commissionReport" {...this.props} />
        <ReportView
          reportData={this.props.reportData}
          generalData={this.props.generalData}
          onShowModal={this.props.onShowModal}
          onGetListCommissionReport={this.props.onGetListCommissionReport}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </React.Suspense>
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
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    onGetListCommissionReport: () => dispatch(getListCommissionReport())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissionReportContainer);
