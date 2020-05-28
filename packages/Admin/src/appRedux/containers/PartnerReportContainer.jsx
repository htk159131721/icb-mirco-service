import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "components/CircularProgress";
import HeaderSearch from "components/Report/HeaderSearch";
import ReportView from "components/Report/PartnerReport/ReportView";
import { getListPartner } from "../actions/ReportAction";

class PartnerReportContainer extends Component {
  render() {
    return (
      <div>
        <HeaderSearch page="partnerReport" {...this.props} />
        <ReportView
          reportData={this.props.reportData}
          onGetListPartnerReport={this.props.onGetListPartnerReport}
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
    onGetListPartnerReport: () => dispatch(getListPartner())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnerReportContainer);
