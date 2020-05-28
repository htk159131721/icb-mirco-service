import React, { Component } from 'react'
import PaymentReportContainer from 'appRedux/containers/PaymentReportContainer'
export default class Index extends Component {
    render() {
        return <PaymentReportContainer {...this.props} />
    }
}
