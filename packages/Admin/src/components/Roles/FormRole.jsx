import React, { Component } from "react";
import {
  Form,
  Col,
  Row,
  Input,
  Button,
  Select,
  message,
  Card,
  Modal
} from "antd";

import IntlMessages from "util/IntlMessages";
import { Permission } from "util/Permission";
import { NOT_PERMISSON } from "util/messages";
class FormRole extends Component {
  state = {
    idUpdate: 0,
    checkedAll: false,
    arrChecked: []
  };
  componentDidMount() {
    this.props.onRef(this);
    this.props.onGetDataGroupPermission();
    this.props.onGetDataListPermission();
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  handleSubmit = e => {
    e.preventDefault();
    const { form, usersData } = this.props,
      { authUser } = usersData,
      { idUpdate } = this.state,
      arrPermission = [];
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const checkboxes = document.getElementsByName("per[]");

        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            arrPermission.push(checkboxes[i].value);
          }
        }

        const data = {
          name: values.name,
          description: values.description,
          permissions: arrPermission
        };

        if (idUpdate !== 0) {
          //update
          data.id = idUpdate;
          if (Permission("userRoleUpdate", authUser.permissions))
            this.props.onUpdateRole(data);
          else message.error(NOT_PERMISSON);
        } else {
          //create
          if (Permission("userRoleCreate", authUser.permissions))
            this.props.onCreateRole(data);
          else message.error(NOT_PERMISSON);
        }
      }
    });
  };
  showFormEdit = record => {
    this.props.onShowModal(true);
    const { form } = this.props;
    let newArr = [],
      arrChecked = [];

    if(record.permissions.length > 0){
      record.permissions.forEach(element => {
        newArr[element.permission_group_id] = element
      });
      newArr.map(obj => arrChecked.push(obj.permission_group_id))
    }
    
    setTimeout(() => {
      const checkboxes = document.getElementsByName("per[]");
      //clear checked
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
      // compare checkbox with permisson
      if (record.permissions.length > 0) {
        for (var i = 0; i < checkboxes.length; i++) {
          const result = record.permissions.filter(
            per =>
              parseInt(checkboxes[i].getAttribute("data-id")) ===
              parseInt(per.id)
          );
          if (result.length > 0) checkboxes[i].checked = true;
        }
      }
      form.setFieldsValue({
        name: record.name,
        description: record.description
      });
      this.setState({
        idUpdate: record.id,
        arrChecked
      });
    }, 150);
  };
  resetForm = () => {
    const checkboxes = document.getElementsByName("per[]");
    //clear checked
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    this.setState({
      idUpdate: 0
    });
    this.props.form.resetFields();
  };
  /*************************************** Modal ******************************* */
  handleCancel = () => {
    this.resetForm();
    this.props.onShowModal(false);
  };
  /***************************************** hanlde for select ******************************** */
  getOptionForGroupPermissionSelect = data => {
    let result = [];
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.id}>
            {obj.name}
          </Select.Option>
        );
      });
    }
    return result;
  };
  /******************************************* hanlder render **************************************************/
  onCheckAll = (groupPermission) => {
    let arrThis = [];
    if(!this.state.checkedAll) {
      groupPermission.map(obj => arrThis.push(obj.id))
    }
    this.setState({ checkedAll: !this.state.checkedAll, arrChecked: arrThis }, () => {
      const checkboxes = document.getElementsByName("per[]");
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = this.state.checkedAll;
      }
    });
  };
  onCheckAllGroup = (e, groupId) => {
    e.preventDefault();
    const {arrChecked} = this.state,
     checkboxes = document.getElementsByName("per[]");
    let arrThis = arrChecked,
      flagChecked = false;

    if(arrChecked.length > 0){
      const indexChecked = arrChecked.findIndex(obj => obj === groupId)
      if(indexChecked === -1 ){
        arrThis.push(groupId)
        this.setState({
          arrChecked: arrThis
        })
      } else {
        flagChecked = true;
        arrThis.splice(indexChecked, 1)
        this.setState({
          arrChecked: arrThis
        })
      }
    } else {
      arrThis.push(groupId)
      this.setState({
        arrChecked: arrThis
      })
    }

    if(flagChecked){
      for (var i = 0; i < checkboxes.length; i++) {
        if ( parseInt(groupId) === parseInt(checkboxes[i].getAttribute("data-pid"))) {
          checkboxes[i].checked = false;
        }
      }
    } else {
      for (var i = 0; i < checkboxes.length; i++) {
        if ( parseInt(groupId) === parseInt(checkboxes[i].getAttribute("data-pid"))) {
          checkboxes[i].checked = true;
        }
      }
    }
    
  };

  renderPermission = (groupPermission, listPermission) => {
    let data;
    if (groupPermission.length > 0 && listPermission.length > 0) {
      data = groupPermission.map((group, i) => {
        return (
          <Col key={i} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              key={i}
              title={group.description}
              extra={
                <a
                  href="javascript:;"
                  onClick={e => this.onCheckAllGroup(e, group.id)}
                >
                  Check all {group.description}
                </a>
              }
              style={{ width: "100%" }}
            >
              <Row>
                {listPermission.map((per, j) => {
                  if (per.permission_group_id === group.id) {
                    return (
                      <Col key={j} xl={6} lg={6} md={12} sm={12} xs={24}>
                        <div className="pretty chk-per p-svg p-curve">
                          <input
                            key={j}
                            id={`ckPer-${per.id}`}
                            type="checkbox"
                            name="per[]"
                            data-id={per.id}
                            data-pid={group.id}
                            value={per.id}
                          />
                          <div className="state p-success">
                            <svg className="svg svg-icon" viewBox="0 0 20 20">
                              <path
                                d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                                style={{ stroke: "white", fill: "white" }}
                              />
                            </svg>
                            <label htmlFor={`ckPer-${per.id}`}>
                              {per.display_name}
                            </label>
                          </div>
                        </div>
                      </Col>
                    );
                  }
                })}
              </Row>
            </Card>
          </Col>
        );
      });
    }
    return data;
  };
  render() {
    const { getFieldDecorator } = this.props.form,
      { permissionsData, generalData } = this.props,
      { groupPermission, listPermission } = permissionsData;
    return (
      <Modal
        title={this.state.idUpdate !== 0 ? "UPDATE ROLE" : "ADD ROLE"}
        className="modal-add-package"
        maskClosable={false}
        forceRender={true}
        visible={generalData.showModalPackage}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={generalData.loadingBTN}
            onClick={this.handleSubmit}
          >
            <IntlMessages id="modalPackage.Save" />
          </Button>,
          <Button type="danger" key="reset" ghost onClick={this.resetForm}>
            <IntlMessages id="modalPackage.Reset" />
          </Button>
        ]}
      >
        <Form className="input-100-percent">
          <Row>
            <Col xl={8} lg={8} md={24} sm={24} xs={24}>
              <Form.Item>
                <IntlMessages id="modalPackage.Form.Title" />
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: (
                        <IntlMessages id="modalPackage.Form.Err.Required" />
                      )
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={24} sm={24} xs={24}>
              <Form.Item>
                <IntlMessages id="modalPackage.Form.Description" />
                {getFieldDecorator("description", {
                  rules: [
                    {
                      required: true,
                      message: (
                        <IntlMessages id="modalPackage.Form.Err.Required" />
                      )
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            {groupPermission.length > 0 && listPermission.length > 0 ? (
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item>
                  <div className="pretty chk-per p-svg p-curve">
                    <input
                      key={1000000}
                      type="checkbox"
                      id="checkAll"
                      value="checkAll"
                      onChange={() => this.onCheckAll(groupPermission)}
                    />
                    <div className="state p-success">
                      <svg className="svg svg-icon" viewBox="0 0 20 20">
                        <path
                          d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                          style={{ stroke: "white", fill: "white" }}
                        />
                      </svg>
                      <label htmlFor="checkAll">
                        {!this.state.checkedAll ? (
                          <IntlMessages id="modalPackage.Form.CheckAllPermission" />
                        ) : (
                          <IntlMessages id="modalPackage.Form.UnCheckAllPermission" />
                        )}
                      </label>
                    </div>
                  </div>
                </Form.Item>
              </Col>
            ) : null}
            {this.renderPermission(groupPermission, listPermission)}
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(FormRole);
