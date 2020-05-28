import React, { Component } from 'react'
import UserContainer from 'appRedux/containers/UserContainer'
export default class Index extends Component {
    render() {
        return <UserContainer {...this.props}/>
    }
}
