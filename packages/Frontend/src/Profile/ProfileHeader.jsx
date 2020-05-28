import React, { Component } from "react";
import { Avatar, Upload, message } from "antd";

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
    this.getBase64(file.file, imageUrl => {
      this.setState({
        previewImageAvarta: imageUrl,
        fileAvarta: file.file
      });
    });
    console.log(file.file);
    
  };
  render() {
    const { userData } = this.props,
      { fileAvarta } = this.state;
    const props = {
      beforeUpload: file => {
        const typeFile = file.type;
        if (typeFile === "image/jpeg" || typeFile === "image/png") {
          this.setState(state => ({
            fileAvarta: file
          }));
          return false;
        } else {
          message.error("You can only upload JPG, PNG file!");
          return false;
        }
      },
      fileAvarta
    };
    return (
      <div className="gx-profile-banner">
        <div className="gx-profile-container">
          <div className="gx-profile-banner-top">
            <div className="gx-profile-banner-top-left">
              <div className="gx-profile-banner-avatar">
                <Avatar
                  className="gx-size-150"
                  alt="..."
                  src={this.state.previewImageAvarta}
                />
                <Upload
                  {...props}
                  accept=".jpg,.jpeg,.png"
                  showUploadList={false}
                  onChange={this.handleChangeFile}
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
                  {`${userData.authUser.country}, ${
                    userData.authUser.province
                  }`}
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
