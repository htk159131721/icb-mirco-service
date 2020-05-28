import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Item from "./Item";
import { getListNews } from "../../../appRedux/actions/NewsAction";
import CircularProgress from "components/CircularProgress";
class Index extends PureComponent {
  componentDidMount() {
    this.props.onGetListNews();
  }
  render() {
    const { generalData } = this.props;
    return (
      <div className="padding-wrapper">
        <Item
          newsData={this.props.newsData}
          generalData={this.props.generalData}
        />
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
    onGetListNews: () => dispatch(getListNews())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
