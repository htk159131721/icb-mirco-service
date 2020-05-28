import React, { Component } from 'react'
import CommissionReportContainer from 'appRedux/containers/CommissionReportContainer'
export default class Index extends Component {
    render() {
        return <CommissionReportContainer {...this.props}/>
    }
}
