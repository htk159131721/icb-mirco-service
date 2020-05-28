import React, { Component } from "react";
import TreeMenu from "react-simple-tree-menu";
import {notification } from "antd"
import "./main.scss";
export default class ReferalView extends Component {
  state = {
    creadCrumbTree: null
  }
  componentDidMount() {
    this.props.onGetListRef();
  }
  openNotification = () => {
    const args = {
      message: "Link to selected",
      description: this.state.creadCrumbTree,
      duration: 2,
      className: "st-notification"
    };
    notification.open(args);
  };
  getListRef = (arr, parent) => {
    let array = [];
    for (var i in arr) {
      if (arr[i].parent == parent) {
        const children = this.getListRef(arr, arr[i].id);
        if (children.length) {
          arr[i].nodes = children;
        }
        array.push(arr[i]);
      }
    }
    return array;
  };
  onClickItem = node => {
    this.setState({creadCrumbTree: node.key}, () => {
      this.openNotification()
    })
  }
  render() {
    const { customerData } = this.props;
    return (
      <div className="custom-container">
        <TreeMenu data={this.getListRef(customerData.listRef, 0)} onClickItem={this.onClickItem} />
      </div>
    );
  }
}
