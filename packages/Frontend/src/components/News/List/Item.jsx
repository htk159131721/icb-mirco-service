import React, { PureComponent } from "react";
import { Button, Icon, Card } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import IntlMessages from "util/IntlMessages";
const { Meta } = Card;
export default class Item extends PureComponent {
  showItemPost = data => {
    let result = (
      <Card
        style={{ width: "100%", marginTop: 16 }}
        loading={this.props.generalData.loadingBTN}
      >
        <Meta description="Post not found" />
      </Card>
    );
    if (data.listNews.length > 0) {
      result = data.listNews.map((news, index) => {
        return (
          <div key={index} className="gx-product-item gx-product-horizontal">
            <div className="gx-product-image">
              <div className="gx-grid-thumb-equal">
                <span className="gx-link gx-grid-thumb-cover">
                <Link to={`/news-detail/${news.id}`}>
                  <img
                    alt="Remy Sharp"
                    src={process.env.REACT_APP_URL + news.image}
                  /></Link>
                </span>
              </div>
            </div>
            <div className="gx-product-body">
              <h3 className="gx-product-title">{news.title}</h3>
              <div className="ant-row-flex">
                <small><Icon type="clock-circle" theme="twoTone" /> {moment(news.created_at).fromNow()} </small>
              </div>
              <p>{news.intro}</p>
            </div>

            <div className="gx-product-footer">
              <Link to={`/news-detail/${news.id}`}>
                <Button type="primary">
                  <IntlMessages id="eCommerce.readMore" />
                </Button>
              </Link>
            </div>
          </div>
        );
      });
    } 
    return result;
  };
  render() {
    return this.showItemPost(this.props.newsData);
  }
}
