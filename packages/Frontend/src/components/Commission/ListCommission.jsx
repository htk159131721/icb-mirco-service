import React, { Component } from "react";
import { Table, Button } from "antd";
import moment from "moment";
import IntlMessages from "util/IntlMessages";
import CurrencyFormat from "react-currency-format";

export default class ListCommission extends Component {
  /********************************************** Table ***********************************************/
  getDataForTable = data => {
    let result = [];
    if (data.listCMS) {
      data.listCMS.map((cms, index) => {
        result.push({
          key: index + 1,
          full_name: `${cms.from_first_name} ${cms.from_last_name}`,
          cms
        });
      });
    }
    return result;
  };

  render() {
    const { CMSData } = this.props;
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
        title: "Order Code",
        align: "center",
        dataIndex: "cms.order_code",
        key: "cms.order_code"
      },
      {
        title: "From Customer",
        align: "center",
        dataIndex: "full_name",
        key: "full_name",
        render: (txt, record) => {
          return (
            <div>
              <p>{txt}</p>
              <p>Level : {record.cms.from_level_commissions}</p>
            </div>
          );
        }
      },
      {
        title: "Value",
        align: "center",
        dataIndex: "cms.value",
        key: "cms.value",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.cms.value}
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
        dataIndex: "cms.status",
        key: "cms.status",
        render: (text, record) => {
          return (
            <div>
              {parseInt(record.cms.status) === 0 ? (
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
        dataIndex: "cms.created_at",
        key: "cms.created_at",
        render: (text, record) => {
          return (
            <span>{moment(record.cms.created_at).format("DD/MM/YYYY")}</span>
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
          dataSource={this.getDataForTable(CMSData)}
        />
      </div>
    );
  }
}
