import React, { Component } from "react";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { Table, Row, Col, Modal, Button, Icon } from "antd";
import IntlMessage from "util/IntlMessages";
import { showStatus } from "helpers/order";

export default class ModalDetailView extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  showModal = id => {
    this.props.onGetDetailReport(id);
  };
  handleCancelModal = () => this.props.onShowModal(false);
  getDataForTablePackage = data => {
    let result = [];
    if (data.orderDetailReport) {
      data.orderDetailReport.orderDetails.map((order, index) => {
        result.push({
          key: index + 1,
          order
        });
      });
    }
    return result;
  };
  getDataForTablePayment = (data) => {
    let result = [];
    if (data.orderDetailReport) {
      if(data.orderDetailReport.receipts){
        data.orderDetailReport.receipts.map((receipt, index) => {
          result.push({
            key: index + 1,
            receipt
          });
        });
      }
      
    }
    return result;
  };
  /**
   * @function showViewDetail
   * @summary show view detail order
   */
  showViewDetail = data => {
    let result = null;
    const columnsPackage = [
      {
        title: "#",
        width: 60,
        dataIndex: "key",
        key: "key"
      },
      {
        title: "Package",
        dataIndex: "order.name",
        key: "order.name"
      },
      {
        title: "Type",
        dataIndex: "order.type",
        key: "order.type"
      },
      {
        title: "Price",
        dataIndex: "order.price",
        key: "order.price",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.order.total}
              suffix=" USD"
              displayType="text"
              thousandSeparator={true}
            />
          );
        }
      }
    ];
    const columnsPayment = [
      {
        title: "#",
        width: 60,
        dataIndex: "key",
        key: "key"
      },
      {
        title: "Payment ID",
        dataIndex: "receipt.tracsaction_code",
        key: "receipt.tracsaction_code"
      },
      {
        title: "Value",
        dataIndex: "receipt.curencyUSD",
        key: "receipt.curencyUSD",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={record.receipt.curencyUSD}
              suffix=" USD"
              displayType="text"
              thousandSeparator={true}
            />
          )
        }
      },
      {
        title: "Payment Method",
        dataIndex: "receipt.payment_method",
        key: "receipt.payment_method"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text, record) => {
          return (
            <span>
              {showStatus(record.receipt.status)}
            </span>
          )
        }
      }
      // {
      //   title: "Commission for Sponsor",
      //   dataIndex: "commission",
      //   key: "commission"
      // },
      // {
      //   title: "Payment Info",
      //   dataIndex: "paymentInfo",
      //   key: "paymentInfo"
      // }
    ];

    const footerSumTablePackage = props => {
      return (
        <tbody {...props}>
          {props.children}
          <tr className="ant-table-row">
            <td colSpan="3">Total:</td>
            <td>
              <CurrencyFormat
                value={this.getDataForTablePackage(data).reduce(
                  (sum, i) => sum + i.order.price,
                  0
                )}
                suffix=" USD"
                displayType="text"
                thousandSeparator={true}
              />
            </td>
          </tr>
        </tbody>
      );
    };
    const footerSumTablePayment = props => {
      return (
        <tbody {...props}>
          {props.children}
          <tr className="ant-table-row">
            <td colSpan="2">Total:</td>
            <td>
            <CurrencyFormat
                value={this.getDataForTablePayment(data).reduce(
                  (sum, i) => sum + i.receipt.curencyUSD,
                  0
                )}
                suffix=" USD"
                displayType="text"
                thousandSeparator={true}
              />
            </td>
          </tr>
        </tbody>
      );
    };
    if (data.orderDetailReport) {
      result = (
        <div className="wrapper-report-view">
          <div className="show-detail-report">
            <div className="show-sumary-text">
              <Row>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  Order ID:
                </Col>
                <Col lg={5} xl={5} md={6} sm={12} xs={12}>
                  {data.orderDetailReport.order_code}
                </Col>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  Total Order Price:
                </Col>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  <CurrencyFormat
                    value={data.orderDetailReport.total_pay}
                    suffix=" USD"
                    displayType="text"
                    thousandSeparator={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  Status:
                </Col>
                <Col lg={5} xl={5} md={6} sm={12} xs={12}>
                  {showStatus(data.orderDetailReport.status)}
                </Col>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  Total Discount:
                </Col>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  <CurrencyFormat
                    value={
                      data.orderDetailReport.promotion_value
                        ? data.orderDetailReport.promotion_value
                        : 0
                    }
                    suffix=" USD"
                    displayType="text"
                    thousandSeparator={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  Order created at:
                </Col>
                <Col lg={5} xl={5} md={6} sm={12} xs={12}>
                  {moment(data.orderDetailReport.created_at).format(
                    "DD/MM/YYYY HH:mm"
                  )}
                </Col>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  Total Commission:
                </Col>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  <CurrencyFormat
                    value={
                      data.orderDetailReport.total_commission
                        ? data.orderDetailReport.total_commission
                        : 0
                    }
                    suffix=" USD"
                    displayType="text"
                    thousandSeparator={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  Promotion code:
                </Col>
                <Col lg={5} xl={5} md={6} sm={12} xs={12}>
                  {data.orderDetailReport.promotion_code
                    ? data.orderDetailReport.promotion_code
                    : ""}
                </Col>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  Gross Profit:
                </Col>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  <CurrencyFormat
                    value={
                      data.orderDetailReport.gross_profit
                        ? data.orderDetailReport.gross_profit
                        : 0
                    }
                    suffix=" USD"
                    displayType="text"
                    thousandSeparator={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} xl={4} md={6} sm={12} xs={12}>
                  Customer:
                </Col>
                <Col lg={5} xl={5} md={6} sm={12} xs={12}>
                  {`${data.orderDetailReport.customer.full_name} - ${
                    data.orderDetailReport.customer.email
                  }`}
                </Col>
              </Row>
            </div>
            <div className="table-detail-package table-detail-payment">
              <span className="box-mess">
                Packages
                <Icon type="caret-down" />
              </span>
              <Table
                className="table-package"
                style={{ width: "60%" }}
                components={{ body: { wrapper: footerSumTablePackage } }}
                columns={columnsPackage}
                dataSource={this.getDataForTablePackage(data)}
              />
            </div>
            {data.orderDetailReport.receipts ? (
              <div className="table-detail-payment">
                <span className="box-mess">
                  Payment History
                  <Icon type="caret-down" />
                </span>
                <Table
                  className="table-package"
                  components={{ body: { wrapper: footerSumTablePayment } }}
                  columns={columnsPayment}
                  dataSource={this.getDataForTablePayment(data)}
                />
              </div>
            ) : null}
          </div>
        </div>
      );
    }
    return result;
  };
  render() {
    const { reportData } = this.props;
    return (
      <Modal
        visible={this.props.generalData.showModalPackage}
        title="DETAIL"
        width={"80%"}
        onCancel={this.handleCancelModal}
        footer={[
          <Button key="back" onClick={this.handleCancelModal}>
            <IntlMessage id="modal.Close" />
          </Button>
        ]}
      >
        {this.showViewDetail(reportData)}
      </Modal>
    );
  }
}
