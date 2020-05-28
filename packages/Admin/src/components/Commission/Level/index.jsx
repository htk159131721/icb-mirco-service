import React, { Component } from 'react'
import CommissionLevel from "appRedux/containers/CommissionLevelContainer"

export default class Index extends Component {
    render() {
        return <CommissionLevel {...this.props}/>
    }
}
