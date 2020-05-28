import React, { Component } from "react";
import CommissionContainer from "appRedux/containers/CommissionContainer"

class Index extends Component {
  render(){
      return <CommissionContainer {...this.props} />
  }
}
export default Index;
