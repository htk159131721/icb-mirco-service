import React, { Component } from 'react'
import CommissionCombo from "appRedux/containers/CommissionComboContainer"

export default class Index extends Component {
    render() {
        return <CommissionCombo {...this.props}/>
    }
}
