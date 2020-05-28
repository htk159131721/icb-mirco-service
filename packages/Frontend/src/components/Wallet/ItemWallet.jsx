import React, { Component } from "react";
import Widget from "components/Widget/index";
import { Button, Col, Row } from "antd";

export default class ItemWallet extends Component {
  render() {
    return (
      <Row>
        <Col lg={8} md={8} sm={8} xs={24}>
          <Widget>
            <h2 className="h4 gx-mb-3">USD Balance</h2>
            
                <div className="ant-row-flex">
                  <h2 className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">
                    $179,626
                  </h2>
                  <h4 className="gx-pt-2 gx-chart-up">
                    64% <i className="icon icon-menu-up gx-fs-sm" />
                  </h4>
                </div>
                <p className="gx-text-grey">Overall balance</p>
                <div className="ant-row-flex gx-mb-3 gx-mb-md-2">
                  <Button className="gx-mr-2" type="primary">
                    Deposit
                  </Button>
                  <Button className="gx-btn-cyan">Withdraw</Button>
                </div>

                <p className="gx-text-primary gx-pointer gx-d-none gx-d-sm-block gx-mb-1">
                  <i className="icon icon-add-circle gx-fs-lg gx-d-inline-flex gx-vertical-align-middle" />{" "}
                  Add New Wallet
                </p>
          </Widget>
        </Col>
        <Col lg={8} md={8} sm={8} xs={24}>
          <Widget>
            <h2 className="h4 gx-mb-3">ICB Point Balance</h2>
            
                <div className="ant-row-flex">
                  <h2 className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">
                    $179,626
                  </h2>
                  <h4 className="gx-pt-2 gx-chart-up">
                    64% <i className="icon icon-menu-up gx-fs-sm" />
                  </h4>
                </div>
                <p className="gx-text-grey">Overall balance</p>
                <div className="ant-row-flex gx-mb-3 gx-mb-md-2">
                  <Button className="gx-mr-2" type="primary">
                    Deposit
                  </Button>
                  <Button className="gx-btn-cyan">Withdraw</Button>
                </div>

                <p className="gx-text-primary gx-pointer gx-d-none gx-d-sm-block gx-mb-1">
                  <i className="icon icon-add-circle gx-fs-lg gx-d-inline-flex gx-vertical-align-middle" />{" "}
                  Add New Wallet
                </p>
          </Widget>
        </Col>
      </Row>
    );
  }
}
