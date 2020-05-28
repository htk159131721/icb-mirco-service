import React, { Component } from 'react'
import PartnerReportContainer from 'appRedux/containers/PartnerReportContainer'
export default class Index extends Component {
    render() {
        return <PartnerReportContainer {...this.props}/>
    }
}
