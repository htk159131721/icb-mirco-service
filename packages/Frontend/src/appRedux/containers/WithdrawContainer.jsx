import React, { Component } from "react";
import { connect } from "react-redux";
import {getListWithdraw} from "appRedux/actions/TransactionAction"
import List from "components/Transaction/Withdraw/List"
import Search from "components/Transaction/Withdraw/Search"
import CircularProgress from "components/CircularProgress";

class WithdrawContainer extends Component {
  componentDidMount() {
    this.props.onGetListWithDraw()
  }
  render() {
    const { generalData } = this.props;
    return (
      <div className="padding-wrapper">
        <Search
          withdrawData={this.props.withdrawData}
          onGetListWithDraw={this.props.onGetListWithDraw}
        />
        <List
          withdrawData={this.props.withdrawData}
        />
        {generalData.loaderTotal ? (
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
    withdrawData: state.TransactionReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // order
    onGetListWithDraw: queryString => dispatch(getListWithdraw(queryString))
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawContainer);
