import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import CurrencyFormat from "react-currency-format";
import Highlighter from "react-highlight-words";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";
import moment from "moment";

import IntlMessages from "util/IntlMessages";
import { Permission } from "util/Permission";
import path from "constants/pathRoute";

export default class ListNews extends Component {
  state = {
    searchText: "",
    warning: false,
    idDel: 0
  };
  componentDidMount() {
    const { dataNews } = this.props;
    if (dataNews.listNews.length <= 0) this.props.getListNews();
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
    this.setState({ warning: true, idDel: record.news.id });
  };
  onCancelDelete = () => this.setState({ warning: false });
  onDelete = () => {
    this.setState({ warning: false });
    this.props.onDeleteNews(this.state.idDel);
  };
  /********************************************** Modal ***********************************************/
  showModal = (e, record) => {
    e.preventDefault();
    this.props.onShowModalForEdit(record);
  };
  /************************ Table *************************** */
  getDataForTable = data => {
    let result = [];
    if (data.listNews) {
      data.listNews.map((news, index) => {
        result.push({
          key: index + 1,
          created_at: moment(news.created_at).format("DD-MM-YYYY"),
          status: parseInt(news.status) === 0 ? "HIDDEN" : "DISPLAY",
          news
        });
      });
    }
    return result;
  };
  render() {
    const { dataNews, usersData } = this.props,
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
        title: "Title",
        dataIndex: "news.title",
        align: "center",
        key: "news.title"
      },
      {
        title: "Slug",
        dataIndex: "news.slug",
        align: "center",
        key: "news.slug"
      },
      {
        title: "Description",
        dataIndex: "news.intro",
        align: "center",
        key: "news.intro"
      },
      {
        title: "Display on homepage",
        dataIndex: "status",
        align: "center",
        key: "status",
        ...this.getColumnSearchProps("status"),
        render: (text, record) => {
          return (
            <div>
              {parseInt(record.news.status) === 0 ? (
                <Button type="danger" className="btn-yellow">
                  HIDDEN
                </Button>
              ) : (
                <Button type="primary">DISPLAY</Button>
              )}
            </div>
          );
        }
      },
      {
        title: "Created at",
        dataIndex: "created_at",
        align: "center",
        key: "created_at",
        ...this.getColumnSearchProps("created_at"),
        render: (text, record) => {
          return <span>{record.created_at}</span>;
        }
      },
      {
        title: "Action",
        dataIndex: "index",
        key: "action",
        width: "3%",
        fixed: "right",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              {Permission("salePackageUpdate", authUser.permissions) ? (
                <a href="javascript:;" onClick={e => this.showModal(e, record)}>
                  <i className="icon icon-edit" title="Update" />
                </a>
              ) : null}
              {Permission("salePackageDelete", authUser.permissions) ? (
                <a href="javascript:;" onClick={() => this.showAlert(record)}>
                  <i className="icon icon-trash" title="Delete" />
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
          dataSource={this.getDataForTable(dataNews)}
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
