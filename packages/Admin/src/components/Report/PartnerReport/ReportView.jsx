import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";
import { Table, Button } from "antd";
import IntlMessages from "util/IntlMessages";
import moment from "moment";

export default class ReportView extends Component {
  state = {
    type: "from",
    customerSelect: null
  };
  componentDidMount() {
    this.props.onGetListPartnerReport();
  }

  getDataForTable = data => {
    let result = [];
    if (data.listPartnerReport.length > 0) {
      data.listPartnerReport.map((report, index) => {
        result.push({
          key: index + 1,
          report
        });
      });
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
        title: "Partner (Level 5)",
        dataIndex: "report.full_name",
        align: "center",
        key: "report.full_name"
      },
      {
        title: "Total User Level 4",
        dataIndex: "report.level4",
        key: "report.level4"
      },
      {
        title: "Total User Level 3",
        dataIndex: "report.level3",
        key: "report.level3"
      },
      {
        title: "Total User Level 2",
        align: "center",
        dataIndex: "report.level2",
        key: "report.level2"
      },
      {
        title: "Total User Level 1",
        align: "center",
        dataIndex: "report.level1",
        key: "report.level1"
      },
      {
        title: "Total User Level 0",
        align: "center",
        dataIndex: "report.level0",
        key: "report.level0"
      },
      {
        title: "Total Sales",
        dataIndex: "report.totalOrderMoneyComplete",
        align: "center",
        key: "report.totalOrderMoneyComplete",
        render: (txt, record) => {
          return (
            <CurrencyFormat
              displayType="text"
              value = {txt}
              suffix=" USD"
              thousandSeparator={true}
            />
          )
        }
      },
      {
        title: "Total Order",
        dataIndex: "report.totalOrder",
        align: "center",
        key: "report.totalOrder"
      },
      {
        title: "Total Order Complete",
        dataIndex: "report.totalOrderComplete",
        align: "center",
        key: "report.totalOrderComplete"
      },
      {
        title: "Total Package",
        dataIndex: "report.totalPackage",
        align: "center",
        key: "report.totalPackage"
      },
      {
        title: "Total Combo",
        dataIndex: "report.totalCombo",
        align: "center",
        key: "report.totalCombo"
      },
      {
        title: "Created at",
        align: "center",
        dataIndex: "report.created_at",
        key: "report.created_at",
        render: (text, record) => {
          return <p>{moment(text).format("DD-MM-YYYY")}</p>;
        }
      }
    ];

    return (
      <div className="wrapper-report-view">
        <div className="content-report">
          <Table
            className="table-order"
            columns={columns}
            pagination={{ pageSize: 50 }}
            dataSource={this.getDataForTable(reportData)}
            scroll={{x: 1800}}
          />
        </div>
      </div>
    );
  }
}
