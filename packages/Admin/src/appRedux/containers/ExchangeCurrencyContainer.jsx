import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";
import {
  showModalPackage,
  hideMessError,
  hideMessSuccess
} from "appRedux/actions/GeneralAction";
import {getListCurrency, createCurrency, updateCurrency, deleteCurrency} from '../actions/CurrencyAction'
import CircularProgress from "components/CircularProgress";
import ListCurrency from "components/Currency/ListCurrency";
import FormCurrency from "components/Currency/FormCurrency";
import Header from "components/Generals/HeaderPackage";

class ExchangeCurrencyContainer extends Component {
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
        <Header {...this.props} />
        <ListCurrency
          onShowModal={this.props.onShowModal}
          onShowModalEdit={this.onShowModalForEdit}
          onGetListCurrency={this.props.onGetListCurrency}
          onDeleteCurrency={this.props.onDeleteCurrency}
          generalData={this.props.generalData}
          currencyData={this.props.currencyData}
          usersData={this.props.usersData}
        />
        <FormCurrency
          onRef={ref => (this.modalForm = ref)}
          generalData={this.props.generalData}
          // function
          onShowModal={this.props.onShowModal}
          onCreateCurrency={this.props.onCreateCurrency}
          onUpdateCurrency={this.props.onUpdateCurrency}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  /* function handle in ListCurrency */
  onShowModalForEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    generalData: state.generalReducer,
    usersData: state.auth,
    currencyData: state.CurrencyReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    //user
    onGetListCurrency: () => dispatch(getListCurrency()),
    onCreateCurrency: data => dispatch(createCurrency(data)),
    onUpdateCurrency: data => dispatch(updateCurrency(data)),
    onDeleteCurrency: id => dispatch(deleteCurrency(id)),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeCurrencyContainer);
