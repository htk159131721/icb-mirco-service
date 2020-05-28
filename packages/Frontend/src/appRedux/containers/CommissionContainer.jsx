import React, { Component } from "react";
import { connect } from "react-redux";
import {getListCommission} from "appRedux/actions/TransactionAction"
import ListCommission from "components/Commission/ListCommission"
import Search from "components/Commission/Search"
import CircularProgress from "components/CircularProgress";
class CommissionContainer extends Component {
  componentDidMount() {
    this.props.onGetListCMS()
  }
  render() {
    const { generalData } = this.props;
    return (
      <div className="padding-wrapper">
        <Search
          CMSData={this.props.CMSData}
          onGetListCMS={this.props.onGetListCMS}
        />
        <ListCommission
          CMSData={this.props.CMSData}
        />
        {generalData.loaderTotal ? (
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
    CMSData: state.TransactionReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // order
    onGetListCMS: queryString => dispatch(getListCommission(queryString))
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissionContainer);
