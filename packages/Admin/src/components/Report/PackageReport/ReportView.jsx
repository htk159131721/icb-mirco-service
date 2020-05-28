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
    this.props.onGetListPackageReport();
  }

  getDataForTable = data => {
    let result = [];
    if (data.listPackageReport.length > 0) {
      data.listPackageReport.map((report, index) => {
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
        title: "Package",
        dataIndex: "report.title",
        align: "center",
        key: "report.title"
      },
      {
        title: "Quantity",
        dataIndex: "report.qty",
        key: "report.qty"
      },
      {
        title: "Complete",
        dataIndex: "report.comlepte",
        key: "report.comlepte"
      },
      {
        title: "First Paid",
        dataIndex: "report.first_paid",
        align: "center",
        key: "report.first_paid",
        render: (txt, record) => {
          return (
            <CurrencyFormat
              displayType="text"
              value = {txt}
              thousandSeparator={true}
            />
          )
        }
      },
      {
        title: "Un Paid",
        dataIndex: "report.unpaid",
        align: "center",
        key: "report.unpaid",
        render: (txt, record) => {
          return (
            <CurrencyFormat
              displayType="text"
              value = {txt}
              thousandSeparator={true}
            />
          )
        }
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
            scroll={{x: 500}}
          />
        </div>
      </div>
    );
  }
}
