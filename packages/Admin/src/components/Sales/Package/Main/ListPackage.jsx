import React, { Component } from "react";
import { Table, message } from "antd";
import CurrencyFormat from "react-currency-format";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";
import { DndProvider, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import IntlMessages from "util/IntlMessages";
import { Permission } from "util/Permission";
import path from "constants/pathRoute";

let dragingIndex = -1;
class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: "move" };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += " drop-over-downward";
      }
      if (restProps.index < dragingIndex) {
        className += " drop-over-upward";
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr {...restProps} className={className} style={style} />
      )
    );
  }
}

export default class ListPackage extends Component {
  state = {
    warning: false,
    idDel: 0
  };
  componentDidMount() {
    const { dataCatePackage, dataPackages } = this.props;
    if (dataCatePackage.catePackages.length <= 0)
      this.props.onGetListCatePackage();
    if (dataPackages.packages.length <= 0) this.props.getListPackage();
  }
  rowSource = {
    beginDrag(props) {
      dragingIndex = props.index;
      return {
        index: props.index
      };
    }
  };

  rowTarget = {
    drop(props, monitor) {
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Time to actually perform the action
      props.moveRow(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  };

  DragableBodyRow = DropTarget("row", this.rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }))(
    DragSource("row", this.rowSource, connect => ({
      connectDragSource: connect.dragSource()
    }))(BodyRow)
  );

  components = {
    body: {
      row: this.DragableBodyRow
    }
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { dataPackages } = this.props;
    const dataCurrent = dataPackages.packages.filter(
      (pck, index) => index === dragIndex
    );
    const dataTarget = dataPackages.packages.filter(
      (pck, index) => index === hoverIndex
    );
    if(dataCurrent.length > 0 && dataTarget.length > 0){
      const data = {
        type: "package",
        idCurrent: dataCurrent[0].id,
        indexCurrent: dataCurrent[0].position,
        idTarget: dataTarget[0].id,
        indexTarget: dataTarget[0].position,
        dragIndex,
        hoverIndex
      };
      this.props.onUpdatePosition(data);
    } else {
      message.error("Error")
    }
  };
  /**************************************************************************/
  showAlert = record => {
    this.setState({ warning: true, idDel: record.id });
  };
  onCancelDelete = () => this.setState({ warning: false });
  onDelete = () => {
    this.setState({ warning: false });
    this.props.onDeletePackage(this.state.idDel);
  };
  /********************************************** Modal ***********************************************/
  showModal = (e, record) => {
    e.preventDefault();
    this.props.onShowModalForEdit(record);
  };
  /************************ Table *************************** */
  getDataForTable = data => {
    let result = [];
    if (data.packages) {
      data.packages.map((obj, index) => {
        result.push({
          key: index + 1,
          index,
          id: obj.id,
          categoryValue: obj.package_category_id,
          categoryName: obj.package_category_id,
          title: obj.title,
          desc: obj.description,
          cate: parseInt(obj.package_category_id),
          code: obj.package_code,
          price: obj.price,
          image: obj.image
            ? process.env.REACT_APP_URL + obj.image
            : require("assets/images/logo.png"),
          content: obj.content,
          status: parseInt(obj.status),
          promotionPrice: obj.price_sale
          // pricePromotionRange: obj.promotion_to
          //   ? [moment(obj.promotion_from), moment(obj.promotion_to)]
          //   : undefined,
          // pricePromotionFrom: obj.promotion_from
          //   ? moment(obj.promotion_from).format("DD/MM/YYYY")
          //   : ""
        });
      });
    }
    return result;
  };
  getCatePackageFromIdCate = (dataCatePackage, idCate) => {
    let result = [];
    if (dataCatePackage.catePackages.length > 0) {
      result = dataCatePackage.catePackages.filter(obj => obj.id === idCate);
    }
    return result.length > 0 ? result[0].title : "NULL";
  };
  render() {
    const { dataPackages, dataCatePackage, usersData } = this.props,
      { authUser } = usersData;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key",
        width: "5%",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.key - b.key
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "Category",
        dataIndex: "cate",
        key: "cate",
        render: (text, record) => {
          return (
            <span>
              {this.getCatePackageFromIdCate(dataCatePackage, record.cate)}
            </span>
          );
        }
      },
      {
        title: "Price",
        dataIndex: "price",
        align: "center",
        key: "price",
        render: (text, record) => {
          return (
            <CurrencyFormat
              suffix=" USD"
              value={record.price}
              displayType={"text"}
              thousandSeparator={true}
            />
          );
        }
      },
      {
        title: "Promotion Price",
        align: "center",
        dataIndex: "promotionPrice",
        key: "promotionPrice",
        render: (text, record) => {
          return (
            <>
              <CurrencyFormat
                suffix=" USD"
                value={record.promotionPrice ? record.promotionPrice : 0}
                displayType={"text"}
                thousandSeparator={true}
              />
            </>
          );
        }
      },
      {
        title: "DISPLAY ON HOMEPAGE",
        dataIndex: "status",
        align: "center",
        key: "status",
        render: (text, record) => {
          const status = record.status === 0 ? "HIDDEN" : "DISPLAY";
          return <span>{status}</span>;
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
                  <i className="icon icon-edit" title="Update" />
                </a>
              ) : null}
              {Permission("salePackageDelete", authUser.permissions) ? (
                <a href="javascript:;" onClick={() => this.showAlert(record)}>
                  <i className="icon icon-trash" title="Delete" />
                </a>
              ) : null}
              {Permission("salePackageCreate", authUser.permissions) ? (
                <Link to={`${path.COMMISSION_PACKAGE}?id=${record.id}`}>
                  <i
                    className="icon icon-components"
                    title="Setting Commission"
                  />
                </Link>
              ) : null}
            </div>
          );
        }
      }
    ];
    return (
      <>
        <DndProvider backend={HTML5Backend}>
          <Table
            className="st-th-center st-background-header"
            columns={columns}
            dataSource={this.getDataForTable(dataPackages)}
            components={this.components}
            loading={this.props.generalData.loaderTable}
            pagination={{ pageSize: this.props.generalData.pageSize }}
            onRow={(record, index) => ({
              index,
              moveRow: this.moveRow
            })}
          />
        </DndProvider>
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
