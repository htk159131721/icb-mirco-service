import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "components/CircularProgress";
import HeaderSearch from "components/Report/HeaderSearch";
import ReportView from "components/Report/PackageReport/ReportView";
import { getListPackageReport } from "../actions/ReportAction";

class PackageReportContainer extends Component {
  render() {
    return (
      <div>
        <HeaderSearch page="packageReport" {...this.props} />
        <ReportView
          reportData={this.props.reportData}
          onGetListPackageReport={this.props.onGetListPackageReport}
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
    onGetListPackageReport: () => dispatch(getListPackageReport())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageReportContainer);
