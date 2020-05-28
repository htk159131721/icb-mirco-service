import React, { Component } from 'react'
import CustomerTestContainer from 'appRedux/containers/CustomerTestContainer'
export default class Index extends Component {
    render() {
        return <CustomerTestContainer {...this.props}/>
    }
}
