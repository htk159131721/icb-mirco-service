import React, { Component } from "react";
import Widget from "components/Widget/index";
import IntlMessage from "util/IntlMessages";

export default class News extends Component {
  render() {
    return (
      <Widget
        title={
          <h2 className="h4 gx-text-capitalize gx-mb-0">
            <IntlMessage id="home.News" />
          </h2>
        }
      >
        <div className="gx-news-item">
          <div className="gx-news-thumb">
            <img
              className="gx-width-75 gx-rounded-lg"
              src="https://via.placeholder.com/150"
              alt="..."
            />
          </div>
          <div className="gx-news-content">
            <h4 className="gx-mt-0">Title for the post</h4>
            <p className="gx-mb-2">subTitle</p>
          </div>
        </div>
      </Widget>
    );
  }
}
