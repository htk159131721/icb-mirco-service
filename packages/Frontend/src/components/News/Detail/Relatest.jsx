import React, { Component } from "react";
import { Col, Row, Avatar, Icon } from "antd";
import moment from "moment";
import {Link} from "react-router-dom"
import CardBox from "components/CardBox/index";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Relatest extends Component {
  /**
   * @function showRelatestPost
   */
  showRelatestPost = data => {
    let result = null;
    if (data.listNews.length > 0) {
      result = data.listNews.map((news, index) => {
        return (
          <div key={index} className="gx-classic-testimonial gx-slide-item">
            <Link to={`/news-detail/${news.id}`}>
            <Avatar src={process.env.REACT_APP_URL + news.image} alt="ICB" />
            <h3 className="gx-title">{news.title}</h3>
            <small className="gx-post-designation">
              <Icon type="clock-circle" theme="twoTone" />
              {moment(news.created_at).fromNow()}
            </small>
            <p className="gx-description">{news.intro}</p>
            </Link>
          </div>
        );
      });
    }
    return result;
  };
  render() {
    const { newsData } = this.props;
    const options1 = {
      dots: true,
      infinite: true,
      speed: 500,
      marginLeft: 10,
      marginRight: 10,
      slidesToShow: newsData.listNews.length >= 3 ? 3 : 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: newsData.listNews.length >= 3 ? 3 : 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: newsData.listNews.length >= 2 ? 2 : 1,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Row>
        <Col span={24}>
          <CardBox
            styleName="gx-text-center"
          >
            <Slider {...options1}>{this.showRelatestPost(newsData)}</Slider>
          </CardBox>
        </Col>
      </Row>
    );
  }
}
