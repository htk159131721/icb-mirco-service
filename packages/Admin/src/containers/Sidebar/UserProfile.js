import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover, Icon } from "antd";
import { userSignOut } from "appRedux/actions/Auth";

class UserProfile extends Component {
  userSignOut = () => {
    this.props.userSignOut();
  };
  render() {
    const { users } = this.props;
    const userMenuOptions = (
      <ul className="gx-user-popover">
        {/* <li>My Account</li> */}
        <li onClick={() => this.userSignOut()}>Logout</li>
      </ul>
    );

    return (
      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        {/* <Popover
          placement="bottomRight"
          content={userMenuOptions}
          trigger="click"
        > */}
        <div>
          <Avatar
            src={
              !!users.authUser
                ? users.authUser.image
                  ? process.env.REACT_APP_URL + users.authUser.image
                  : "https://via.placeholder.com/150x150"
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
        {/* </Popover> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userSignOut: () => dispatch(userSignOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
