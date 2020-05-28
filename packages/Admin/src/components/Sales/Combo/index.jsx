import React, { Component } from 'react'

import ComboContainer from 'appRedux/containers/ComboContainer'

export default class Index extends Component {
    render() {
        return (
            <div>
                <ComboContainer {...this.props}/>
            </div>
        )
    }
}
