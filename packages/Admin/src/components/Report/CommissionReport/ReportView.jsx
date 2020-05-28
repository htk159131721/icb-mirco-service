import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";
import { Table, Button, Modal } from "antd";
import IntlMessages from "util/IntlMessages";
import moment from "moment"

export default class ReportView extends Component {
  state = {
    searchText: "",
    type: "from",
    customerSelect: null
  };
  componentDidMount() {
    const { reportData } = this.props;
    if (reportData.listCommissionReport.length <= 0)
      this.props.onGetListCommissionReport();
  }

  /**
   * @function showInfoModal
   * @summary set and show info modal
   */
  showInfoModal = (type, data) => {
    this.setState({ type, customerSelect: data }, () => this.props.onShowModal(true));
  };

  handleCancel = () => this.props.onShowModal(false)

  getDataForTable = data => {
    let result = [];
    if (data.listCommissionReport.length > 0) {
      data.listCommissionReport.map((report, index) => {
        result.push({
          key: index + 1,
          order_id: report.order_id,
          from_user: `${report.from_first_name} ${report.from_last_name}`,
          to_user: `${report.to_first_name} ${report.to_last_name}`,
          status: parseInt(report.status) === 0 ? "PENDING" : "APPROVED",
          report
        });
      });
    }
    return result;
  };
  render() {
    const { reportData } = this.props,
    {type, customerSelect} = this.state;
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
        title: "Order ID",
        dataIndex: "order_id",
        align: "center",
        key: "order_id"
      },
      {
        title: "From User",
        dataIndex: "from_user",
        key: "from_user",
        onCell: (record, rowIndex) => {
          return {
            onClick: () => this.showInfoModal("from", record)
          };
        },
        render: (text, record) => {
          return (
            <>
              <p>{text}</p>
              <a href="javascript:;">View</a>
            </>
          );
        }
      },
      {
        title: "To User",
        dataIndex: "to_user",
        key: "to_user",
        onCell: (record, rowIndex) => {
          return {
            onClick: () => this.showInfoModal("to", record)
          };
        },
        render: (text, record) => {
          return (
            <>
              <p>{record.to_user}</p>
              <a href="javascript:;">View</a>
            </>
          );
        }
      },
      {
        title: "Commission Value",
        align: "center",
        dataIndex: "report.value",
        key: "report.value",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.report.value}
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
        align: "center",
        key: "report.status",
        render: (text, record) => {
          return (
            <div>
              {parseInt(record.report.status) === 0 ? (
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
        title: "Created at",
        align: "center",
        dataIndex: "report.created_at",
        key: "report.created_at",
        render: (text, record) => {
          return (
            <p>{moment(text).format("DD-MM-YYYY")}</p>
          );
        }
      },
    ];

    return (
      <div className="wrapper-report-view">
        <div className="content-report">
          <Table
            className="table-order"
            columns={columns}
            pagination={{ pageSize: 50 }}
            dataSource={this.getDataForTable(reportData)}
          />
        </div>
        <Modal
          visible={this.props.generalData.showModalPackage}
          title= {<IntlMessages id="app.CustomerInfo" />}
          width="300px"
          onCancel={this.handleCancel}
          footer={null}
        >
          {
            customerSelect
            ? type === "from"
              ? (
                <div>
                  <p>
                    <IntlMessages id="appModule.email" />: {customerSelect.report.from_email}
                  </p>
                  <p>
                    <IntlMessages id="table.Level" />: {customerSelect.report.from_level_commissions}
                  </p>
                </div>
              )
              : (
                <div>
                  <p>
                    <IntlMessages id="appModule.email" />: {customerSelect.report.to_email}
                  </p>
                  <p>
                    <IntlMessages id="table.Level" />: {customerSelect.report.to_level_commissions}
                  </p>
                </div>
              )
            : null
          }
        </Modal>
      </div>
    );
  }
}
