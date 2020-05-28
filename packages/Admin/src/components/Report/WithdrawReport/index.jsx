import React, { PureComponent } from 'react'
import WithdrawReportContainer from 'appRedux/containers/WithdrawReportContainer'
export default class Index extends PureComponent {
    render() {
        return <WithdrawReportContainer {...this.props}/>
    }
}
