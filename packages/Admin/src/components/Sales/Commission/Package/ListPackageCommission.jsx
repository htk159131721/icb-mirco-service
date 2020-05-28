import React, { Component } from "react";
import { Table, Input, Button, Icon, Select } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import Highlighter from "react-highlight-words";

import IntlMessages from "util/IntlMessages";
import {Permission} from "util/Permission"
const { Option } = Select;

export default class ListPackageCommission extends Component {
  state = {
    searchText: "",
    warning: false,
    isChangeCate: false,
    idDel: 0
  };
  componentWillUnmount () {
    const {settingCMSData} = this.props;
    if(settingCMSData.cmsPackages.commisions) 
      if(settingCMSData.cmsPackages.commisions.length > 0)  
        this.props.onResetCommissionPackage()
  }
  componentDidMount() {
    const search = this.props.location.search,
    values = new URLSearchParams(search);
    if(search){
      this.props.onGetListCommissionPackage([values.get("id"), "package"])
    }
    
  }

  /************************ Table *************************** */
getDataForTable = (data) => {
  let result = [];
  if(data.cmsPackages.commisions){
    data.cmsPackages.commisions.map((obj, index) => {
      result.push({
        key: index+1,
        obj
      })
    })
  }
  return result;
}
  render() {
    const {settingCMSData, usersData} = this.props,
      {authUser} = usersData;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key",
        width: "5%",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.key - b.key
      },
      {
        title: "Level",
        dataIndex: "obj.level_type",
        align: "center",
        key: "obj.level_type"
      },
      {
        title: "Value",
        dataIndex: "obj.value",
        align: "center",
        key: "obj.value"
      }
    ];
    return (
      <>
        <Table className="st-th-center st-background-header" 
          loading={this.props.generalData.loaderTable}
          pagination={{ pageSize: this.props.generalData.pageSize }}
          columns={columns} 
          dataSource={this.getDataForTable(settingCMSData)} 
        />
      </>
    );
  }
}
