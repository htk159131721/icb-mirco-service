import React, { Component } from 'react'
import PackageReportContainer from 'appRedux/containers/PackageReportContainer'
export default class Index extends Component {
    render() {
        return <PackageReportContainer {...this.props}/>
    }
}
