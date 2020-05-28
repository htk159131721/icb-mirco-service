import React, { Component } from 'react'
import AgencyContainer from 'appRedux/containers/AgencyContainer'
export default class Index extends Component {
    render() {
        return <AgencyContainer {...this.props}/>
    }
}
