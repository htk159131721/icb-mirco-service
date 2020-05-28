import React, { Component } from 'react'
import ExchangeCurrencyContainer from 'appRedux/containers/ExchangeCurrencyContainer'
export default class Index extends Component {
    render() {
        return <ExchangeCurrencyContainer {...this.props}/>
    }
}
