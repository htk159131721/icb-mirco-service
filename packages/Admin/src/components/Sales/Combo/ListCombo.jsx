import React, { Component } from "react";
import { Table, message } from "antd";
import CurrencyFormat from "react-currency-format";
import SweetAlert from "react-bootstrap-sweetalert";
import {Link} from "react-router-dom"
import { DndProvider, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import path from "constants/pathRoute"
import IntlMessages from "util/IntlMessages";
import { Permission } from "util/Permission";

let dragingIndex = -1;
class BodyRow extends Component {
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

export default class ListCombo extends Component {
  state = {
    searchText: "",
    warning: false,
    idDel: 0
  };
  componentDidMount() {
    const { comboData, packageData } = this.props;
    if (comboData.listCombo.length <= 0) this.props.getListCombo();
    if (packageData.packages.length <= 0) this.props.getListPackage();
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
    const { comboData } = this.props;
    const dataCurrent = comboData.listCombo.filter(
      (cb, index) => index === dragIndex
    );
    const dataTarget = comboData.listCombo.filter(
      (cb, index) => index === hoverIndex
    );
    if(dataCurrent.length > 0 && dataTarget.length > 0){
      const data = {
        type: "combo",
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
    this.setState({ warning: true, idDel: record.obj.id });
  };
  onCancelDelete = () => this.setState({ warning: false });
  onDelete = () => {
    this.setState({ warning: false });
    this.props.onDeleteCombo(this.state.idDel);
  };
  /********************************************** Modal ***********************************************/
  showModal = (e, record) => {
    e.preventDefault();
    this.props.onShowModalForEdit(record); 
  };
  /************************ Table *************************** */
  getDataForTable = data => {
    let result = [];
    if (data.listCombo) {
      data.listCombo.map((obj, index) => {
        result.push({
          key: index + 1,
          obj
        });
      });
    }
    return result;
  };
  getNamePackageFromId = (dataPackage, arrayPackageID) => {
    let result = [];
    if(arrayPackageID){
      const arrayNew = dataPackage.packages.filter(x => JSON.parse(arrayPackageID).includes(x.id));
      if(arrayNew.length > 0){
        arrayNew.map(obj => result.push(`<p>${obj.title}</p>`))
      }
    }
    return result.join('')
  };
  render() {
    const { comboData, usersData, packageData } = this.props,
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
        title: "Name",
        align: "center",
        dataIndex: "obj.combo_name",
        key: "obj.combo_name"
      },
      {
        title: "List Product",
        align: "center",
        dataIndex: "obj.product_of_combo",
        key: "obj.product_of_combo",
        render: (text, record) => {
          return (
            <div dangerouslySetInnerHTML={{__html: this.getNamePackageFromId(packageData, record.obj.product_of_combo)}}></div>
          );
        }
      },
      {
        title: "Price",
        dataIndex: "obj.price",
        align: "center",
        key: "obj.price",
        render: (text, record) => {
          return (
            <CurrencyFormat
              suffix=" USD"
              value={record.obj.price}
              displayType={"text"}
              thousandSeparator={true}
            />
          );
        }
      },
      {
        title: "Discount (%)",
        align: "center",
        dataIndex: "obj.discounts",
        key: "obj.discounts",
        render: (text, record) => {
          return <span>{record.obj.discounts}</span>;
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
              {Permission("comboUpdate", authUser.permissions) ? (
                <a href="javascript:;" onClick={e => this.showModal(e, record)}>
                  <i className="icon icon-edit" title="Update" />
                </a>
              ) : null}
              {Permission("comboDelete", authUser.permissions) ? (
                <a href="javascript:;" onClick={() => this.showAlert(record)}>
                  <i className="icon icon-trash" title="Delete" />
                </a>
              ) : null}
              {Permission("comboCreate", authUser.permissions) ? (
                <Link to = {`${path.COMMISSION_COMBO}?id=${record.obj.id}`}>
                  <i className="icon icon-components" title="Setting Commission" />
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
            dataSource={this.getDataForTable(comboData)}
            components={this.components}
            loading={this.props.generalData.loaderTable}
            pagination={{ pageSize: this.props.generalData.pageSize }}
            onRow={(record, index) => ({
              index,
              moveRow: this.moveRow
            })}
          />
        </DndProvider>
        {/* <Table
          className="st-th-center st-background-header"
          loading={this.props.generalData.loaderTable}
          pagination={{ pageSize: this.props.generalData.pageSize }}
          columns={columns}
          dataSource={this.getDataForTable(comboData)}
        /> */}
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
