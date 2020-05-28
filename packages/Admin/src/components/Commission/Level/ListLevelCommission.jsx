import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import IntlMessages from "util/IntlMessages";
import { Permission } from "util/Permission";
import SweetAlert from "react-bootstrap-sweetalert";

export default class ListLevelCommission extends Component {
  state = {
    searchText: "",
    warning: false,
    isChangeCate: false,
    idDel: 0
  };
  showAlert = record => {
    this.setState({ warning: true, idDel: record.obj.id });
  };
  onCancelDelete = () => this.setState({ warning: false });
  onDelete = () => {
    this.setState({ warning: false });
    this.props.onDeleteLevelCMS(this.state.idDel);
  };
  /************************ Table *************************** */
  getDataForTable = data => {
    let result = [];
    if (data.listLevel.length > 0) {
      data.listLevel.map((obj, index) => {
        result.push({
          key: index + 1,
          obj
        });
      });
    }
    return result;
  };
  /**
   * @function showFormEdit
   * @summary set values edit 
   */
  showFormEdit = (e, record) => this.props.onShowFormEdit(record)

  render() {
    const {usersData, cmsData} = this.props,
    {authUser} = usersData;
    const columns = [
      {
        title: "Level",
        dataIndex: "obj.level",
        align: "center",
        key: "obj.level",
        width: "50px",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.obj.level - b.obj.level
      },
      {
        title: "Title",
        dataIndex: "obj.title",
        align: "center",
        key: "obj.title",
        render: (txt, record) => {
          return (
            <Button style={{background: `${record.obj.color}`, color: "#fff"}}>{txt}</Button>
          )
        }
      },
      {
        title: "Action",
        dataIndex: "obj.id",
        align: "center",
        key: "obj.id",
        render: (txt, record) => {
          return (
            <div className="st-acion-tb">
              {Permission("salePackageUpdate", authUser.permissions) ? (
                <a href="javascript:;" onClick={e => this.showFormEdit(e, record)}>
                  <i className="icon icon-edit" title = "Update" />
                </a>
              ) : null}
              {Permission("salePackageDelete", authUser.permissions) ? (
                <a href="javascript:;" onClick={() => this.showAlert(record)}>
                  <i className="icon icon-trash" title="Delete" />
                </a>
              ) : null}
            </div>
          )
        }
      }
    ];
    return (
      <>
        <Table
          className="st-th-center st-background-header"
          loading={this.props.generalData.loaderTable}
          pagination={false}
          columns={columns}
          dataSource={this.getDataForTable(cmsData)}
        />
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
