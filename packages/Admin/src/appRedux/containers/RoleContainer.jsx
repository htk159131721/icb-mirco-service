import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, message } from "antd";

import { showModalPackage, hideMessError, hideMessSuccess } from "../actions/GeneralAction";
import {getDataGroupPermission, getDataPermissionByGroup, getDataListPermission} from '../actions/PermissionAction'
import {getListRole, createRole, updateRole, deleteRole} from '../actions/RoleAction'

import HeaderPackage from "components/Generals/HeaderPackage";
import CircularProgress from "components/CircularProgress";
import ListRole from "components/Roles/ListRole";
import FormRole from "components/Roles/FormRole";

class Role extends Component {
  componentDidUpdate() {
    if(this.props.generalData.flagSuccess){
      message.success(this.props.generalData.messAlert)
      setTimeout(() => {
        this.props.hideMessSuccess()
      }, 100)
    }
    if(this.props.generalData.flagError){
      message.error(this.props.generalData.messAlert)
      setTimeout(() => {
        this.props.hideMessError()
      }, 100)
    }
  }
  render() {
    return (
      <div>
        <HeaderPackage match={this.props.match} />
        <Row>
          <Col className="bd-right" xl={24} lg={24} md={24} sm={24} xs={24}>
            <ListRole
              onShowModalForEdit={this.onShowModalForEdit}
              onShowModal = {this.props.onShowModal}
              usersData={this.props.usersData}
              generalData={this.props.generalData}
              permissionsData = {this.props.permissionsData}
              rolesData = {this.props.rolesData}
              onGetListRole = {this.props.onGetListRole}
              onDeleteRole = {this.props.onDeleteRole}
            />
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <FormRole
              onRef={ref => (this.formAdd = ref)}
              generalData={this.props.generalData}
              usersData={this.props.usersData}
              permissionsData = {this.props.permissionsData}
              onShowModal = {this.props.onShowModal}
              onGetDataGroupPermission = {this.props.onGetDataGroupPermission}
              onGetDataPermissionByGroup = {this.props.onGetDataPermissionByGroup}
              onGetDataListPermission = {this.props.onGetDataListPermission}
              onCreateRole = {this.props.onCreateRole}
              onUpdateRole = {this.props.onUpdateRole}
            />
          </Col>
        </Row>
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
    this.formAdd.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    generalData: state.generalReducer,
    usersData: state.auth,
    permissionsData: state.PermissionReducer,
    rolesData: state.RoleReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetDataGroupPermission: () => dispatch(getDataGroupPermission()),
    onGetDataPermissionByGroup: groupId => dispatch(getDataPermissionByGroup(groupId)),
    onGetDataListPermission: () => dispatch(getDataListPermission()),
    //role 
    onGetListRole: () => dispatch(getListRole()),
    onCreateRole: (data) => dispatch(createRole(data)),
    onUpdateRole: (data) => dispatch(updateRole(data)),
    onDeleteRole: (id) => dispatch(deleteRole(id)),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Role);
