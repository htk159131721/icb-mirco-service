import React, { Component } from 'react'

import CommissionContainer from 'appRedux/containers/CommissionContainer'

export default class Index extends Component {
    render() {
        return (
            <div>
                <CommissionContainer {...this.props}/>
            </div>
        )
    }
}
