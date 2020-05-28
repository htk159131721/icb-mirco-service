import React, { Component } from "react";
import { Table, Input, Button, Icon, Select } from "antd";
import { Link } from "react-router-dom";
import pathRoute from "constants/pathRoute";
import moment from "moment";
import Highlighter from "react-highlight-words";
import IntlMessages from "util/IntlMessages";
import { Permission } from "util/Permission";
import CurrencyFormat from "react-currency-format";
import {showStatus} from "helpers/order"

export default class ListOder extends Component {
  state = {
    searchText: ""
  };
  componentDidMount() {
    const { orderData } = this.props;
    this.props.onGetListOrder();
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
  /********************************************** Modal ***********************************************/
  showEdit = (e, record) => {
    e.preventDefault();
    this.props.onShowModalForEdit(record);
  };
  /********************************************** Table ***********************************************/
  getDataForTable = data => {
    let result = [];
    if (data.orders) {
      data.orders.map((order, index) => {
        result.push({
          key: index + 1,
          order, 
          id: order.id,
          full_name: order.customer.full_name,
          order_code: order.order_code
        });
      });
    }
    return result;
  };
  /**
   * @function showActionOnList
   * @summary check and show icon for handle on table
   */
  showActionOnList = (record, authUser) => {
    let html;
    if (record.order.status === 2) {
      //pending
      if (Permission("saleOrderUpdate", authUser.permissions)) {
        html = (
          <Link to={`${pathRoute.CREATE_ORDER}?id=${record.order.id}`}>
            <i className="icon icon-edit" />
          </Link>
        );
      }
    }
    return html;
  };
  /**
   * @function onChangeStatus
   * @summary change status order
   */
  onChangeStatus = (value, idOrder) => {
    this.props.onUpdateStatusOrder({id: idOrder, status: value})
  }
  render() {
    const { orderData, usersData } = this.props,
      { authUser } = usersData;
    const columns = [
      {
        title: "Order ID",
        dataIndex: "id",
        align: "center",
        key: "id",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.id - b.id,
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Order Code",
        dataIndex: "order_code",
        align: "center",
        key: "order_code",
        ...this.getColumnSearchProps("order_code")
      },
      {
        title: "Customer",
        align: "center",
        dataIndex: "order.customer.full_name",
        key: "order.customer.full_name",
        ...this.getColumnSearchProps("full_name"),
        render: (text, record) => {
          return (
            <>
            <span>
              {!!record.order.customer
                ? record.order.customer.full_name
                : "NULL"}
            </span>
            <br/>
            <Button type="primary">{record.order.customer ? record.order.customer.customer_code : "NULL"}</Button>
            </>
          );
        }
      },
      {
        title: "Discount",
        align: "center",
        dataIndex: "order.promotion_value",
        key: "order.promotion_value",
        render: (text, record) => {
          return (
            <span>
              {record.order.promotion_value > 0
                ? record.order.promotion_value
                : "NULL"}
            </span>
          );
        }
      },
      {
        title: "Total",
        align: "center",
        dataIndex: "order.total_pay",
        key: "order.total_pay",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.order.total_pay}
              suffix = " USD"
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
        render: (text, record) => {
          return <span>{showStatus(record.order.status)}</span>;
          // return (
          //   <Select
          //     showSearch
          //     style={{ width: 130 }}
          //     placeholder="Select a status"
          //     optionFilterProp="children"
          //     onChange={value => this.onChangeStatus(value, record.order.id)}
          //     defaultValue = {record.order.status}
          //     filterOption={(input, option) =>
          //       option.props.children
          //         .toLowerCase()
          //         .indexOf(input.toLowerCase()) >= 0
          //     }
          //   >
          //     <Select.Option value={0}>FAILED</Select.Option>
          //     <Select.Option value={1}>SUCCESS</Select.Option>
          //     <Select.Option value={2}>PENDING</Select.Option>
          //   </Select>
          // );
        }
      },
      {
        title: "Create at",
        align: "center",
        dataIndex: "order.created_at",
        key: "order.created_at",
        render: (text, record) => {
          return (
            <span>{moment(record.order.created_at).format("DD/MM/YYYY")}</span>
          );
        }
      },

      {
        title: "Action",
        dataIndex: "index",
        key: "action",
        width: "3%",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              {this.showActionOnList(record, authUser)}
              <a href="javascript:;" onClick={e => this.showEdit(e, record)}>
                <i className="icon icon-eye" />
              </a>
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
          dataSource={this.getDataForTable(orderData)}
        />
      </>
    );
  }
}
