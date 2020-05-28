import React, { Component } from 'react'
import SystemContainer from 'appRedux/containers/SystemContainer'
export default class index extends Component {
    render() {
        return <SystemContainer {...this.props} />
    }
}
