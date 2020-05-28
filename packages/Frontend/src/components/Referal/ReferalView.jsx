import React, { Component } from "react";
import { Network, Node, Edge } from "@lifeomic/react-vis-network";
import {  Button, Alert } from "antd";
export default class ReferalView extends Component {
  componentDidMount() {
    this.props.onGetListRef();
  }
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
  clickDecorator = props => {
    return (
      <Button
        // style={decoratorStyles}
        onClick={()=>console.log(`${props.label}`)}
      >
        Click Me
      </Button>
    );
  }
  showNodeNetWork = data => {
    let concat = null;
    if (data.listRef.length > 0) {
      const result = data.listRef.map((ref, index) => {
        return (
          <Node
            key={index}
            id={ref.id}
            label={`${ref.label} - Level:${ref.level}`}
            //decorator={this.clickDecorator}
          />
        );
      });
      const edge = data.listRef.map((ref, index) => {
        return (
          <Edge
            key={`${index}asdsd`}
            id={`${ref.id}edge`}
            from={ref.parent}
            to={ref.id}
          />
        );
      });
      concat = result.concat(edge);
      return (
        <Network options={{ width: "100%", height: "600px" }}>{concat}</Network>
      );
    }
    return (
      <Alert className="gx-mt-5 gx-ml-3" message="Referal not found" type="warning" />
    )
  };
  render() {
    const { userData } = this.props;
    return (
      <div className="custom-container">{this.showNodeNetWork(userData)}</div>
    );
  }
}
