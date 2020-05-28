import React, { Component } from "react";
import Widget from "components/Widget";

class ProfileContact extends Component {
  render() {
    return (
      <Widget title="Account" styleName="gx-card-profile-sm">
        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className="icon icon-email gx-fs-xxl gx-text-grey" />
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Email</span>
            <p className="gx-mb-0">
              <a href="javascript:;">email@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className="icon icon-user gx-fs-xxl gx-text-grey" />
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Username</span>
            <p className="gx-mb-0">
              <a href="javascript:;">email</a>
            </p>
          </div>
        </div>

        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className="icon icon-forgot-password gx-fs-xxl gx-text-grey" />
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Password</span>
            <p className="gx-mb-0">
              <a className="show-edit" href="javascript:;">Change
                <i  className="icon icon-edit cursor-edit"></i>
              </a>
            </p>
          </div>
        </div>
      </Widget>
    );
  }
}

export default ProfileContact;
