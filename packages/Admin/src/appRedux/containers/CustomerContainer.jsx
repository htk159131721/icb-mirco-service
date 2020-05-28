import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import {
  hideMessError,
  hideMessSuccess,
  showModalPackage
} from "../actions/GeneralAction";
import { getDataCountries, getDataCities } from "../actions/GeoraphyAction";
import {
  getListCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  updateStatusCustomer
} from "../actions/CustomerAction";

import CircularProgress from "components/CircularProgress";
import ListCustomer from "components/Customer/ListCustomer";
import FormCustomer from "components/Customer/FormCustomer";
import HeaderPackage from "components/Generals/HeaderPackage";
import { getListLevelCommission } from "../actions/SettingCommissionAction";

class CustomerContainner extends PureComponent {

  componentDidMount() {
    if(this.props.cmsData.listLevel.length <= 0)
      this.props.onGetListLevelCMS()
  }

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
        <ListCustomer
          customerData={this.props.customerData}
          onShowModalEdit={this.onShowModalForEdit}
          usersData={this.props.usersData}
          generalData={this.props.generalData}
          onGetListCustomer={this.props.onGetListCustomer}
          onDeleteCustomer={this.props.onDeleteCustomer}
          onUpdateStatus={this.props.onUpdateStatus}
        />
        <FormCustomer
          onRef={ref => (this.modalForm = ref)}
          generalData={this.props.generalData}
          usersData={this.props.usersData}
          cmsData={this.props.cmsData}
          customerData={this.props.customerData}
          georaphyData={this.props.georaphyData}
          onShowModal={this.props.onShowModal}
          onGetDataCountries={this.props.onGetDataCountries}
          onGetDataCities={this.props.onGetDataCities}
          onCreateCustomer={this.props.onCreateCustomer}
          onUpdateCustomer={this.props.onUpdateCustomer}
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
  onShowModalForEdit = (record, type) => {
    this.modalForm.showFormEdit(record, type);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    usersData: state.auth,
    generalData: state.generalReducer,
    georaphyData: state.GeoraphyReducer,
    customerData: state.CustomerReducer,
    cmsData: state.CommissionReducer
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
    onUpdateStatus: data => dispatch(updateStatusCustomer(data)),
    // commission
    onGetListLevelCMS: () => dispatch(getListLevelCommission()),
    // georaphy
    onGetDataCountries: () => dispatch(getDataCountries()),
    onGetDataCities: nameCountry => dispatch(getDataCities(nameCountry))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerContainner);
