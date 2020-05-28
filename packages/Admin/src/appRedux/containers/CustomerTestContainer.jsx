import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  hideMessError,
  hideMessSuccess,
  showModalPackage
} from "../actions/GeneralAction";
import { getDataCountries, getDataCities } from "../actions/GeoraphyAction";
import {getListCustomer, createCustomer, updateCustomer, deleteCustomer} from '../actions/CustomerAction'

import CircularProgress from "components/CircularProgress";
import FormCustomer from "components/Customer/TestUserFE/FormCustomer";

class CustomerTestContainner extends Component {
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
        <FormCustomer
          onRef={ref => (this.modalForm = ref)}
          generalData={this.props.generalData}
          usersData = {this.props.usersData}
          georaphyData={this.props.georaphyData}
          onShowModal={this.props.onShowModal}
          onGetDataCountries = {this.props.onGetDataCountries}
          onGetDataCities = {this.props.onGetDataCities}
          onCreateCustomer = {this.props.onCreateCustomer}
          onUpdateCustomer = {this.props.onUpdateCustomer}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  /* function handle in ListCustomer */
  onShowModalForEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    usersData: state.auth,
    generalData: state.generalReducer,
    georaphyData: state.GeoraphyReducer,
    customerData: state.CustomerReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // general
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    //customer
    onGetListCustomer: () => dispatch(getListCustomer()),
    onCreateCustomer: data => dispatch(createCustomer(data)),
    onUpdateCustomer: data => dispatch(updateCustomer(data)),
    onDeleteCustomer: id => dispatch(deleteCustomer(id)),
    // georaphy
    onGetDataCountries: () => dispatch(getDataCountries()),
    onGetDataCities: nameCountry => dispatch(getDataCities(nameCountry))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerTestContainner);
