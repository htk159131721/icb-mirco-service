import React, { Component } from "react";
import { Table, Input, Button, Icon } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import CurrencyFormat from "react-currency-format";
import Highlighter from "react-highlight-words";
import IntlMessages from "util/IntlMessages";

export default class ListCommission extends Component {
  state = {
    searchText: "",
    idUpdate: 0,
    warning: false
  };
  componentDidMount() {
    const { commissionData } = this.props;
    if (commissionData.listCommissions.length <= 0)
      this.props.onGetListCommission();
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={e =>
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
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  /**************************************************************************/
  showConfirmApprove = id => {
    this.setState({ warning: true, idUpdate: id });
  };
  onCancelUpdate = () => this.setState({ warning: false });
  onUpdateCommission = () => {
    this.setState({ warning: false });
    this.props.onUpdateCommission({id: this.state.idUpdate, status: 1});
  };
  /************************ Table *************************** */
  getDataForTable = data => {
    let result = [];
    if (data.listCommissions) {
      data.listCommissions.map((obj, index) => {
        result.push({
          key: index + 1,
          order_id: obj.order_id,
          obj
        });
      });
    }
    return result;
  };

  render() {
    const { commissionData } = this.props;
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
        title: "Order ID",
        dataIndex: "order_id",
        align: "center",
        key: "order_id",
        ...this.getColumnSearchProps("order_id")
      },
      {
        title: "From Customer",
        dataIndex: "obj.from_customer_id",
        align: "center",
        key: "obj.from_customer_id",
        render: (text, record) => {
          return (
            <div>
              <p>
                <IntlMessages id="table.Fullname" />:{" "}
                {`${record.obj.from_first_name} ${record.obj.from_last_name}`}
              </p>
              <p>Email: {record.obj.from_email}</p>
              <p>
                <IntlMessages id="table.Level" />:{" "}
                {record.obj.from_level_commissions}
              </p>
            </div>
          );
        }
      },
      {
        title: "To Customer",
        dataIndex: "obj.to_customer_id",
        align: "center",
        key: "obj.to_customer_id",
        render: (text, record) => {
          return (
            <div>
              <p>
                <IntlMessages id="table.Fullname" />:{" "}
                {`${record.obj.to_first_name} ${record.obj.to_last_name}`}
              </p>
              <p>Email: {record.obj.to_email}</p>
              <p>
                <IntlMessages id="table.Level" />:{" "}
                {record.obj.to_level_commissions}
              </p>
            </div>
          );
        }
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
                suffix={" USD"}
                value={record.obj.value ? record.obj.value : 0}
                displayType={"text"}
                thousandSeparator={true}
              />
            </>
          );
        }
      },
      {
        title: "Status",
        dataIndex: "obj.status",
        align: "center",
        key: "obj.status",
        render: (text, record) => {
          return (
            <div>
              {parseInt(record.obj.status) === 0 ? (
                <>
                <Button
                  type="danger"
                  onClick={() => this.showConfirmApprove(record.obj.id)}
                >
                  <IntlMessages id="app.Approve" />{" "}
                </Button> <br/>
                <small> <a href="javascript:;">Click button to approve</a></small> 
                </>
              ) : (
                <Button type="primary">
                  <IntlMessages id="app.Success" />
                </Button>
              )}
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
          dataSource={this.getDataForTable(commissionData)}
        />
        <SweetAlert
          show={this.state.warning}
          warning
          showCancel
          confirmBtnText={<IntlMessages id="sweetAlerts.Approve" />}
          cancelBtnText={<IntlMessages id="modalPackage.Cancel" />}
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default"
          title={<IntlMessages id="sweetAlerts.ConfirmCommission" />}
          onConfirm={this.onUpdateCommission}
          onCancel={this.onCancelUpdate}
        />
      </>
    );
  }
}
