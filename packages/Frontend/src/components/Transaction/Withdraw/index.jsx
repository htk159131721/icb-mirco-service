import React, { Component } from "react";
import WithdrawContainer from "appRedux/containers/WithdrawContainer"

class Index extends Component {
  render(){
      return <WithdrawContainer {...this.props} />
  }
}
export default Index;
