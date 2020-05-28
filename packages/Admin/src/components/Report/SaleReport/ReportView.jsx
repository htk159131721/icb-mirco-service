import React, { Component } from "react";
import { Table, Button } from "antd";
import CurrencyFormat from "react-currency-format";
import {showStatusOfReport} from "helpers/order"
import moment from "moment";

export default class ReportView extends Component {
  componentDidMount() {
    const { reportData } = this.props;
    if (reportData.listSaleReport.length <= 0) this.props.onGetListSaleReport();
  }

  getDataForTableOrder = data => {
    let result = [];
    if (data.listSaleReport) {
      data.listSaleReport.map((saleReport, index) => {
        result.push({
          key: index + 1,
          index,
          saleReport, 
          status: showStatusOfReport(saleReport.status),
          full_name: `${saleReport.first_name} ${saleReport.last_name}`,
          orderID: saleReport.id
        });
      });
    }
    return result;
  };

  onTurnOnShowModal = record => {
    this.props.onTurnOnShowModal(record);
  };

  /**
   * @function showStatusHasButton
   * @summary filter and show status with button
   */
  showStatusHasButton = (status) => {
    let result = "";
    switch (status) {
      case 1:
        result = <Button type="primary">COMPLETE</Button>;
        break;
      case 2:
        result = <Button type="danger" className="btn-yellow">NEW</Button>;
        break;
      case 3:
        result = <Button type="danger" className="btn-red">PENDING</Button>;
        break;
      default:
        result = <Button type="primary">COMPLETE</Button>;
        break;
    }
    return result;
  };

  render() {
    const { reportData } = this.props;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        align:"center",
        key: "key",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.key - b.key
      },
      {
        title: "Order ID",
        dataIndex: "orderID",
        align: "center",
        key: "orderID"
      },
      {
        title: "Order Code",
        dataIndex: "saleReport.id",
        align:"center",
        key: "saleReport.id",
        onCell: (record, rowIndex) => {
          return {
            onClick: e => this.onTurnOnShowModal(record.saleReport.id)
          };
        },
        render: (text, record) => {
          return (
            <>
              <span>{record.saleReport.order_code}</span>
              <br />
              <a href="javascript:;">View</a>
            </>
          );
        }
      },
      {
        title: "Customer",
        align:"center",
        dataIndex: "full_name",
        key: "full_name",
        render: (text, record) => {
          return <span>{text}</span>;
        }
      },
      {
        title: "Status",
        dataIndex: "saleReport.status",
        align:"center",
        key: "saleReport.status",
        render: (text, record) => {
          return <span>{this.showStatusHasButton(record.saleReport.status)}</span>;
        }
      },
      {
        title: "Promotion Code",
        dataIndex: "saleReport.promotion_code",
        align:"center",
        key: "saleReport.promotion_code",
        render: (text, record) => {
          return (
            <span>
              {record.saleReport.promotion_code
                ? record.saleReport.promotion_code
                : ""}
            </span>
          );
        }
      },
      {
        title: "Promotion Value",
        dataIndex: "saleReport.promotion_value",
        align:"center",
        key: "saleReport.promotion_value",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.saleReport.promotion_value ? record.saleReport.promotion_value : 0}
              displayType="text"
              thousandSeparator={true}
              suffix=" USD"
            />
          );
        }
      },
      {
        title: "Total Pay",
        dataIndex: "saleReport.total_pay",
        align:"center",
        key: "saleReport.total_pay",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.saleReport.total_pay}
              displayType="text"
              thousandSeparator={true}
              suffix=" USD"
            />
          );
        }
      },
      {
        title: "Total Commission",
        dataIndex: "saleReport.total_commission",
        align: "center",
        key: "saleReport.total_commission",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.saleReport.total_commission ? record.saleReport.total_commission : 0}
              displayType="text"
              thousandSeparator={true}
              suffix=" USD"
            />
          );
        }
      },
      {
        title: "Gross Profit",
        dataIndex: "saleReport.gross_profit",
        align: "center",
        key: "saleReport.gross_profit",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.saleReport.gross_profit ? record.saleReport.gross_profit : 0}
              displayType="text"
              thousandSeparator={true}
              suffix=" USD"
            />
          );
        }
      },
      {
        title: "Created at",
        dataIndex: "saleReport.created_at",
        align: "center",
        key: "saleReport.created_at",
        render: (text, record) => {
          return (
            <p>{moment(text).format("DD-MM-YYYY")}</p>
          );
        }
      }
    ];

    const footerSumTableOrder = props => {
      return (
        <tbody {...props}>
          {props.children}
          <tr className="ant-table-row" style={{fontWeight: "500", fontSize: "16px"}}>
            <td colSpan="5">Total:</td>
            <td className="gx-text-center">
               <CurrencyFormat
                value={this.getDataForTableOrder(reportData).reduce(
                  (sum, i) => sum + i.saleReport.promotion_value,
                  0
                )}
                displayType="text"
                thousandSeparator={true}
                suffix=" USD"
              />
            </td>
            <td className="gx-text-center">
              <CurrencyFormat
                value={this.getDataForTableOrder(reportData).reduce(
                  (sum, i) => sum + i.saleReport.total_pay,
                  0
                )}
                displayType="text"
                thousandSeparator={true}
                suffix=" USD"
              />
            </td>
            <td className="gx-text-center">
              <CurrencyFormat
              value={this.getDataForTableOrder(reportData).reduce(
                (sum, i) => sum + i.saleReport.total_commission,
                0
              )}
              displayType="text"
              thousandSeparator={true}
              suffix=" USD"
            />
            </td>
            <td className="gx-text-center">
            <CurrencyFormat
              value={this.getDataForTableOrder(reportData).reduce(
                (sum, i) => sum + i.saleReport.gross_profit,
                0
              )}
              displayType="text"
              thousandSeparator={true}
              suffix=" USD"
            />
            </td>
            <td className="gx-text-center">-</td>
          </tr>
        </tbody>
      );
    };
    return (
      <div className="wrapper-report-view">
        <div className="content-report">
          <Table
            className="table-order"
            components={{ body: { wrapper: footerSumTableOrder } }}
            columns={columns}
            dataSource={this.getDataForTableOrder(reportData)}
            scroll={{ x: 1300 }}
          />
        </div>
      </div>
    );
  }
}
