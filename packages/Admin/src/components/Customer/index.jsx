import React, { Component } from 'react'
import CustomerContainer from 'appRedux/containers/CustomerContainer'
export default class Index extends Component {
    render() {
        return <CustomerContainer {...this.props}/>
    }
}
