import React, { Component } from "react";
import { Table } from "antd";
import Widget from "components/Widget/index";
import IntlMessage from "util/IntlMessages"


const data = [
  {
    key: "1",
    name: "Jeniffer L.",
    transfer: "2 hrs. ago",
    image: "https://via.placeholder.com/150x150",
    status: "Pay"
  },
  {
    key: "2",
    name: "Jim Green",
    transfer: "17 days ago",
    image: "https://via.placeholder.com/150x150",
    status: "Pay"
  },
  {
    key: "3",
    name: "Joe Black",
    transfer: "1 month ago",
    image: "https://via.placeholder.com/150x150",
    status: "Pay"
  },
  {
    key: "4",
    name: "Mila Alba",
    transfer: "1 month ago",
    image: "https://via.placeholder.com/150x150",
    status: "Pay"
  }
];
export default class Referal extends Component {
    
  render() {
    const columns = [
        {
          title: "Account Holder Name",
          dataIndex: "image",
          render: (text, record) => {
            return (
              <div className="gx-flex-row gx-align-items-center">
                <img
                  className="gx-rounded-circle gx-size-30 gx-mr-2"
                  src={text}
                  alt=""
                />
                <p className="gx-mb-0">{record.name}</p>
              </div>
            );
          }
        },
        {
          title: "Last Transfer",
          dataIndex: "transfer",
          render: (text, record) => {
            return <span className="gx-text-grey">{record.transfer}</span>;
          }
        },
        {
          title: "Action",
          dataIndex: "status",
          render: text => {
            return (
              <span className="gx-text-primary gx-pointer">
                <i className="icon icon-forward gx-fs-sm gx-mr-2" />
                {text}
              </span>
            );
          }
        }
      ];
    return (
      <Widget
        title={<h2 className="h4 gx-text-capitalize gx-mb-0"><IntlMessage id = "home.NewReferal" /></h2>}
        
      >
        <div className="gx-table-responsive">
          <Table
            className="gx-table-no-bordered"
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
          />
        </div>
      </Widget>
    );
  }
}
