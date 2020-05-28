import React, { Component } from "react";
import { Card, Icon } from "antd";
import moment from "moment"
const { Meta } = Card;

export default class Detail extends Component {
  /**
   * @function showDetail
   */
  showDetail = data => {
    let result = (
      <Card
        style={{ width: "100%", marginTop: 16 }}
        loading={this.props.generalData.loadingBTN}
      >
        <Meta description="This post not found" />
      </Card>
    );
    if (data.newsDetail) {
      result = (
        <div className="gx-card gx-pl-5 gx-pt-4">
          <h1
            style={{ textTransform: "uppercase" }}
          >
            {data.newsDetail.title}
          </h1>
          <small>
            <Icon type="clock-circle" theme="twoTone" />
            {moment(data.newsDetail.created_at).fromNow()}
          </small>
          <div className="content-post gx-pb-4 gx-pt-4" dangerouslySetInnerHTML={{__html: data.newsDetail.content}}></div>
        </div>
      );
    }
    return result;
  };
  render() {
    const { newsData } = this.props;
    return this.showDetail(newsData);
  }
}
