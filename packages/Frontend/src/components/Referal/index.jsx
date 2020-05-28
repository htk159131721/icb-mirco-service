import React, { Component } from 'react'
import ReferalContainer from 'appRedux/containers/ReferalContainer'
export default class Index extends Component {
    render() {
        return <ReferalContainer {...this.props}/>
    }
}
