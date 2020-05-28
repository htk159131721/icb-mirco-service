import React, { Component } from "react";
import { Table, Button } from "antd";
import moment from "moment";
import IntlMessages from "util/IntlMessages";
import CurrencyFormat from "react-currency-format";

export default class ListCommission extends Component {
  /********************************************** Table ***********************************************/
  getDataForTable = data => {
    let result = [];
    if (data.listWithdraw) {
      data.listWithdraw.map((obj, index) => {
        result.push({
          key: index + 1,
          obj
        });
      });
    }
    return result;
  };

  render() {
    const { withdrawData } = this.props;
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
        title: "Code",
        align: "center",
        dataIndex: "obj.code",
        key: "obj.code"
      },
      {
        title: "Account Name",
        align: "center",
        dataIndex: "obj.account_name",
        key: "obj.account_name"
      },
      {
        title: "Account Number",
        align: "center",
        dataIndex: "obj.account_number",
        key: "obj.account_number"
      },
      {
        title: "Amount",
        align: "center",
        dataIndex: "obj.amount",
        key: "obj.amount",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.obj.amount}
              displayType={"text"}
              suffix=" USD"
              thousandSeparator={true}
            />
          );
        }
      },
      {
        title: "Status",
        align: "center",
        dataIndex: "obj.status",
        key: "obj.status",
        render: (text, record) => {
          return (
            <div>
              {record.obj.status === "pending" ? (
                <Button type="danger" className="btn-yellow">
                  <IntlMessages id="app.Pending" />
                </Button>
              ) : (
                <Button type="primary">
                  <IntlMessages id="app.Approved" />
                </Button>
              )}
            </div>
          );
        }
      },
      {
        title: "Create at",
        align: "center",
        dataIndex: "obj.created_at",
        key: "obj.created_at",
        render: (text, record) => {
          return (
            <span>{moment(record.obj.created_at).format("DD/MM/YYYY")}</span>
          );
        }
      }
    ];
    return (
      <div>
        <Table
          className="st-th-center st-background-header"
          scroll={{ x: 500 }}
          pagination={{pageSize: 20}}
          columns={columns}
          dataSource={this.getDataForTable(withdrawData)}
        />
      </div>
    );
  }
}
