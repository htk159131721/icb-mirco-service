import React, { Component } from "react";
import { connect } from "react-redux";
import { message, Row, Col } from "antd";
import {
  showModalPackage,
  showModalDynamic,
  hideMessError,
  hideMessSuccess
} from "../actions/GeneralAction";
import { getDataCountries, getDataCities } from "../actions/GeoraphyAction";
import {
  updateProfile,
  getListBank,
  createBank,
  updateBank,
  deleteBank,
  changePassword,
  updateStateUser
} from "../actions/UserAction";
import ProfileHeader from "components/ProfileCus/ProfileHeader";
import ProfileInfo from "components/ProfileCus/ProfileInfo";
import Contact from "components/ProfileCus/ProfileContact";
import CircularProgress from "components/CircularProgress";
class ProfileContainer extends Component {
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
      <div className="padding-wrapper">
        <ProfileHeader
          userData={this.props.userData}
          onUpdateProfile={this.props.onUpdateProfile}
          onUpdateStateUser={this.props.onUpdateStateUser}
        />
        <div className="gx-profile-content">
          <Row>
            <Col xl={16} lg={14} md={14} sm={24} xs={24}>
              <ProfileInfo
                location={this.props.location}
                userData={this.props.userData}
                georaphyData={this.props.georaphyData}
                generalData={this.props.generalData}
                onShowModal={this.props.onShowModal}
                onShowModalDynamic={this.props.onShowModalDynamic}
                onGetDataCountries={this.props.onGetDataCountries}
                onGetDataCities={this.props.onGetDataCities}
                onUpdateProfile={this.props.onUpdateProfile}
                onGetListBank={this.props.onGetListBank}
                onCreateBank={this.props.onCreateBank}
                onUpdateBank={this.props.onUpdateBank}
                onDeleteBank={this.props.onDeleteBank}
              />
            </Col>
            <Col xl={8} lg={10} md={10} sm={24} xs={24}>
              <Contact
                userData={this.props.userData}
                generalData={this.props.generalData}
                onShowModalDynamic={this.props.onShowModalDynamic}
                onChangePassword={this.props.onChangePassword}
              />
            </Col>
          </Row>
        </div>
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    generalData: state.GeneralReducer,
    userData: state.UserReducer,
    georaphyData: state.GeoraphyReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    onShowModalDynamic: (name, boolean) =>
      dispatch(showModalDynamic(name, boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    // georaphy
    onGetDataCountries: () => dispatch(getDataCountries()),
    onGetDataCities: nameCountry => dispatch(getDataCities(nameCountry)),
    //user
    onUpdateProfile: data => dispatch(updateProfile(data)),
    onChangePassword: data => dispatch(changePassword(data)),
    onUpdateStateUser: data => dispatch(updateStateUser(data)),
    //bank
    onGetListBank: () => dispatch(getListBank()),
    onCreateBank: data => dispatch(createBank(data)),
    onUpdateBank: data => dispatch(updateBank(data)),
    onDeleteBank: id => dispatch(deleteBank(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
