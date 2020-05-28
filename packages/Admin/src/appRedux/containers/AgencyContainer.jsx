import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  showModalPackage,
  hideMessError,
  hideMessSuccess
} from "appRedux/actions/GeneralAction";
import * as AgencyAction from "appRedux/actions/AgencyAction";
import { getDataCountries, getDataCities } from "../actions/GeoraphyAction";
import {getListRole} from '../actions/RoleAction'

import CircularProgress from "components/CircularProgress";
import ListAgency from "components/Agency/ListAgency";
import FormAgency from "components/Agency/FormAgency";
import HeaderPackage from "components/Generals/HeaderPackage";

class AgencyContainner extends Component {
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
        <ListAgency
          onShowModal={this.props.onShowModal}
          onShowModalEdit={this.onShowModalForEdit}
          onGetListAgency={this.props.onGetListAgency}
          onDeleteAgency={this.props.onDeleteAgency}
          generalData={this.props.generalData}
          roleData = {this.props.roleData}
          usersData={this.props.usersData}
          agenciesData={this.props.agenciesData}
        />
        <FormAgency
          onRef={ref => (this.modalForm = ref)}
          roleData = {this.props.roleData}
          generalData={this.props.generalData}
          usersData={this.props.usersData}
          georaphyData = {this.props.georaphyData}
          // function
          onShowModal={this.props.onShowModal}
          onCreateAgency={this.props.onCreateAgency}
          onUpdateAgency={this.props.onUpdateAgency}
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
  /* function handle in ListAgency */
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
    agenciesData: state.AgencyReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    //user
    onGetListAgency: () => dispatch(AgencyAction.getListAgency()),
    onCreateAgency: data => dispatch(AgencyAction.createAgency(data)),
    onUpdateAgency: data => dispatch(AgencyAction.updateAgency(data)),
    onDeleteAgency: id => dispatch(AgencyAction.deleteAgency(id)),
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
)(AgencyContainner);
