import React, { Component } from "react";
import { Table, Input, Button, Icon, Select } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import Highlighter from "react-highlight-words";

import IntlMessages from "util/IntlMessages";
import { Permission } from "util/Permission";
const { Option } = Select;

export default class ListComboCommission extends Component {
  state = {
    searchText: "",
    warning: false,
    isChangeCate: false,
    idDel: 0
  };
  componentWillUnmount() {
    const { settingCMSData } = this.props;
    if (settingCMSData.cmsCombos.commisions)
      if (settingCMSData.cmsCombos.commisions.length > 0)
        this.props.onResetCommissionCombo();
  }
  componentDidMount() {
    const search = this.props.location.search,
      values = new URLSearchParams(search);
    if (search) {
      this.props.onGetListCommissionCombo([values.get("id"), "combo"]);
    }
  }
  /************************ Table *************************** */
  getDataForTable = data => {
    let result = [];
    if (data.cmsCombos.commisions) {
      data.cmsCombos.commisions.map((obj, index) => {
        result.push({
          key: index + 1,
          obj
        });
      });
    }
    return result;
  };
  render() {
    const { settingCMSData, usersData } = this.props;
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
        <Table
          className="st-th-center st-background-header"
          loading={this.props.generalData.loaderTable}
          pagination={{ pageSize: this.props.generalData.pageSize }}
          columns={columns}
          dataSource={this.getDataForTable(settingCMSData)}
        />
      </>
    );
  }
}
