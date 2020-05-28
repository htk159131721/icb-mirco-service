import React, { Component } from 'react'
import ReceiptContainer from 'appRedux/containers/ReceiptContainer'
export default class Index extends Component {
    render() {
        return <ReceiptContainer {...this.props}/>
    }
}
