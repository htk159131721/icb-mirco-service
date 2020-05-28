import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  showModalPackage,
  hideMessError,
  hideMessSuccess
} from "appRedux/actions/GeneralAction";
import * as UserAction from "appRedux/actions/UserActions";
import { getDataCountries, getDataCities } from "../actions/GeoraphyAction";
import {getListRole} from '../actions/RoleAction'

import CircularProgress from "components/CircularProgress";
import ListUser from "components/Users/ListUser";
import FormUser from "components/Users/FormUser";
import HeaderPackage from "components/Generals/HeaderPackage";

class UserContainner extends Component {
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
        <HeaderPackage {...this.props} />
        <ListUser
          onShowModal={this.props.onShowModal}
          onShowModalEdit={this.onShowModalForEdit}
          generalData={this.props.generalData}
          roleData = {this.props.roleData}
          onGetListUser={this.props.onGetListUser}
          onDeleteUser={this.props.onDeleteUser}
          usersData={this.props.usersData}
          usersManage={this.props.usersManage}
        />
        <FormUser
          onRef={ref => (this.modalForm = ref)}
          roleData = {this.props.roleData}
          generalData={this.props.generalData}
          usersData={this.props.usersData}
          georaphyData = {this.props.georaphyData}
          onShowModal={this.props.onShowModal}
          onCreateUser={this.props.onCreateUser}
          onUpdateUser={this.props.onUpdateUser}
          onGetDataCountries=  {this.props.onGetDataCountries}
          onGetDataCities = {this.props.onGetDataCities}
          onGetListRole = {this.props.onGetListRole}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  /* function handle in ListUser */
  onShowModalForEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    generalData: state.generalReducer,
    georaphyData: state.GeoraphyReducer,
    roleData: state.RoleReducer,
    usersData: state.auth,
    usersManage: state.UserReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    //user
    onGetListUser: () => dispatch(UserAction.getListUser()),
    onCreateUser: data => dispatch(UserAction.createUser(data)),
    onUpdateUser: data => dispatch(UserAction.updateUser(data)),
    onDeleteUser: id => dispatch(UserAction.deleteUser(id)),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    // georaphy
    onGetDataCountries: () => dispatch(getDataCountries()),
    onGetDataCities: nameCountry => dispatch(getDataCities(nameCountry)),
    // role
    onGetListRole: () => dispatch(getListRole())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainner);
