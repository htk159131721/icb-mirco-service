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
      if (data.systems.site) {
        const site = data.systems.site;
        result.push({
          key: "1",
          id: "1",
          index: "1",
          name: site.name,
          description: site.description,
          keywords: site.keywords,
          summary: site.summary,
          sponsor_id: site.sponsor_id
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
        title: "Keyword",
        dataIndex: "keywords",
        key: "keywords"
      },
      {
        title: "Summary",
        dataIndex: "summary",
        key: "summary"
      }, 
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },
      // {
      //   title: "Logo",
      //   dataIndex: "logo",
      //   key: "logo",
      //   render: (text, record) => {
      //     return (
      //       <img
      //         className="img-fluid"
      //         width="100px"
      //         height="auto"
      //         src={record.logo}
      //       />
      //     );
      //   }
      // },
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
              {/* <a href="javascript:;" onClick={() => this.showAlert(record)}>
                <i className="icon icon-trash" />
              </a> */}
            </div>
          );
        }
      }
    ];
    return (
      <>
        <Table
          className="st-th-center"
          columns={columns}
          dataSource={this.getDataForTable(dataSystems)}
        />
      </>
    );
  }
}
