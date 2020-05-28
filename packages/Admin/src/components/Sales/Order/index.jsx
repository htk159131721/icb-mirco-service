import React, { Component } from 'react'
import OrderContainer from 'appRedux/containers/OrderContainer'
export default class Index extends Component {
    render() {
        return <OrderContainer {...this.props}/>
    }
}
