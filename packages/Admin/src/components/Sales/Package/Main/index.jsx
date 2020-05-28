import React, { Component } from 'react'

import PackageContainer from 'appRedux/containers/PackageContainner'

export default class Index extends Component {
    render() {
        return (
            <div>
                <PackageContainer {...this.props}/>
            </div>
        )
    }
}
