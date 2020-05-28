import React, { Component } from "react";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { Table, Input, Button, Icon, Modal } from "antd";
import Highlighter from "react-highlight-words";
import {showStatusOfReport} from "helpers/order"

// export default class ReportView extends Component {
//   componentDidMount() {
//     this.props.onGetListPaymentReport()
//   }
//   getDataForTableOrder = () => {
//     const data = [
//       {
//         key: "1",
//         id: 1,
//         value: 32,
//         customer: "NVA",
//         note: "abc def",
//         status: "Complete",
//         dept: 13,
//         created_at: "10/10/2019",
//         children: [
//           {
//             key: "1.1",
//             id: "alepay 1",
//             value: 30,
//             customer: "NVA",
//             note: "abc def",
//             status: "Success",
//             dept: 0,
//             created_at: "10/10/2019"
//           },
//           {
//             key: "1.2",
//             id: "alepay 2",
//             value: 2,
//             customer: "NVA",
//             note: "abc def",
//             status: "Success",
//             dept: 0,
//             created_at: "10/10/2019"
//           }
//         ]
//       },
//       {
//         key: "2",
//         id: 2,
//         value: 40,
//         customer: "NVB",
//         note: "abc def",
//         status: "Complete",
//         dept: 0,
//         created_at: "10/10/2019"
//       }
//     ];
//     return data;
//   };
//   onTurnOnShowModal = record => {
//     this.props.onTurnOnShowModal(record);
//   };
//   render() {
//     const columns = [
//       {
//         title: "#",
//         dataIndex: "key",
//         key: "key"
//       },
//       {
//         title: "ID",
//         dataIndex: "id",
//         key: "id"
//       },
//       {
//         title: "Customer",
//         dataIndex: "customer",
//         key: "customer"
//       },
//       {
//         title: "Value",
//         dataIndex: "value",
//         key: "value"
//       },
//       {
//         title: "Status",
//         dataIndex: "status",
//         key: "status"
//       },
//       {
//         title: "Created at",
//         dataIndex: "created_at",
//         key: "created_at"
//       }
//     ];

//     const footerSumTable = props => {
//       return (
//         <tbody {...props}>
//           {props.children}
//           <tr className="ant-table-row">
//             <td colSpan="4">Total:</td>
//             <td>
//               {this.getDataForTableOrder().reduce(
//                 (sum, i) => sum + i.value,
//                 0
//               )}
//             </td>
//             <td>-</td>
//             <td>-</td>
//           </tr>
//         </tbody>
//       );
//     };
//     const rowSelection = {
//       columnTitle: "",
//       onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//       }
//     };
//     return (
//       <div className="wrapper-report-view">
//         <div className="content-report">
//           <Table
//             className="table-order st-hide-selection"
//             components={{ body: { wrapper: footerSumTable } }}
//             columns={columns}
//             rowSelection={rowSelection}
//             dataSource={this.getDataForTableOrder()}
//           />
//         </div>
//       </div>
//     );
//   }
// }
export default class ReportView extends Component {
  state = {
    searchText: ""
  }
  componentDidMount() {
    this.props.onGetListPaymentReport();
  }
  getDataForTableOrder = data => {
    let result = [];
    if (data.listPaymentReport.length > 0) {
      data.listPaymentReport.map((report, index) => {
        result.push({
          key: index + 1,
          order_id: report.orderID,
          transaction_code: report.tracsaction_code,
          full_name: `${report.first_name} ${report.last_name}`,
          payment_method: report.payment_method,
          created_at: moment(report.created_at).format("DD-MM-YYYY"),
          status: report.status,
          report
        });
      });
    }
    return result;
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
        result = <Button type="danger" className="btn-red">FAILED</Button>;
        break;
      default:
        result = <Button type="primary">COMPLETE</Button>;
        break;
    }
    return result;
  };
  render() {
    const {reportData} = this.props;
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
        title: "Order Code",
        dataIndex: "order_id",
        align: "center",
        key: "order_id"
      },
      {
        title: "Full name",
        dataIndex: "full_name",
        align: "center",
        key: "full_name"
      },
      {
        title: "Transaction Code",
        dataIndex: "transaction_code",
        align: "center",
        key: "transaction_code"
      },
      {
        title: "Payment Method",
        dataIndex: "payment_method",
        align: "center",
        key: "payment_method"
      },
      {
        title: "Value",
        dataIndex: "report.curencyUSD",
        key: "report.curencyUSD",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.report.curencyUSD}
              suffix=" USD"
              displayType="text"
              thousandSeparator={true}
            />
          );
        }
      },
      {
        title: "Status",
        dataIndex: "status",
        align: "center",
        key: "status",
        render: (text, record) => {
          return (
            <span>
              {this.showStatusHasButton(record.report.status)}
            </span>
          )
        }
      },
      {
        title: "Created at",
        dataIndex: "created_at",
        align: "center",
        key: "created_at",
        render:(text, record) => {
          return (
            <span>{
              moment(record.report.created_at).format("DD-MM-YYYY")
            }</span>
          )
        }
      }
    ];

    return (
      <div className="wrapper-report-view">
        <div className="content-report">
          <Table
            className="table-order"
            columns={columns}
            dataSource={this.getDataForTableOrder(reportData)}
            scroll={{x: 1000}}
          />
        </div>
      </div>
    );
  }
}
