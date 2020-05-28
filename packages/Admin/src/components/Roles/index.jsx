import React, { Component } from 'react'
import RoleContainer from 'appRedux/containers/RoleContainer'

export default class Index extends Component {
    render() {
        return (
            <RoleContainer {...this.props} />
        )
    }
}
