import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { deletePromotion } from "../../appRedux/actions/CartAction";

class UserProfile extends Component {
  userSignOut = () => {
    this.props.userSignOut()
  }
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
        <Popover
          placement="bottomRight"
          content={userMenuOptions}
          trigger="click"
        >
          <Avatar
            src={
              !!users.authUser
                ? users.authUser.image
                  ? process.env.REACT_APP_URL+users.authUser.image
                  : "https://via.placeholder.com/150x150"
                : "https://via.placeholder.com/150x150"
            }
            className="gx-size-40 gx-pointer gx-mr-3"
            alt=""
          />
          <span className="gx-avatar-name">
            {!!users.authUser
              ? `${users.authUser.first_name} ${users.authUser.last_name}`
              : ""}
            <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
          </span>
        </Popover>
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
    userSignOut: () => {
      dispatch(userSignOut())
      dispatch(deletePromotion())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
