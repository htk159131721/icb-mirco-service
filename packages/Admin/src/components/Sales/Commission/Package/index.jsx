import React, { Component } from 'react'
import CommissionPackage from "appRedux/containers/CommissionPackageContainer"

export default class Index extends Component {
    render() {
        return <CommissionPackage {...this.props}/>
    }
}
