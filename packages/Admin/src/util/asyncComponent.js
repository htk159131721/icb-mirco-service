import React, {Component} from "react"
import {connect} from 'react-redux'
import Nprogress from "nprogress"
import ReactPlaceholder from "react-placeholder"
import "nprogress/nprogress.css"

import "react-placeholder/lib/reactPlaceholder.css";
import CircularProgress from "components/CircularProgress";
import * as UserAction from 'appRedux/actions/UserActions'

import NotFound from '../routes/NotFound'

export default function asyncComponent(importComponent, roleView) {
  class AsyncFunc extends Component {
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

    componentDidMount() {
      //call get profile user 
      //if(!this.props.users.authUser)
        //this.props.getProfile()
      
      this.mounted = true;
      this.allowAccessUrl(roleView)
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
      users: state.auth
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      getProfile: () => dispatch(UserAction.getProfile())
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(AsyncFunc);
}
