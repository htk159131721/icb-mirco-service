import React, { Component } from 'react'

import PromotionContainer from 'appRedux/containers/PromotionContainer'

export default class Index extends Component {
    render() {
        return (
            <div>
                <PromotionContainer {...this.props}/>
            </div>
        )
    }
}
