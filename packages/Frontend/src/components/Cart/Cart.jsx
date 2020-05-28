import React, { Component } from "react";
import CartContainer from "appRedux/containers/CartContainer";
export default class Cart extends Component {
  render() {
    return <CartContainer {...this.props} />;
  }
}
