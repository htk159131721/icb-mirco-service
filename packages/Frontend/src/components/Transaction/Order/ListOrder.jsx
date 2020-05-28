import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";
import CurrencyFormat from "react-currency-format";

export default class ListOder extends Component {
  state = {
    searchText: ""
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
          placeholder={`Search`}
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
  /********************************************** Table ***********************************************/
  showStatus = status => {
    let result = "";
    switch (status) {
      case 1:
        result = "COMPLETED";
        break;
      case 2:
        result = "NEW";
        break;
      case 0:
        result = "PENDING PAYMENT";
        break;
      default:
        result = "COMPLETE";
        break;
    }
    return result;
  };
  getDataForTable = data => {
    let result = [];
    if (data.orders) {
      data.orders.map((order, index) => {
        result.push({
          key: index + 1,
          order
        });
      });
    }
    return result;
  };

  /**
   * @function getOrderDetail
   */
  getOrderDetail = (e, id) => {
    e.preventDefault();
    this.props.onGetDetailOrder(id);
  };
  render() {
    const { orderData } = this.props;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        align: "center",
        key: "key",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.key - b.key
      },
      {
        title: "Order ID",
        align: "center",
        dataIndex: "order.order_code",
        key: "order.order_code",
        ...this.getColumnSearchProps("order.order_code")
      },
      {
        title: "Promotion Code",
        align: "center",
        dataIndex: "order.promotion_code",
        key: "order.promotion_code"
      },
      {
        title: "Discount",
        align: "center",
        dataIndex: "order.promotion_value",
        key: "order.promotion_value"
      },
      {
        title: "Total",
        align: "center",
        dataIndex: "order.total_pay",
        key: "order.total_pay",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.order.total_pay - b.order.total_pay,
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.order.total_pay}
              displayType={"text"}
              thousandSeparator={true}
            />
          );
        }
      },
      {
        title: "Status",
        align: "center",
        dataIndex: "order.status",
        key: "order.status",
        ...this.getColumnSearchProps("order.status"),
        render: (text, record) => {
          return <span>{this.showStatus(record.order.status)}</span>;
        }
      },
      {
        title: "Create at",
        align: "center",
        dataIndex: "order.created_at",
        key: "order.created_at",
        render: (text, record) => {
          return (
            <span>{moment(record.order.created_at).add(7, "hours").format("DD/MM/YYYY")}</span>
          );
        }
      },
      {
        title: "Action",
        align: "center",
        dataIndex: "order.id",
        key: "order.id",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              <a
                href="#"
                onClick={e => this.getOrderDetail(e, record.order.id)}
              >
                <i
                  style={{ fontSize: "25px" }}
                  className="icon icon-eye"
                  title="View detail"
                />
              </a>
            </div>
          );
        }
      }
    ];
    return (
      <Table
        className="st-th-center st-background-header"
        scroll={{ x: 500 }}
        columns={columns}
        dataSource={this.getDataForTable(orderData)}
      />
    );
  }
}
