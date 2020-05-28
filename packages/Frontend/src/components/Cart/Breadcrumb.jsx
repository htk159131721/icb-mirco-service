import React, { Component } from "react";
import { Icon, Breadcrumb } from "antd";
export default class BreadcrumbComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="breadcrum-cart">
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Cart</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}
