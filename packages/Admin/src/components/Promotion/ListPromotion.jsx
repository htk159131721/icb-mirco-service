import React, { Component } from "react";
import { Table, Button, Pagination } from "antd";
import CurrencyFormat from "react-currency-format";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
import IntlMessages from "util/IntlMessages";
import { Permission } from "util/Permission";

export default class ListPackage extends Component {
  state = {
    warning: false,
    idDel: 0
  };
  componentDidMount() {
    const { dataPromotions } = this.props;
    if (dataPromotions.promotions.length <= 0) this.props.onGetListPromotion();
  }
  /**************************************************************************/
  showAlert = record => {
    this.setState({ warning: true, idDel: record.obj.id });
  };
  onCancelDelete = () => this.setState({ warning: false });
  onDelete = () => {
    this.setState({ warning: false });
    this.props.onDeletePromotion(this.state.idDel);
  };
  /********************************************** Modal ***********************************************/
  showModal = (e, record) => {
    e.preventDefault();
    this.props.onShowModalForEdit(record);
  };
  /************************ Table *************************** */
  getDataForTable = data => {
    let result = [];
    if (data.promotions) {
      data.promotions.map((obj, index) => {
        result.push({
          key: index + 1,
          obj
        });
      });
    }
    return result;
  };

  render() {
    const { dataPromotions, usersData } = this.props,
      {authUser} = usersData;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key",
        width: "5%",
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.key - b.key,
      },
      {
        title: "Title",
        dataIndex: "obj.title",
        align: "center",
        key: "obj.title"
      },
      {
        title: "CODE",
        dataIndex: "obj.code",
        align: "center",
        key: "obj.code"
      },
      {
        title: "Value",
        align: "center",
        dataIndex: "obj.value",
        key: "obj.value",
        render: (text, record) => {
          return (
            <>
              <CurrencyFormat
                suffix= {record.obj.type_value === "price" ? " USD" : "%"}
                value={record.obj.value ? record.obj.value : 0}
                displayType={"text"}
                thousandSeparator={true}
              />
            </>
          );
        }
      },
      {
        title: "Range Promotion",
        dataIndex: "obj.start_date",
        align: "center",
        key: "start_date",
        render: (text, record) => {
          return (
            <>
              <p>From: {moment(record.obj.start_date).format("DD-MM-YYYY HH:mm")}</p>
              <p>To: {moment(record.obj.end_date).format("DD-MM-YYYY HH:mm")}</p>
            </>
          )
        }
      },
      {
        title: "Status",
        dataIndex: "obj.status",
        align: "center",
        key: "status",
        render: (text, record) => {
          return (
            <>
              {
                moment(new Date()).diff(moment(record.obj.end_date), "days") > 0
                ? <Button className="gx-btn-orange">Expried</Button>
                : <Button type="primary">Useable</Button> 
              }
            </>
          )
        }
      },
      {
        title: "Action",
        dataIndex: "index",
        key: "action",
        width: "3%",
        fixed: "right",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              {Permission("salePackageUpdate", authUser.permissions) ? (
                <a href="javascript:;" onClick={e => this.showModal(e, record)}>
                  <i className="icon icon-edit" title = "Update" />
                </a>
              ) : null}
              {Permission("salePackageDelete", authUser.permissions) ? (
                <a href="javascript:;" onClick={() => this.showAlert(record)}>
                  <i className="icon icon-trash" title="Delete" />
                </a>
              ) : null}
            </div>
          );
        }
      }
    ];
    return (
      <>
        <Table
          className="st-th-center st-background-header"
          loading={this.props.generalData.loaderTable}
          pagination={{ pageSize: this.props.generalData.pageSize }}
          columns={columns}
          dataSource={this.getDataForTable(dataPromotions)}
        />
        <SweetAlert
          show={this.state.warning}
          warning
          showCancel
          confirmBtnText={<IntlMessages id="sweetAlerts.yesDeleteIt" />}
          cancelBtnText={<IntlMessages id="modalPackage.Cancel" />}
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default"
          title={<IntlMessages id="sweetAlerts.areYouSure" />}
          onConfirm={this.onDelete}
          onCancel={this.onCancelDelete}
        />
      </>
    );
  }
}
