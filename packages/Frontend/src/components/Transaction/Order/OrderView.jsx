import React, { Component } from "react";
import { Modal, Form, Button, Table, Row, Col } from "antd";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import IntlMessages from "util/IntlMessages";
class OrderView extends Component {
  handleCancel = e => {
    this.props.onShowModalDynamic("modalOrderViewDetail", false);
  };
  showStatus = status => {
    let result = "";
    switch (status) {
      case 1:
        result = <IntlMessages id="modal.status.SUCCESS" />;
        break;
      case 2:
        result = <IntlMessages id="modal.status.PENDING" />;
        break;
      case 0:
        result = <IntlMessages id="modal.status.FAILED" />;
        break;
      default:
        result = <IntlMessages id="modal.status.SUCCESS" />;
        break;
    }
    return result;
  };
  /**
   * @function
   * @summary get data for table
   */
  getDataForTable = data => {
    let result = [];
    if (data.order_details) {
      data.order_details.map((order, index) => {
        result.push({
          key: index + 1,
          index,
          order
        });
      });
    }
    return result;
  };
  /**
   * @function showInfoCus
   * @summary show info customer
   */
  showInfoCus = data => {
    let result = null;
    if (data.order) {
      result = (
        <Row>
          <Col xl={4} lg={4} md={4} sm={4} xs={4}>
            <div className="st-key-field">
              <IntlMessages id="order.NameCustomer" />
            </div>
          </Col>
          <Col xl={9} lg={9} md={9} sm={9} xs={9}>
            <span>{data.order.customer.full_name}</span>
          </Col>
          <Col xl={4} lg={4} md={4} sm={4} xs={4}>
            <div className="st-key-field">
              <IntlMessages id="modalPackage.Form.Email" />:
            </div>
          </Col>
          <Col xl={7} lg={7} md={7} sm={7} xs={7}>
            <span>{data.order.customer.email}</span>
          </Col>
        </Row>
      );
    }
    return result;
  };
  handleCancelViewService = () =>
    this.props.onShowDynamicModal("modalViewService", false);
  render() {
    const { orderData } = this.props;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key"
      },
      {
        title: "Name and Beneficiary Info",
        dataIndex: "order.name",
        align:"center",
        key: "order.name",
        render: (txt, record) => {
          return (
            <div>
              <p style={{fontWeight: 700}}>{txt}</p>
              <p>Beneficiary ID: {record.order.id}</p>
              <p>Name: {`${record.order.last_name} ${record.order.first_name}`}</p>
              <p>Date of birth: {moment(record.order.birthday).format("DD-MM-YYYY")}</p>
              <p>Gender: {record.order.gender}</p>
            </div>
          );
        }
      },
      {
        title: "Type Service",
        dataIndex: "order.type",
        key: "order.type"
      },
      {
        title: "Quantity",
        dataIndex: "order.quantity",
        key: "order.quantity"
      },
      {
        title: "Price",
        dataIndex: "order.price",
        key: "order.price",
        render: (text, record) => {
          return (
            <CurrencyFormat
              suffix=" USD"
              value={record.order.price}
              displayType={"text"}
              thousandSeparator={true}
            />
          );
        }
      },
      {
        title: "Total",
        key: "order.total",
        dataIndex: "order.total",
        render: (text, record) => {
          return (
            <CurrencyFormat
              suffix=" USD"
              value={record.order.total}
              displayType={"text"}
              thousandSeparator={true}
            />
          );
        }
      }
    ];
    const footerSumTable = props => {
      return (
        <tbody {...props}>
          {props.children}
          <tr className="ant-table-row">
            <td colSpan="3">Total Payment:</td>
            <td>
              {this.getDataForTable(orderData.orderDetail).reduce(
                (sum, i) => sum + i.order.quantity,
                0
              )}
            </td>
            <td>-</td>
            <td>
              <CurrencyFormat
                suffix=" USD"
                value={this.getDataForTable(orderData.orderDetail).reduce(
                  (sum, i) => sum + i.order.total,
                  0
                )}
                displayType={"text"}
                thousandSeparator={true}
              />
            </td>
          </tr>
        </tbody>
      );
    };
    return (
      <div>
        <Modal
          title="INFOMATION ORDER"
          className="modal-order-admin modal-add-package"
          visible={this.props.generalData.modalOrderViewDetail}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              <IntlMessages id="modal.Close" />
            </Button>
          ]}
        >
          <div className="wrapper-modal">
            <div className="content-modal-order">
              {this.showInfoCus(orderData.orderDetail)}
              <div
                style={{ marginTop: "2rem", marginBottom: "2rem" }}
                className="tb-content-prod table-package"
              >
                <Table
                  columns={columns}
                  pagination={false}
                  className="st-background-header"
                  components={{ body: { wrapper: footerSumTable } }}
                  dataSource={this.getDataForTable(orderData.orderDetail)}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(OrderView);
