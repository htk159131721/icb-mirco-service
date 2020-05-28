import React, { Component } from 'react'
import HomeContainer from "appRedux/containers/HomeContainer"

export default class Index extends Component {
    render() {
        return <HomeContainer {...this.props} />
    }
}
