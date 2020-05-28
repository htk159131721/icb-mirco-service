import React, { PureComponent } from "react";
import { Table, Input, Button, Icon, Switch } from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";
import SweetAlert from "react-bootstrap-sweetalert";

import IntlMessages from "util/IntlMessages";
import { Permission } from "util/Permission";

export default class ListCustomer extends PureComponent {
  state = {
    searchText: "",
    warning: false,
    idDel: 0
  };
  /*********************************************** LifeCicle ********************************************/
  componentDidMount() {
    this.props.onGetListCustomer();
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
          placeholder={`Search ${dataIndex}`}
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
  showAlert = record => {
    this.setState({ warning: true, idDel: record.id });
  };

  onCancelDelete = () => this.setState({ warning: false });

  onDelete = () => {
    this.setState({ warning: false });
    this.props.onDeleteCustomer(this.state.idDel);
  };

  /**
   * @function getUserNameSponsor
   * @summary get username's sponsorkey
   */
  getUserNameSponsor = sponsorID => {
    let userName = "Root";
    const { customerData } = this.props;
    const sponsor = customerData.customers.filter(cus => cus.id === sponsorID);
    if (sponsor.length > 0) userName = sponsor[0].username;
    return userName;
  };
  /********************************************** Modal ***********************************************/
  showEdit = (e, record, type) => {
    e.preventDefault();
    this.props.onShowModalEdit(record, type);
  };
  /********************************************** Table ***********************************************/
  getDataForTable = data => {
    let result = [];
    if (data.customers) {
      data.customers.map((customer, index) => {
        result.push({
          key: index + 1,
          index,
          id: customer.id,
          userName: customer.username,
          firstName: customer.first_name,
          lastName: customer.last_name,
          email: customer.email,
          gender: customer.gender,
          phone: customer.phone_number,
          sponsorKey: customer.sponsorKey,
          sponsorId: customer.sponsor_id,
          sponsorName: this.getUserNameSponsor(customer.sponsor_id),
          status: customer.is_active,
          passport: customer.passport,
          levelInfoCommissions: customer.levelInfoCommissions,
          address: customer.address,
          province: customer.province,
          level_commissions: customer.level_commissions,
          level_name_commissions: customer.level_name_commissions,
          country: customer.country,
          avatar: customer.image
            ? process.env.REACT_APP_URL + customer.image
            : require("assets/images/notFound.png"),
          created_at: moment(customer.created_at).format("DD-MM-YYYY")
        });
      });
    }
    return result;
  };

  /**
   * @function updateStatus
   * @summary update status customer account
   */
  updateStatus = (checked, id) => {
    const data = {
      id: id,
      is_active: checked ? 1 : 0
    };
    this.props.onUpdateStatus(data)
  };
  render() {
    const { usersData, customerData } = this.props,
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
        title: "Status",
        dataIndex: "status",
        key: "status",
        ...this.getColumnSearchProps("status"),
        render: (txt, record) => {
          return (
            <div>
              {parseInt(record.status) === 0 ? (
                <Switch
                  checkedChildren={<Icon type="check" />}
                  unCheckedChildren={<Icon type="close" />}
                  onChange={checked => this.updateStatus(checked, record.id)}
                />
              ) : (
                <Switch
                  checkedChildren={<Icon type="check" />}
                  unCheckedChildren={<Icon type="close" />}
                  defaultChecked
                  onChange={checked => this.updateStatus(checked, record.id)}
                />
              )}
            </div>
          );
        }
      },
      {
        title: "User name",
        dataIndex: "userName",
        key: "userName",
        defaultSortOrder: "ascend",
        align: "center",
        ...this.getColumnSearchProps("userName"),
        render: (text, record) => {
          return (
            <div>
              <p>{record.userName}</p>
              {!!record.levelInfoCommissions ? (
                <Button
                  style={{
                    background: record.levelInfoCommissions.color,
                    color: "#fff",
                    borderColor: record.levelInfoCommissions.color
                  }}
                >
                  {`${record.levelInfoCommissions.title} - Level: ${record.levelInfoCommissions.level}`}
                </Button>
              ) : (
                <Button
                  style={{
                    background: "#fff",
                    color: "#038fde",
                    borderColor: "#038fde"
                  }}
                >
                  ROOT
                </Button>
              )}
            </div>
          );
        }
      },
      {
        title: "Sponsor",
        dataIndex: "sponsorName",
        key: "sponsorName",
        ...this.getColumnSearchProps("sponsorName")
      },
      {
        title: "Full name",
        dataIndex: "firstName",
        key: "firstName",
        render: (text, record) => {
          return <span>{`${record.firstName} ${record.lastName}`}</span>;
        }
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email")
      },
      {
        title: "Phone number",
        dataIndex: "phone",
        key: "phone",
        ...this.getColumnSearchProps("phone")
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        ...this.getColumnSearchProps("country")
      },
      {
        title: "Created at",
        dataIndex: "created_at",
        key: "created_at",
        ...this.getColumnSearchProps("created_at"),
        defaultSortOrder: "ascend",
        sorter: (a, b) => moment(a.created_at) - moment(b.created_at)
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
              {Permission("customerUpdate", authUser.permissions) ? (
                <a
                  href="javascript:;"
                  onClick={e => this.showEdit(e, record, "update")}
                >
                  <i className="icon icon-edit" />
                </a>
              ) : null}
              {/* {Permission("customerDelete", authUser.permissions) ? (
                <a href="javascript:;" onClick={() => this.showAlert(record)}>
                  <i className="icon icon-trash" />
                </a>
              ) : null} */}
              <a
                href="javascript:;"
                onClick={e => this.showEdit(e, record, "view")}
              >
                <i className="icon icon-eye" />
              </a>
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
          dataSource={this.getDataForTable(customerData)}
          scroll={{ x: 1200 }}
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
