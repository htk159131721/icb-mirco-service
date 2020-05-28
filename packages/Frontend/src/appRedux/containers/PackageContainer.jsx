import React, { Component } from "react";
import { connect } from "react-redux";
import {message} from 'antd'

import { getDataCountries, getDataCities } from "../actions/GeoraphyAction";
import { createCart } from "../actions/CartAction";
import { showModalPackage, hideMessError, hideMessSuccess } from "../actions/GeneralAction";
import {getListPackage, buyPackage}  from "appRedux/actions/ShopAction";
import ItemPackage from 'components/Shop/Package/ItemPackage'
import FormUser from 'components/Shop/General/FormUser'
import DetailPackage from 'components/Shop/Package/DetailPackage'
import CircularProgress from "components/CircularProgress";
class PackageContainer extends Component {
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
       <ItemPackage
        onGetListPackage = {this.props.onGetListPackage}
        onBuyPackage = {this.props.onBuyPackage}
        onShowModal = {this.props.onShowModal}
        onShowDetail = {this.onShowDetail}
        onSetDataPackage = {this.onSetDataPackage}
        packageData = {this.props.packageData}
        generalData = {this.props.generalData}
       />
       <DetailPackage 
          onRef = {ref => this.detailRef = ref}
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
  onShowDetail = data => {
    this.detailRef.showDetail(data);
  };
  onSetDataPackage = data => {
    this.formUser.setDataPackage(data)
  }
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    generalData: state.GeneralReducer,
    packageData: state.ShopReducer,
    userData: state.UserReducer,
    georaphyData: state.GeoraphyReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // package
    onGetListPackage: () => dispatch(getListPackage()),
    onBuyPackage: data => dispatch(buyPackage(data)),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
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
)(PackageContainer);
