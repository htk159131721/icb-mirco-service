import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";
import {
  showModalPackage,
  hideMessError,
  hideMessSuccess
} from "../actions/GeneralAction";
import {getListLevelCommission} from "../actions/SettingCommissionAction"
import * as NewsAction from "appRedux/actions/NewsAction";
import CircularProgress from "components/CircularProgress";
import Header from "components/Generals/HeaderPackage";
import ListNews from "components/News/ListNews";
import FormNews from "components/News/FormNews";

class NewsContainer extends Component {
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
  componentDidMount() {
    if(this.props.levelCMS.listLevel.length <= 0) this.props.onGetListLevelCMS()
  }
  render() {
    return (
      <div>
        <Header match={this.props.match} />
        <ListNews
          onShowModalForEdit={this.onShowModalForEdit}
          usersData={this.props.usersData}
          dataNews={this.props.dataNews}
          generalData={this.props.generalData}
          getListNews={this.props.getListNews}
          onDeleteNews={this.props.onDeleteNews}
        />
        <FormNews
          onRef={ref => (this.modalForm = ref)}
          generalData={this.props.generalData}
          levelCMS={this.props.levelCMS}
          usersData={this.props.usersData}
          onShowModal={this.props.onShowModal}
          dataCateNews={this.props.dataCateNews}
          onGetListCateNews={this.props.onGetListCateNews}
          onCreateNews={this.props.onCreateNews}
          onUpdateNews={this.props.onUpdateNews}
        />
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
  /* function handle in ListNews */
  onShowModalForEdit = record => {
    this.modalForm.showFormEdit(record);
  };
  /* function handle in ModalForm */
}
const mapStateToProps = state => {
  return {
    usersData: state.auth,
    generalData: state.generalReducer,
    dataNews: state.NewsReducer,
    levelCMS: state.CommissionReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    // package
    getListNews: () => dispatch(NewsAction.getListNews()),
    onCreateNews: data => dispatch(NewsAction.createNews(data)),
    onUpdateNews: data => dispatch(NewsAction.updateNews(data)),
    onDeleteNews: id => dispatch(NewsAction.deleteNews(id)),
    onGetListLevelCMS: () => dispatch(getListLevelCommission()),
    // general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer);
