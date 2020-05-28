import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";
import SweetAlert from "react-bootstrap-sweetalert";
import CurrencyFormat from "react-currency-format";
import { Permission } from "util/Permission";
import IntlMessages from "util/IntlMessages";

export default class ListCurrency extends Component {
  state = {
    searchText: "",
    warning: false,
    idDel: 0,
  };
  componentDidMount() {
    const { currencyData } = this.props;
    if (currencyData.listCurrencies.length <= 0) this.props.onGetListCurrency();
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search `}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  /**************************************************************************/
  showAlert = (record) => {
    this.setState({ warning: true, idDel: record.currency.id });
  };
  onCancelDelete = () => this.setState({ warning: false });
  onDelete = () => {
    this.setState({ warning: false });
    this.props.onDeleteCurrency(this.state.idDel);
  };
  /********************************************** Modal ***********************************************/
  showEdit = (e, record) => {
    e.preventDefault();
    this.props.onShowModalEdit(record);
  };
  /********************************************** Table ***********************************************/
  getDataForTable = (data) => {
    let result = [];
    if (data.listCurrencies.length > 0) {
      data.listCurrencies.map((currency, index) => {
        result.push({
          key: index + 1,
          currency,
        });
      });
    }
    return result;
  };
  render() {
    const { usersData, currencyData } = this.props,
      { authUser } = usersData;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key",
        width: "5%",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.key - b.key,
      },
      {
        title: "From Currency",
        align: "center",
        dataIndex: "currency.tracsaction_code",
        key: "currency.tracsaction_code",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={
                record.currency.from_currency_value
                  ? record.currency.from_currency_value
                  : "NULL"
              }
              displayType="text"
              thousandSeparator={true}
              suffix={` ${record.currency.from_currency}`}
            />
          );
        },
      },
      {
        title: "To Currency",
        align: "center",
        dataIndex: "currency.payment_method",
        key: "currency.payment_method",
        render: (text, record) => {
          return (
            <CurrencyFormat
              value={
                record.currency.to_currency_value
                  ? record.currency.to_currency_value
                  : "NULL"
              }
              displayType="text"
              thousandSeparator={true}
              suffix={` ${record.currency.to_currency}`}
            />
          );
        },
      },
      {
        title: "Created at",
        dataIndex: "currency.created_at",
        align: "center",
        key: "currency.created_at",
        render: (text, record) => {
          return (
            <span>
              {moment(record.currency.created_at).format("DD-MM-YYYY")}
            </span>
          );
        },
      },
      // {
      //   title: "Action",
      //   dataIndex: "index",
      //   key: "action",
      //   width: "3%",
      //   render: (text, record) => {
      //     return (
      //       <div className="st-acion-tb">
      //         {Permission("exchangeRateUpdate", authUser.permissions) ? (
      //           <a href="javascript:;" onClick={e => this.showEdit(e, record)}>
      //             <i className="icon icon-edit" />
      //           </a>
      //         ) : null}
      //         {Permission("exchangeRateDelete", authUser.permissions) ? (
      //           <a href="javascript:;" onClick={() => this.showAlert(record)}>
      //             <i className="icon icon-trash" />
      //           </a>
      //         ) : null}
      //       </div>
      //     );
      //   }
      // }
    ];
    return (
      <>
        <Table
          className="st-th-center st-background-header"
          loading={this.props.generalData.loaderTable}
          pagination={{ pageSize: this.props.generalData.pageSize }}
          columns={columns}
          dataSource={this.getDataForTable(currencyData)}
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
