import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";
import { Table, Button, Input, Icon } from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";
import IntlMessages from "util/IntlMessages";

export default class ReportView extends Component {
  state = { searchText: "" };
  handleCancel = () => this.props.onShowModal(false);

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
      record.report[dataIndex]
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

  getDataForTable = data => {
    let result = [];
    if (data.listWithdrawReport.length > 0) {
      data.listWithdrawReport.map((report, index) => {
        result.push({
          key: index + 1,
          report
        });
      });
    }
    return result;
  };
  showModalUpdate = (e, value) => {
    e.preventDefault();
    this.props.showFormUpdate(value);
  };
  showStatus = status => {
    let result = (
      <Button className="gx-btn-red">
        <IntlMessages id="app.Failed" />
      </Button>
    );
    if (status === "pending") {
      result = (
        <Button type="danger" className="btn-yellow">
          <IntlMessages id="app.Pending" />
        </Button>
      );
    } else if (status === "completed") {
      result = (
        <Button type="primary">
          <IntlMessages id="app.Completed" />
        </Button>
      );
    }
    return result;
  };
  render() {
    const { reportData } = this.props;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key",
        align: "center",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.key - b.key
      },
      {
        title: "WithDraw Code",
        dataIndex: "report.code",
        align: "center",
        key: "report.code",
        ...this.getColumnSearchProps("code"),
      },
      {
        title: "Bank name",
        dataIndex: "report.account_code",
        key: "report.account_code",
        ...this.getColumnSearchProps("account_code"),
        align: "center"
      },
      {
        title: "Account name",
        dataIndex: "report.account_name",
        key: "report.account_name",
        ...this.getColumnSearchProps("account_name"),
        align: "center"
      },
      {
        title: "Account number",
        dataIndex: "report.account_number",
        align: "center",
        ...this.getColumnSearchProps("account_number"),
        key: "report.account_number"
      },
      {
        title: "Account Address",
        align: "center",
        dataIndex: "report.account_address",
        ...this.getColumnSearchProps("account_address"),
        key: "report.account_address"
      },
      {
        title: "Total payment",
        align: "center",
        dataIndex: "report.amount",
        key: "report.amount",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.report.amount}
              displayType="text"
              thousandSeparator={true}
              suffix=" USD"
            />
          );
        }
      },
      {
        title: "Status",
        dataIndex: "report.status",
        ...this.getColumnSearchProps("status"),
        align: "center",
        key: "report.status",
        render: (text, record) => {
          return <div>{this.showStatus(record.report.status)}</div>;
        }
      },
      {
        title: "Created at",
        align: "center",
        dataIndex: "report.created_at",
        ...this.getColumnSearchProps("created_at"),
        key: "report.created_at",
        render: (text, record) => {
          return <p>{moment(text).format("DD-MM-YYYY")}</p>;
        }
      },
      {
        title: "Action",
        align: "center",
        dataIndex: "report.id",
        key: "report.id",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              <a
                href="javascript:;"
                onClick={e => this.showModalUpdate(e, record)}
              >
                <i className="icon icon-edit" title="Update" />
              </a>
            </div>
          );
        }
      }
    ];

    return (
      <div className="wrapper-report-view">
        <div className="content-report">
          <Table
            className="table-order"
            columns={columns}
            loading={this.props.generalData.loaderTable}
            pagination={{ pageSize: this.props.generalData.pageSize }}
            dataSource={this.getDataForTable(reportData)}
            scroll={{x: 1400}}
          />
        </div>
      </div>
    );
  }
}
