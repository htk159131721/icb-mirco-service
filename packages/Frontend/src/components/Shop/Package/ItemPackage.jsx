import React, { Component } from "react";
import Widget from "components/Widget/index";
import { Button, Row, Col, Modal, Radio } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import CurrentFormat from "react-currency-format"; 

import IntlMessages from "util/IntlMessages";

export default class ItemPackage extends Component {
  state = {
    info: false,
    packageData: null,
    paymentMethod: 1
  };
  /*************************************************** */
  onShowConfirm = data => {
    data.type = "package"
    this.setState({ info: true, packageData: data })
  }
  onCancelBuyPackage = () => this.setState({ info: false });
  onBuyPackage = () => {
    this.setState({ info: false });
    this.props.onShowModal(true);
    this.props.onSetDataPackage(this.state.packageData)
  };
  
  componentDidMount() {
    const { packageData } = this.props;
    if (packageData.packages.length <= 0) this.props.onGetListPackage();
  }
  onShowPackage = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Col key={index} lg={8} xl={8} md={8} sm={12} xs={24}>
            <div className="gx-product-item gx-product-vertical">
              <div className="gx-product-image">
                <div className="gx-grid-thumb-equal">
                  <span className="gx-link gx-grid-thumb-cover">
                    <img
                      alt="ICB"
                      src={process.env.REACT_APP_URL + obj.image}
                    />
                  </span>
                </div>
              </div>

              <div className="gx-product-body">
                <h3 className="gx-product-title">{obj.title}</h3>
                <div className="ant-row-flex">
                  <h3 style={{color: "#038fde"}}>
                    <CurrentFormat
                      prefix="$"
                      value={(obj.price_sale && obj.price_sale < obj.price) ? obj.price_sale : obj.price}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </h3>
                  {/* <h5 className="gx-text-muted gx-px-2">
                    <del>{mrp}</del>
                  </h5> */}
                  {/* <h5 className="gx-text-success">{offer} off</h5> */}
                </div>
                <p>{obj.description}</p>
              </div>

              <div className="gx-product-footer">
                <Button onClick={() => this.onShowConfirm(obj)} variant="raised">
                  <IntlMessages id="eCommerce.addToCart" />
                </Button>

                <Button onClick = {e => this.props.onShowDetail(obj)} type="primary">
                  <IntlMessages id="eCommerce.readMore" />
                </Button>
              </div>
            </div>
          </Col>
        );
      });
    }
    return result;
  };
  render() {
    const { packageData, generalData } = this.props;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    return (
      <>
        <Row>{this.onShowPackage(packageData.packages)}</Row>
        <SweetAlert
          show={this.state.info}
          info
          showCancel
          confirmBtnText={<IntlMessages id="sweetAlerts.continue" />}
          cancelBtnText={<IntlMessages id="sweetAlerts.Cancel" />}
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default"
          title={<IntlMessages id="sweetAlerts.areYouSure" />}
          onConfirm={this.onBuyPackage}
          onCancel={this.onCancelBuyPackage}
        />
      </>
    );
  }
}
