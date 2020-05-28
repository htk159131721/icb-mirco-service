import React, { Component } from "react";
import { Table } from "antd";
import Widget from "components/Widget/index";
import IntlMessage from "util/IntlMessages";
import { Link } from "react-router-dom";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import pathRoute from "constants/pathRoute";

export default class Order extends Component {
  /**
   * @function onGetDataForTable
   * @summary customize data for table list order
   */
  onGetDataForTable = data => {
    let result = [];
    const listOrder = data.dashboard ? data.dashboard.orders : [];
    if (listOrder.length > 0) {
      listOrder.map((order, index) => {
        result.push({
          key: index,
          order
        });
      });
    }
    return result;
  };
  /**
   * @function showStatus
   * @summary show status
   */
  showStatus = status => {
    let result = "";
    switch (status) {
      case 1:
        result = "COMPLETED";
        break;
      case 2:
        result = "NEW";
        break;
      case 0:
        result = "PENDING PAYMENT";
        break;
      default:
        result = "COMPLETE";
        break;
    }
    return result;
  };
  render() {
    const { dashboardData } = this.props;
    const columns = [
      {
        title: "Order ID",
        dataIndex: "order.order_code",
        render: (text, record) => {
          return (
            <div className="gx-flex-row gx-align-items-center">
              <p className="gx-mb-0">{record.order.order_code}</p>
            </div>
          );
        }
      },
      {
        title: "Order Value",
        dataIndex: "order.total_pay",
        render: (text, record) => {
          return (
            <div className="gx-flex-row gx-align-items-center">
              {/* <img
                className="gx-rounded-circle gx-size-30 gx-mr-2"
                src={text}
                alt=""
              /> */}
              <p className="gx-mb-0">
                <CurrencyFormat
                  value={record.order.total_pay}
                  suffix=" USD"
                  displayType="text"
                  thousandSeparator={true}
                />
              </p>
            </div>
          );
        }
      },
      {
        title: "Buyer Name",
        dataIndex: "order.customer",
        render: (text, record) => {
          return (
            <div className="gx-flex-row gx-align-items-center">
              {/* <img
                className="gx-rounded-circle gx-size-30 gx-mr-2"
                src={text}
                alt=""
              /> */}
              <p className="gx-mb-0">{record.order.customer.full_name}</p>
            </div>
          );
        }
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (text, record) => {
          return (
            <span className="gx-text-primary gx-pointer">
              {this.showStatus(record.order.status)}
            </span>
          );
        }
      },
      {
        title: "Transaction time",
        dataIndex: "created_at",
        render: (text, record) => {
          return (
            <>
            <span className="gx-text-grey">
              {moment(record.order.created_at).add(7, 'hours').format("DD-MM-YYYY HH:mm")}
            </span>
            </>
          );
        }
      }
    ];
    return (
      <Widget
        title={
          <h2 className="h4 gx-text-capitalize gx-mb-0">
            <IntlMessage id="home.OrderStatus" />
          </h2>
        }
        extra={
          <Link to={pathRoute.ORDER}>
            <p className="gx-text-primary gx-mb-0 gx-pointer gx-d-none gx-d-sm-block">
              <i className="icon icon-add-circle gx-fs-lg gx-d-inline-flex gx-vertical-align-middle" />
              View all
            </p>
          </Link>
        }
      >
        <div className="gx-table-responsive">
          <Table
            className="gx-table-no-bordered"
            columns={columns}
            dataSource={this.onGetDataForTable(dashboardData)}
            pagination={false}
            size="small"
          />
        </div>
        <Link to={pathRoute.ORDER}>
          <p className="gx-text-primary gx-mb-0 gx-pointer gx-d-block gx-d-sm-none gx-mb-0 gx-mt-3">
            <i className="icon icon-add-circle gx-fs-lg gx-d-inline-flex gx-vertical-align-middle" />
            View all
          </p>
        </Link>
      </Widget>
    );
  }
}
