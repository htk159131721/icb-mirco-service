import React, { Component } from "react";
import { Avatar, Upload, message } from "antd";
import axios from "axios";
import { getCookie } from "helpers/cookie";
import { ERROR } from "constants/messages";
import { API_UPDATE_PROFILE } from "../../constants/apiURL";

class ProfileHeader extends Component {
  state = {
    fileAvarta: null,
    previewImageAvarta: "https://via.placeholder.com/150x150"
  };
  // hanler before upload
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  handleChangeFile = file => {
    // Get this url from response in real world.
    this.getBase64(file.file.originFileObj, imageUrl => {
      this.setState({
        previewImageAvarta: imageUrl,
        fileAvarta: file.file
      });
    });
  };

  /**
   * @function checkFile
   * @summary check file upload
   */

  checkFile = file => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (isJpgOrPng) {
      if (isLt2M) {
        this.setState(state => ({
          fileAvarta: file
        }));
      } else {
        message.error("Image must smaller than 2MB!");
      }
    } else {
      message.error("You can only upload JPG, PNG file!");
    }
    return isJpgOrPng && isLt2M;
  };

  /**
   * @function customRequest
   * @summary upload file
   */
  customRequest = ({ onSuccess, onError, file }) => {
    if (this.checkFile(file)) {
      const { userData } = this.props,
        { authUser } = userData;
      const data = new FormData();
      data.append("first_name", authUser.first_name);
      data.append("last_name", authUser.last_name);
      data.append("phone_number", authUser.phone_number);
      data.append("gender", authUser.gender);
      data.append("passport", authUser.passport);
      data.append("address", authUser.address);
      data.append("country", authUser.country);
      data.append("province", authUser.province);
      data.append("image", file);
      axios
        .post(API_UPDATE_PROFILE, data, {
          headers: { Authorization: getCookie("token") }
        })
        .then(response => {
          if (response.data.status_code === 200) {
            sessionStorage.setItem(
              "USER_INF",
              JSON.stringify(response.data.data)
            );
            this.props.onUpdateStateUser(response.data.data);
          }
        })
        .catch(err => {
          message.error(ERROR);
        });
    }
  };
  render() {
    const { userData } = this.props;
    return (
      <div className="gx-profile-banner">
        <div className="gx-profile-container">
          <div className="gx-profile-banner-top">
            <div className="gx-profile-banner-top-left">
              <div className="gx-profile-banner-avatar">
                <Avatar
                  className="gx-size-150"
                  alt="..."
                  src={
                    !!userData.authUser.image
                      ? process.env.REACT_APP_URL + userData.authUser.image
                      : this.state.previewImageAvarta
                  }
                />
                <Upload
                  // {...props}
                  accept=".jpg,.jpeg,.png"
                  showUploadList={false}
                  customRequest={this.customRequest}
                  
                >
                  <div className="mask-upload">
                    <i className="icon icon-upload" />
                  </div>
                </Upload>
              </div>
              <div className="gx-profile-banner-avatar-info">
                <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">
                  {userData.authUser.full_name}
                </h2>
                <p className="gx-mb-0 gx-fs-lg">
                  {`${userData.authUser.country}, ${userData.authUser.province}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
