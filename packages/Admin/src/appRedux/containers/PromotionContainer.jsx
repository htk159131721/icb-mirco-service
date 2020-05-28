import React, { Component } from "react";
import { connect } from "react-redux";
import {message} from 'antd'

import { showModalPackage, hideMessError, hideMessSuccess } from "../actions/GeneralAction";
import {getListPromotion, createPromotion, updatePromotion, deletePromotion} from "../actions/PromotionAction";

import CircularProgress from "components/CircularProgress";
import HeaderPromotion from "components/Generals/HeaderPackage";
import ListPromotion from "components/Promotion/ListPromotion";
import ModalForm from "components/Promotion/FormPromotion";

class PromotionContainer extends Component {
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
      <div>
        <HeaderPromotion match={this.props.match} />
        <ListPromotion
          onShowModalForEdit={this.onShowModalForEdit}
          dataPromotions={this.props.dataPromotions}
          usersData = {this.props.usersData}
          generalData={this.props.generalData}
          onGetListPromotion={this.props.getListPromotion}
          onDeletePromotion = {this.props.onDeletePromotion}
        />
        <ModalForm
          onRef={ref => (this.modalForm = ref)}
          generalData={this.props.generalData}
          usersData = {this.props.usersData}
          onShowModal={this.props.onShowModal}
          onCreatePromotion = {this.props.onCreatePromotion}
          onUpdatePromotion = {this.props.onUpdatePromotion}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  /* function handle in ListPromotion */
  onShowModalForEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    usersData: state.auth,
    generalData: state.generalReducer,
    dataPromotions: state.PromotionReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // package
    getListPromotion: () => dispatch(getListPromotion()),
    onCreatePromotion: data => dispatch(createPromotion(data)),
    onUpdatePromotion: data => dispatch(updatePromotion(data)),
    onDeletePromotion: id => dispatch(deletePromotion(id)),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PromotionContainer);
