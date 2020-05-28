import React, { Component } from 'react'
import CateContainer from 'appRedux/containers/CatePackageContainer'

export default class Index extends Component {
    render() {
      return <CateContainer {...this.props}/>
    }
}
