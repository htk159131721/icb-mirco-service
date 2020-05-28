import React, { Component } from "react";
import { Table, Input, Button, Icon, Popconfirm, Modal } from "antd";
import Highlighter from "react-highlight-words";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";

export default class ListSite extends Component {
  state = {
    searchText: "",
    warning: false,
    idDel: 0
  };

  /********************************************** Modal ***********************************************/
  showEdit = (e, record) => {
    e.preventDefault();
    this.props.onShowDataForEdit(record);
  };
  /********************************************** Table ***********************************************/
  getDataForTable = data => {
    let result = [];
      if (data.systems.payment) {
        const payment = data.systems.payment;
        result.push({
          key: "1",
          id: "1",
          index: "1",
          name: payment.payment_name,
          email: payment.payment_email,
          wallet_address: payment.payment_wallet_address
        });
    }
    return result;
  };
  render() {
    const { dataSystems } = this.props;
    const columns = [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        width: "5%"
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Wallet Address",
        dataIndex: "wallet_address",
        key: "wallet_address"
      }, 
      {
        title: "Action",
        dataIndex: "index",
        key: "action",
        width: "3%",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              <a href="javascript:;" onClick={e => this.showEdit(e, record)}>
                <i className="icon icon-edit" />
              </a>
            </div>
          );
        }
      }
    ];
    return (
      <>
        <Table
          className="st-th-center tb-payment"
          columns={columns}
          dataSource={this.getDataForTable(dataSystems)}
        />
      </>
    );
  }
}
