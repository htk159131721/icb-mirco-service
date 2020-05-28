import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/UserAction";
import IntlMessage from "util/IntlMessages";
import { deletePromotion } from "../../../appRedux/actions/CartAction";

class UserProfile extends Component {
  userSignOut = () => {
    this.props.userSignOut();
  };
  render() {
    const { users } = this.props;
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li onClick={() => this.userSignOut()}>Logout</li>
      </ul>
    );

    return (
      <div>
        <Popover
          overlayClassName="gx-popover-horizantal"
          placement="bottomRight"
          content={userMenuOptions}
          trigger="click"
        >
          <Avatar
            src={
              users.authUser.image
                ? process.env.REACT_APP_URL + users.authUser.image
                : "https://via.placeholder.com/150x150"
            }
            className="gx-size-40 gx-pointer gx-mr-3"
            alt=""
          />
        </Popover>
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
