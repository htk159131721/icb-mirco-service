import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, message } from "antd";

import {getListCatePackage, createCatePackage, updateCatePackage, deleteCatePackage} from '../actions/CatePackageAction'
import {hideMessError, hideMessSuccess} from '../actions/GeneralAction'

import CircularProgress from "components/CircularProgress";
import HeaderPackage from "components/Generals/HeaderPackage";
import ListCatePackage from "components/Sales/Package/CategoryPackage/ListCatePackage";
import AddCatePackage from "components/Sales/Package/CategoryPackage/AddCatePackage";

class CatePackageContainer extends Component {
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
          <Col className="bd-right" xl={14} lg={14} md={24} sm={24} xs={24}>
            <ListCatePackage 
              onShowModalForEdit={this.onShowModalForEdit} 
              dataCates = {this.props.catePackages}
              usersData = {this.props.usersData}
              generalData = {this.props.generalData}
              onGetListCatePackage = {this.props.getListCatePackage}
              onDeleteCatePackage = {this.props.deleteCatePackage}
              />
          </Col>
          <Col xl={10} lg={10} md={24} sm={24} xs={24}>
            <AddCatePackage 
                usersData = {this.props.usersData}
                onRef = {ref => this.formAdd = ref}
                onCreateCatePackage = {this.props.createCatePackage}
                onUpdateCatePackage = {this.props.updateCatePackage}
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
    //users
    usersData: state.auth,
    generalData: state.generalReducer,
    catePackages: state.CatePackageReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // cate package
    getListCatePackage: () => dispatch(getListCatePackage()),
    createCatePackage: (data) => dispatch(createCatePackage(data)),
    updateCatePackage: (data) => dispatch(updateCatePackage(data)),
    deleteCatePackage: (id) => dispatch(deleteCatePackage(id)),
    // general
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatePackageContainer);
