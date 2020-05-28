import React, { Component } from "react";
import { Table, Input, Button, Icon, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";

import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";

export default class ListSMTPEmail extends Component {
  state = {
    searchText: "",
    warning: false,
    idDel: 0
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys, 
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  /**************************************************************************/
  showAlert = record => {
    this.setState({ warning: true, idDel: record.id });
  };
  onCancelDelete = () => this.setState({ warning: false });
  onDelete = () => {
    console.log(this.state.idDel);
  };
  /********************************************** Modal ***********************************************/
  showEdit = (e, record) => {
    e.preventDefault();
    this.props.onShowDataForEdit(record);
  };
 /********************************************** Table ***********************************************/
 getDataForTable = data => {
  let result = [];
    if (data.systems.smtp_email) {
      const smtp = data.systems.smtp_email;
      result.push({
        key: "1",
        id: "1",
        index: "1",
        host: smtp.smtp_host,
        port: smtp.smtp_port,
        username: smtp.smtp_username,
        password: smtp.smtp_password,
        fromName: smtp.smtp_from_name,
        fromAddress: smtp.smtp_from_address
      });
  }
  return result;
};
  render() {
    const {dataSystems} = this.props;
    const columns = [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        width: "5%"
      },
      {
        title: "Host",
        dataIndex: "host",
        align: "center",
        key: "host"
      },
      {
        title: "Port",
        dataIndex: "port",
        align: "center",
        key: "port"
      },
      {
        title: "User name",
        dataIndex: "username",
        align: "center",
        key: "username"
      },
      {
        title: "Password",
        dataIndex: "password",
        align: "center",
        key: "password"
      },
      {
        title: "From Name",
        dataIndex: "fromName",
        align: "center",
        key: "fromName"
      },
      {
        title: "From Address",
        dataIndex: "fromAddress",
        align: "center",
        key: "fromAddress"
      },
      {
        title: "Action",
        dataIndex: "index",
        key: "action",
        width: "3%",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              <a href="javascript:;" onClick={e => this.showEdit(e, record)}>
                <i className="icon icon-edit" />
              </a>
              {/* <a href="javascript:;" onClick={() => this.showAlert(record)}>
                <i className="icon icon-trash" />
              </a> */}
            </div>
          );
        }
      }
    ];
    return (
      <>
        {/* <Button type="danger" ghost onClick={this.showModal}>
          <Icon type="plus" />
          <IntlMessages id="headerPackage.Add" />
        </Button> */}
        <Table className="st-th-center" columns={columns} dataSource={this.getDataForTable(dataSystems)} />
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
  showModal = () => this.props.onShowModal(true)
}
