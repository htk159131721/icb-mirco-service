import React, { Component } from 'react'

import NewsContainer from 'appRedux/containers/NewsContainer'

export default class Index extends Component {
    render() {
        return (
            <div>
                <NewsContainer {...this.props}/>
            </div>
        )
    }
}
