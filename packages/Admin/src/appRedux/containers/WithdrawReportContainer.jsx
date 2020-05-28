import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  hideMessError,
  hideMessSuccess,
  showModalPackage
} from "../actions/GeneralAction";
import CircularProgress from "components/CircularProgress";
import HeaderPackage from "components/Generals/HeaderPackage";
import { getListWithdrawReport, updateWithdrawReport } from "../actions/ReportAction";

const ReportView = React.lazy(() =>
  import("components/Report/WithdrawReport/ReportView")
);
const FormUpdate = React.lazy(() =>
  import("components/Report/WithdrawReport/FormUpdate")
);

class WithdrawReportContainer extends PureComponent {
  componentDidMount() {
    this.props.onGetListWithdrawReport();
  }
  componentDidUpdate() {
    if (this.props.generalData.flagError) {
      message.error(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.hideMessError();
      }, 100);
    }
    if (this.props.generalData.flagSuccess) {
      message.success(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.hideMessSuccess();
      }, 100);
    }
  }
  showFormUpdate = data => {
    this.formUpdate.showFormEdit(data)
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
        <HeaderPackage {...this.props} />
        <ReportView
          reportData={this.props.reportData}
          generalData={this.props.generalData}
          showFormUpdate={this.showFormUpdate}
        />
        <FormUpdate
          onRef={ref => (this.formUpdate = ref)}
          generalData={this.props.generalData}
          onShowModal={this.props.onShowModal}
          onUpdateWithdraw={this.props.onUpdateWithdraw}
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
    onGetListWithdrawReport: () => dispatch(getListWithdrawReport()),
    onUpdateWithdraw: data => dispatch(updateWithdrawReport(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawReportContainer);
