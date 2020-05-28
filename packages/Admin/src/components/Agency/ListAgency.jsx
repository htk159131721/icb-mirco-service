import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";
import SweetAlert from "react-bootstrap-sweetalert";

import IntlMessages from "util/IntlMessages";
import { Permission } from "util/Permission";

export default class ListAgency extends Component {
  state = {
    searchText: "",
    warning: false,
    idDel: 0
  };
  componentDidMount() {
    const {agenciesData} = this.props;
    if(agenciesData.listAgencies.length <= 0)
      this.props.onGetListAgency();
  }
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
    this.setState({warning: false})
    this.props.onDeleteAgency(this.state.idDel)
  };
  /********************************************** Modal ***********************************************/
  showEdit = (e, record) => {
    e.preventDefault();
    this.props.onShowModalEdit(record);
  };
  /********************************************** Table ***********************************************/
  getDataForTable = data => {
    let result = [];
    const {usersData} = this.props,
      {authUser} = usersData;
    if (data.listAgencies.length > 0) {
      data.listAgencies.map((agency, index) => {
        result.push({
          key: index + 1,
          index,
          id: agency.id,
          agencyName: agency.agency_name,
          taxCode: agency.tax_code,
          email: agency.email,
          phone: agency.phone_number,
          address: agency.address,
          province: agency.province ? agency.province : null,
          country: agency.country ? agency.country : "NULL",
          avatar: agency.image ? process.env.REACT_APP_URL+agency.image : undefined,
          created_at: agency.created_at
            ? moment(agency.created_at).format("DD-MM-YYYY")
            : "NULL"
        });
      });
    }
    return result;
  };
  render() {
    const { usersData, agenciesData } = this.props,
      { authUser } = usersData;
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
        title: "Agency name",
        dataIndex: "agencyName",
        key: "agencyName",
        ...this.getColumnSearchProps("agencyName")
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email")
      },
      {
        title: "Phone number",
        dataIndex: "phone",
        key: "phone",
        ...this.getColumnSearchProps("phone")
      },
      {
        title: "Country",
        align: 'center',
        dataIndex: "country",
        key: "country",
        ...this.getColumnSearchProps("country")
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        ...this.getColumnSearchProps("address")
      },
      {
        title: "Created at",
        dataIndex: "created_at",
        key: "created_at",
        ...this.getColumnSearchProps("created_at")
      },
      {
        title: "Action",
        dataIndex: "index",
        key: "action",
        width: "3%",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              {Permission("userUpdate", authUser.permissions) ? (
                <a href="javascript:;" onClick={e => this.showEdit(e, record)}>
                  <i className="icon icon-edit" />
                </a>
              ) : null}
              {Permission("userDelete", authUser.permissions) ? (
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
        <Table
          className="st-th-center st-background-header"
          loading={this.props.generalData.loaderTable}
          pagination={{ pageSize: this.props.generalData.pageSize }}
          columns={columns}
          dataSource={this.getDataForTable(agenciesData)}
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
