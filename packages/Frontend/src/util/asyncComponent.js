import React, {Component, PureComponent} from "react"
import {connect} from 'react-redux'
import Nprogress from "nprogress"
import ReactPlaceholder from "react-placeholder"
import "nprogress/nprogress.css"

import "react-placeholder/lib/reactPlaceholder.css";
import CircularProgress from "components/CircularProgress";
import {getListCart} from 'appRedux/actions/CartAction'

import NotFound from '../routes/NotFound'

export default function asyncComponent(importComponent, roleView) {
  class AsyncFunc extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    componentWillMount() {
      Nprogress.start();
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    async componentDidMount() {
      if(this.props.cartData.carts.length <= 0)
        this.props.onGetListCart()
      
      this.mounted = true;
      const {default: Component} = await importComponent();
      Nprogress.done();
      if (this.mounted) {
        this.setState({
          component: <Component {...this.props} />
        });
      }
     // this.allowAccessUrl(roleView)
    }
    
    allowAccessUrl = async (role) => {
      const {users} = this.props;
      if(!!users.authUser.permissions){
        const result = users.authUser.permissions.filter(per => per === role)
        if(result.length > 0){
          const {default: Component} = await importComponent();
          Nprogress.done();
          if (this.mounted) {
            this.setState({
              component: <Component {...this.props} />
            });
          }
        } else {
          Nprogress.done();
          this.setState({
            component: <NotFound {...this.props} />
          });
        }
      }
      
    }
    render() {
      const Component = this.state.component || <CircularProgress/>;
      return (
        <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
          {Component}
        </ReactPlaceholder>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      cartData: state.CartReducer
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
     onGetListCart: () => dispatch(getListCart())
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(AsyncFunc);
}
