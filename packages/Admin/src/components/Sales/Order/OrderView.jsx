import React, { Component } from "react";
import { Modal, Form, Button, Table, Row, Col } from "antd";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import IntlMessages from "util/IntlMessages";
class OrderView extends Component {
  state = {
    idUpdate: 0,
    idOrder: null,
    created_at: null,
    status: null,
    address: null,
    email: null,
    firstName: null,
    lastName: null,
    country: null,
    province: null,
    phone: null,
    company: null,
    birthday: null,
    gender: null
  };
  componentWillUnmount() {
    this.props.onRef(null);
  }
  componentDidMount() {
    this.props.onRef(this);
  }

  showFormEdit = record => {
    this.props.onGetDetailOrder({ id: record.order.id, view: "VIEW" });
  };

  handleCancel = e => {
    this.props.onShowModal(false);
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
    if (data) {
      data.detailOrders.map((order, index) => {
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
   * @function showViewService
   * @summary show info deficator user of service
   */
  showViewService = (e, record) => {
    e.preventDefault();
    this.setState({
      address: record.order.address,
      birthday: moment(record.order.birthday).format("DD-MM-YYYY"),
      company: record.order.company ? record.order.company : "NULL",
      country: record.order.country,
      email: record.order.email,
      firstName: record.order.first_name,
      lastName: record.order.last_name,
      phone: record.order.phone_number,
      province: record.order.province,
      gender: record.order.gender
    });
    this.props.onShowDynamicModal("modalViewService", true);
  };
  /**
   * @function showHeader
   * @summary show info order
   */
  showHeader = data => {
    let result = null;
    if (data) {
      result = (
        <div className="header-order">
          <div className="st-status">
            <span>#{data.id}</span>
          </div>
          <div className="st-created">
            <small>
              <IntlMessages id="order.CreatedAt" />
              <span>
                {data.created_at
                  ? moment(data.created_at).format("DD/MM/YYYY")
                  : "undefined"}
              </span>
            </small>
          </div>
          <div className="st-status">
            <Button>{this.showStatus(data.status)}</Button>
          </div>
        </div>
      );
    }
    return result;
  };
  /**
   * @function showInfoCus
   * @summary show info customer
   */
  showInfoCus = data => {
    let result = null;
    if (data) {
      result = (
        <Row>
          <Col xl={4} lg={4} md={4} sm={4} xs={4}>
            <div className="st-key-field">
              <IntlMessages id="order.NameCustomer" />
            </div>
          </Col>
          <Col xl={9} lg={9} md={9} sm={9} xs={9}>
            <span>{data.customer.full_name}</span>
          </Col>
          <Col xl={4} lg={4} md={4} sm={4} xs={4}>
            <div className="st-key-field">
              <IntlMessages id="modalPackage.Form.Email" />:
            </div>
          </Col>
          <Col xl={7} lg={7} md={7} sm={7} xs={7}>
            <span>{data.customer.email}</span>
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
        title: "Name",
        dataIndex: "order.name",
        key: "order.name"
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
      },
      {
        title: "Action",
        dataIndex: "index",
        key: "action",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              <a
                href="javascript:;"
                onClick={e => this.showViewService(e, record)}
              >
                <i className="icon icon-auth-screen" />
              </a>
            </div>
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
            <td>-</td>
          </tr>
        </tbody>
      );
    };
    return (
      <div>
        <Modal
          title="Information Order"
          className="modal-order-admin modal-add-package"
          visible={this.props.generalData.showModalPackage}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              <IntlMessages id="modal.Close" />
            </Button>
          ]}
        >
          <div className="wrapper-modal">
            {this.showHeader(orderData.orderDetail)}
            <div className="content-modal-order">
              {this.showInfoCus(orderData.orderDetail)}
              <div
                style={{ marginTop: "2rem", marginBottom: "2rem" }}
                className="tb-content-prod table-package"
              >
                <Table
                  columns={columns}
                  className="st-background-header"
                  components={{ body: { wrapper: footerSumTable } }}
                  dataSource={this.getDataForTable(orderData.orderDetail)}
                />
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          title={<IntlMessages id="app.UserInfo" />}
          visible={this.props.generalData.modalViewService}
          onCancel={this.handleCancelViewService}
          footer={[
            <Button key="back" onClick={this.handleCancelViewService}>
              <IntlMessages id="modal.Close" />
            </Button>
          ]}
        >
          <div className="view-service">
            <Row>
              <Col lg={11} xl={11} md={11} sm={11} xs={11}>
                <IntlMessages id="modalPackage.Form.FirstName" />:{" "}
                <span style={{ fontWeight: "200" }}>
                  {this.state.firstName}
                </span>
              </Col>
              <Col lg={13} xl={13} md={13} sm={13} xs={13}>
                <IntlMessages id="modalPackage.Form.LastName" />:{" "}
                <span style={{ fontWeight: "200" }}>{this.state.lastName}</span>
              </Col>
              <Col lg={11} xl={11} md={11} sm={11} xs={11}>
                <IntlMessages id="modalPackage.Form.Gender" />:{" "}
                <span style={{ fontWeight: "200" }}>{this.state.gender}</span>
              </Col>
              <Col lg={13} xl={13} md={13} sm={13} xs={13}>
                <IntlMessages id="modalPackage.Form.Birthday" />:{" "}
                <span style={{ fontWeight: "200" }}>{this.state.birthday}</span>
              </Col>
              <Col lg={11} xl={11} md={11} sm={11} xs={11}>
                <IntlMessages id="modalPackage.Form.PhoneNumber" />:{" "}
                <span style={{ fontWeight: "200" }}>{this.state.phone}</span>
              </Col>
              <Col lg={13} xl={13} md={13} sm={13} xs={13}>
                <IntlMessages id="modalPackage.Form.Email" />:{" "}
                <span style={{ fontWeight: "200" }}>{this.state.email}</span>
              </Col>
              <Col lg={11} xl={11} md={11} sm={11} xs={11}>
                <IntlMessages id="modalPackage.Form.Country" />:{" "}
                <span style={{ fontWeight: "200" }}>{this.state.country}</span>
              </Col>
              <Col lg={13} xl={13} md={13} sm={13} xs={13}>
                <IntlMessages id="modalPackage.Form.Province" />:{" "}
                <span style={{ fontWeight: "200" }}>{this.state.province}</span>
              </Col>
              <Col lg={11} xl={11} md={11} sm={11} xs={11}>
                <IntlMessages id="modalPackage.Form.Address" />:{" "}
                <span style={{ fontWeight: "200" }}>{this.state.address}</span>
              </Col>
              <Col lg={13} xl={13} md={13} sm={13} xs={13}>
                <IntlMessages id="modalPackage.Form.Company" />:{" "}
                <span style={{ fontWeight: "200" }}>{this.state.company}</span>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(OrderView);
