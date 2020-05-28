import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  showModalPackage,
  hideMessError,
  hideMessSuccess
} from "../actions/GeneralAction";

import * as ComboAction from "appRedux/actions/ComboAction";
import { getListPackage } from "../actions/PackageAction";

import CircularProgress from "components/CircularProgress";
import HeaderCombo from "components/Generals/HeaderPackage";
import ListCombo from "components/Sales/Combo/ListCombo";
import ModalForm from "components/Sales/Combo/FormCombo";

class ComboContainer extends Component {
  componentDidUpdate() {
    if (this.props.generalData.flagSuccess) {
      message.success(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.hideMessSuccess();
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
      <div>
        <HeaderCombo match={this.props.match} />
        <ListCombo
          onShowModalForEdit={this.onShowModalForEdit}
          comboData={this.props.comboData}
          packageData={this.props.packageData}
          usersData={this.props.usersData}
          generalData={this.props.generalData}
          dataCateCombo={this.props.dataCateCombo}
          getListCombo={this.props.getListCombo}
          getListPackage={this.props.getListPackage}
          onDeleteCombo={this.props.onDeleteCombo}
          onUpdatePosition={this.props.onUpdatePosition}
        />
        <ModalForm
          onRef={ref => (this.modalForm = ref)}
          packageData={this.props.packageData}
          generalData={this.props.generalData}
          usersData={this.props.usersData}
          getListPackage={this.props.getListPackage}
          onShowModal={this.props.onShowModal}
          onCreateCombo={this.props.onCreateCombo}
          onUpdateCombo={this.props.onUpdateCombo}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  /* function handle in ListCombo */
  onShowModalForEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    usersData: state.auth,
    generalData: state.generalReducer,
    comboData: state.ComboReducer,
    packageData: state.PackageReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // package
    getListPackage: () => dispatch(getListPackage()),
    //combo
    getListCombo: () => dispatch(ComboAction.getListCombo()),
    onCreateCombo: data => dispatch(ComboAction.createCombo(data)),
    onUpdateCombo: data => dispatch(ComboAction.updateCombo(data)),
    onDeleteCombo: id => dispatch(ComboAction.deleteCombo(id)),
    onUpdatePosition: data => dispatch(ComboAction.updatePositionCombo(data)),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComboContainer);
