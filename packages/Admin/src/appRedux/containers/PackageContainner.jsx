import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  showModalPackage,
  hideMessError,
  hideMessSuccess
} from "../actions/GeneralAction";
import { getListCatePackage } from "../actions/CatePackageAction";
import * as PackageAction from "appRedux/actions/PackageAction";

import CircularProgress from "components/CircularProgress";
import HeaderPackage from "components/Generals/HeaderPackage";
import ListPackage from "components/Sales/Package/Main/ListPackage";
import ModalForm from "components/Sales/Package/Main/AddPackage";

class PackageContainer extends Component {
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
        <HeaderPackage match={this.props.match} />
        <ListPackage
          onShowModalForEdit={this.onShowModalForEdit}
          dataPackages={this.props.packages}
          usersData={this.props.usersData}
          generalData={this.props.generalData}
          dataCatePackage={this.props.dataCatePackage}
          getListPackage={this.props.getListPackage}
          onGetListCatePackage={this.props.onGetListCatePackage}
          onDeletePackage={this.props.onDeletePackage}
          onUpdatePosition={this.props.onUpdatePosition}
        />
        <ModalForm
          onRef={ref => (this.modalForm = ref)}
          generalData={this.props.generalData}
          usersData={this.props.usersData}
          onShowModal={this.props.onShowModal}
          dataCatePackage={this.props.dataCatePackage}
          onGetListCatePackage={this.props.onGetListCatePackage}
          onCreatePackage={this.props.onCreatePackage}
          onUpdatePackage={this.props.onUpdatePackage}
        />
        {this.props.generalData.loaderTotal ? (
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
    usersData: state.auth,
    generalData: state.generalReducer,
    packages: state.PackageReducer,
    dataCatePackage: state.CatePackageReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // cate package
    onGetListCatePackage: () => dispatch(getListCatePackage()),
    // package
    getListPackage: () => dispatch(PackageAction.getListPackage()),
    onCreatePackage: data => dispatch(PackageAction.createPackage(data)),
    onUpdatePackage: data => dispatch(PackageAction.updatePackage(data)),
    onDeletePackage: id => dispatch(PackageAction.deletePackage(id)),
    onUpdatePosition: data =>
      dispatch(PackageAction.updatePositionPackage(data)),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageContainer);
