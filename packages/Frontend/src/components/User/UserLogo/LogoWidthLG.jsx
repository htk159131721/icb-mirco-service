import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover, Icon } from "antd";
import { userSignOut } from "appRedux/actions/UserAction";
import IntlMessage from "util/IntlMessages";
import { deletePromotion } from "../../../appRedux/actions/CartAction";

class UserProfile extends Component {
  userSignOut = e => {
    e.preventDefault();
    this.props.userSignOut();
  };
  render() {
    const { users } = this.props;
    return (
      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        <div>
          <Avatar
            src={ 
              users.authUser.image
                ? process.env.REACT_APP_URL + users.authUser.image
                : "https://via.placeholder.com/150x150"
            }
            className="gx-size-40 gx-pointer gx-mr-3"
            alt=""
          />
        </div>
        <div className="gx-flex-column">
          <span className="gx-avatar-name">
            <Icon type="user" className="gx-mr-1" />
            {!!users.authUser
              ? `${users.authUser.first_name} ${users.authUser.last_name}`
              : ""}
          </span>
          <a onClick={this.userSignOut} className="gx-text-orange gx-mt-1">
            <Icon type="logout" className="gx-mr-1" />
            Logout
          </a>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.UserReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userSignOut: () => {
      dispatch(userSignOut());
      dispatch(deletePromotion());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
