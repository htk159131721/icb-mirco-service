import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";
import SweetAlert from "react-bootstrap-sweetalert";
import CurrencyFormat from "react-currency-format";

import IntlMessages from "util/IntlMessages";

export default class ListReceipt extends Component {
  state = {
    searchText: "",
    warning: false,
    idDel: 0
  };
  componentDidMount() {
    this.props.onGetListReceipt();
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
          placeholder={`Search `}
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
  confirmDel = id => {
    this.setState({ warning: true, idDel: id });
  };
  onCancelDelete = () => this.setState({ warning: false });
  onDelete = () => {
    this.setState({ warning: false });
    this.props.onDeleteReceipt(this.state.idDel);
  };
  /********************************************** Table ***********************************************/
  getDataForTable = data => {
    let result = [];
    if (data.listReceipt.length > 0) {
      data.listReceipt
        .sort((a, b) => b.order_id - a.order_id)
        .map((receipt, index) => {
          result.push({
            key: index + 1,
            receipt,
            order_id: receipt.order_id,
            tracsaction_code: receipt.tracsaction_code
          });
        });
    }
    return result;
  };
  render() {
    const { receiptData } = this.props;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key",
        width: "5%",
        defaultSortOrder: "asc",
        sorter: (a, b) => a.key - b.key
      },
      {
        title: "Order ID",
        align: "center",
        dataIndex: "order_id",
        key: "order_id",
        ...this.getColumnSearchProps("order_id")
      },
      {
        title: "Receipt Code",
        align: "center",
        dataIndex: "tracsaction_code",
        key: "tracsaction_code",
        ...this.getColumnSearchProps("tracsaction_code")
      },
      {
        title: "Payment Method",
        align: "center",
        dataIndex: "receipt.payment_method",
        key: "receipt.payment_method"
      },
      {
        title: "Type",
        dataIndex: "receipt.type",
        align: "center",
        key: "receipt.type"
      },
      {
        title: "Money Paid",
        align: "center",
        dataIndex: "receipt.curencyUSD",
        key: "receipt.curencyUSD",
        render: (text, record) => {
          return (
            <CurrencyFormat
              suffix=" USD"
              value={record.receipt.curencyUSD}
              displayType={"text"}
              thousandSeparator={true}
            />
          );
        }
      },
      {
        title: "Created at",
        dataIndex: "receipt.created_at",
        align: "center",
        key: "receipt.created_at",
        render: (text, record) => {
          return (
            <span>
              {moment(record.receipt.created_at).format("DD-MM-YYYY HH:mm")}
            </span>
          );
        }
      },
      {
        title: "Action",
        align: "center",
        dataIndex: "receipt.id",
        key: "action",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              {moment(new Date()).diff(
                moment(record.receipt.created_at),
                "hours"
              ) > 24 ? (
                <a
                  href="javascript:;"
                  onClick={() => this.props.onCallModalUpdate(record)}
                >
                  <i className="icon icon-edit" />
                </a>
              ) : (
                <>
                  <a
                    href="javascript:;"
                    onClick={() => this.props.onCallModalUpdate(record)}
                  >
                    <i className="icon icon-edit" />
                  </a>
                  <a
                    href="javascript:;"
                    onClick={() => this.confirmDel(record.receipt.id)}
                  >
                    <i className="icon icon-trash" />
                  </a>
                </>
              )}
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
          dataSource={this.getDataForTable(receiptData)}
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
