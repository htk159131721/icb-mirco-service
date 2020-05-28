import React, { Component } from "react";
import { connect } from "react-redux";
import {message} from 'antd'

import { getDataCountries, getDataCities } from "../actions/GeoraphyAction";
import { showModalPackage, hideMessError, hideMessSuccess } from "../actions/GeneralAction";
import { getListCombo } from "../actions/ShopAction";
import { createCart } from "../actions/CartAction";
import ItemCombo from 'components/Shop/Combo/ItemCombo'
import FormUser from 'components/Shop/General/FormUser'
import CircularProgress from "components/CircularProgress";
class ComboContainer extends Component {
  componentDidUpdate() {
    if(this.props.generalData.flagSuccess){
      message.success(this.props.generalData.messAlert)
      setTimeout(() => {
        this.props.hideMessSuccess()
        this.props.onShowModal(false)
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
      <div className="padding-wrapper">
        <ItemCombo 
          comboData = {this.props.comboData}
          generalData = {this.props.generalData}
          onSetDataPackage = {this.onSetDataPackage}
          onShowModal = {this.props.onShowModal}
          onGetListCombo = {this.props.onGetListCombo}
        />
        <FormUser 
          onRef = {ref => this.formUser = ref}
          userData = {this.props.userData}
          georaphyData = {this.props.georaphyData}
          generalData = {this.props.generalData}
          onShowModal = {this.props.onShowModal}
          onCreateCart = {this.props.onCreateCart}
          onGetDataCountries=  {this.props.onGetDataCountries}
          onGetDataCities = {this.props.onGetDataCities}
       />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  onSetDataPackage = data => {
    this.formUser.setDataPackage(data)
  }
  onShowModalForEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    generalData: state.GeneralReducer,
    comboData: state.ShopReducer,
    userData: state.UserReducer,
    georaphyData: state.GeoraphyReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    //combo
    onGetListCombo: () => dispatch(getListCombo()),
    //cart
    onCreateCart: data => dispatch(createCart(data)),
     // georaphy
     onGetDataCountries: () => dispatch(getDataCountries()),
     onGetDataCities: nameCountry => dispatch(getDataCities(nameCountry)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComboContainer);
