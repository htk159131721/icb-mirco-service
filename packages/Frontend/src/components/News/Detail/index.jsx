import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Detail from "./Detail";
import Relatest from "./Relatest";
import {
  getNewsDetail,
  getListNews
} from "../../../appRedux/actions/NewsAction";
import CircularProgress from "components/CircularProgress";
class Index extends PureComponent {
  componentDidMount() {
    const { match } = this.props,
      { id } = match.params;
    if (id) this.props.onGetDetailNews(id);

    if (this.props.newsData.listNews.length <= 0) this.props.onGetListNews();
  }
  render() {
    const { generalData } = this.props;
    return (
      <div className="padding-wrapper">
        <Detail
          newsData={this.props.newsData}
          generalData={this.props.generalData}
        />
        {this.props.newsData.listNews.length > 0 ? (
          <Relatest newsData={this.props.newsData} />
        ) : null}

        {generalData.loaderTotal ? (
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
    newsData: state.NewsReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetDetailNews: id => dispatch(getNewsDetail(id)),
    onGetListNews: () => dispatch(getListNews())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
