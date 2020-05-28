import React, { Component } from 'react'
import SaleReportContainer from 'appRedux/containers/SaleReportContainer'
export default class Index extends Component {
    render() {
        return <SaleReportContainer {...this.props} />
    }
}
