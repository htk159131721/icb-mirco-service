import React, { Component } from 'react'
import WalletContainer from 'appRedux/containers/WalletContainer'

export default class Index extends Component {
    render() {
        return <WalletContainer {...this.props} />
    }
}
