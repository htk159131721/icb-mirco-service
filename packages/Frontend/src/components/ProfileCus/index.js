import React, { Component } from 'react'
import ProfileContainer from 'appRedux/containers/ProfileContainer'
export default class Index extends Component {
    render() {
        return <ProfileContainer {...this.props}/>
    }
}
