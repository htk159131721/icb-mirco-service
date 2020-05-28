import React, { Component } from "react";
import { Table, Input, Button, Icon, Popconfirm, Modal } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";

import { Permission } from "util/Permission";

export default class ListRole extends Component {
  state = {
    searchText: "",
    warning: false,
    idDel: 0
  };
  componentDidMount () {
    const {rolesData} = this.props;
    if(rolesData.roles.length <= 0)
      this.props.onGetListRole()
  }

  /**************************************************************************/
  showAlert = record => {
    this.setState({ warning: true, idDel: record.id });
  };
  onCancelDelete = () => this.setState({ warning: false });
  onDelete = () => {
    this.setState({warning: false})
    this.props.onDeleteRole(this.state.idDel)
  };
  /********************************************** Modal ***********************************************/
  showEdit = (e, record) => {
    e.preventDefault();
    this.props.onShowModalForEdit(record);
  };
  /********************************************** Table ***********************************************/
  getDataForTable = data => {
    let result = [];
    if (data.roles) {
      data.roles.map((obj, index) => {
        result.push({
          key: index + 1,
          index,
          id: obj.id,
          name: obj.name,
          permissions: obj.permissions,
          description: obj.description,
        });
      });
    }
    return result;
  };
  render() {
    const { usersData, rolesData, permissionsData } = this.props,
      { authUser } = usersData;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key",
        align: "center",
        width: "5%",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.key - b.key
      },
      {
        title: "Name",
        align: "center",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Description",
        align: "center",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Action",
        dataIndex: "index",
        key: "action",
        width: "3%",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              {
                (permissionsData.groupPermission.length > 0 && permissionsData.listPermission.length > 0)
                  ? Permission("userRoleUpdate", authUser.permissions) 
                    ? (
                    <a href="javascript:;" onClick={e => this.showEdit(e, record)}>
                      <i className="icon icon-edit" />
                    </a>
                  ) : null
                  : null
              }
              
              {Permission("userRoleDelete", authUser.permissions) ? (
                <a href="javascript:;" onClick={() => this.showAlert(record)}>
                  <i className="icon icon-trash" />
                </a>
              ) : null}
            </div>
          );
        }
      }
    ];
    return (
      <>
        <Table className="st-th-center st-background-header" 
           loading={this.props.generalData.loaderTable}
           pagination={{ pageSize: this.props.generalData.pageSize }}
          columns={columns} 
          dataSource={this.getDataForTable(rolesData)} />
        <SweetAlert
          show={this.state.warning}
          warning
          showCancel
          confirmBtnText={<IntlMessages id="sweetAlerts.yesDeleteIt" />}
          cancelBtnText={<IntlMessages id="modalPackage.Cancel" />}
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default"
          title={<IntlMessages id="sweetAlerts.areYouSure" />}
          onConfirm={this.onDelete}
          onCancel={this.onCancelDelete}
        />
      </>
    );
  }
}
