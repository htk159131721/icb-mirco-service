import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";
import {
  hideMessError,
  hideMessSuccess,
  showModalPackage
} from "../actions/GeneralAction";
import CircularProgress from "components/CircularProgress";
import ReferalView from "components/Referal/ReferalView";
import { getReferal } from "../actions/UserAction";

class ReferalContainner extends Component {
  render() {
    return (
      <div>
        <ReferalView 
          userData = {this.props.userData}
          onGetListRef = {this.props.onGetListRef}
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
    generalData: state.GeneralReducer,
    userData: state.UserReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // general
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    //customer
    onGetListRef: () => dispatch(getReferal())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReferalContainner);
