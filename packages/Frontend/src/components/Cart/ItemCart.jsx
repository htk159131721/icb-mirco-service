import React, { Component } from "react";
import { Table } from "antd";
import CurrenyFormat from "react-currency-format";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";

export default class ItemCart extends Component {
  state = {
    warning: false,
    idDel: 0
  };
  onShowConfirmDel = id => {
    this.setState({
      warning: true,
      idDel: id
    });
  };
  onCancelDel = () => this.setState({ warning: false });
  onDelete = () => {
    this.setState({ warning: false });
    this.props.onDeleteCart(this.state.idDel)
  };
  /**
   * @function getDataForTable
   * @summary get data for tablt
   */
  getDataForTable = data => {
    let result = [];
    if (data.carts) {
      data.carts.map((cart, index) => {
        result.push({
          key: index + 1,
          cart
        });
      });
    }
    return result;
  };
  /**
   * @function onShowEditInfo
   * @summary show info customer for edit
   */
  onShowEditInfo = data => this.props.onShowModalForEdit(data)
  
  render() {
    const { cartData } = this.props;
    const columns = [
      {
        title: "",
        dataIndex: "key",
        key: "key",
        render: (text, record) => {
          return (
            <>
              <a
                href="javascript:;"
                onClick={() => this.onShowConfirmDel(record.cart.id)}
                className="gx-rounded-circle gx-del-cart"
              >
                X
              </a>
              <a
                href="javascript:;"
                onClick={() => this.onShowEditInfo(record.cart)}
                className="gx-rounded-circle gx-del-cart"
              >
                <i className="icon icon-auth-screen" />
              </a>
            </>
          );
        }
      },
      {
        title: "PRODUCT",
        dataIndex: "cart.name",
        key: "cart.name"
      },
      {
        title: "PRICE",
        dataIndex: "cart.price",
        key: "cart.price",
        render: (text, record) => {
          return (
            <CurrenyFormat
              value={record.cart.price}
              suffix=" USD"
              displayType={"text"}
              thousandSeparator={true}
            />
          );
        }
      },
      {
        title: "QUANTITY",
        dataIndex: "cart.quantity",
        key: "cart.quantity"
      },
      {
        title: "TOTAL",
        dataIndex: "total",
        key: "total",
        render: (text, record) => {
          return (
            <CurrenyFormat
              value={
                parseInt(record.cart.price) * parseInt(record.cart.quantity)
              }
              suffix=" USD"
              displayType={"text"}
              thousandSeparator={true}
            />
          );
        }
      }
    ];
    return (
      <div className="tb-item-cart">
        <Table
          dataSource={this.getDataForTable(cartData)}
          columns={columns}
          scroll={{ x: 300 }}
        />
        <SweetAlert
          show={this.state.warning}
          warning
          showCancel
          confirmBtnText={<IntlMessages id="sweetAlerts.continue" />}
          cancelBtnText={<IntlMessages id="sweetAlerts.Cancel" />}
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default"
          title={<IntlMessages id="sweetAlerts.areYouSure" />}
          onConfirm={this.onDelete}
          onCancel={this.onCancelDel}
        />
      </div>
    );
  }
}
