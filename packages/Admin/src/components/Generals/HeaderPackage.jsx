import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Select, Row, Col, Button, Icon } from "antd";
import { CSVLink } from "react-csv";
import {
  showModalPackage,
  updatePageSize,
  loadingTable
} from "appRedux/actions/GeneralAction";
import { clearListService } from "appRedux/actions/OrderAction";
import pathRoute from "constants/pathRoute";
import IntlMessages from "util/IntlMessages";
import { Permission } from "util/Permission";

const { Option } = Select;

class HeaderPackage extends Component {
  componentWillUnmount() {
    this.props.onUpdatePageSize(10);
  }
  onSearch = val => {
    console.log("search:", val);
  };
  onChange = val => {
    console.log("search:", val);
  };
  clearListService = url => {
    if (url === pathRoute.ORDER) {
      if (sessionStorage.getItem("LIST_SERVICE")) {
        sessionStorage.removeItem("LIST_SERVICE");
      }
      this.props.onClearListService();
    }
  };
  showModal = url => {
    this.props.onShowModal(true);
  };

  /**
   * @function getDataCSV
   * @summary get data for dowload csv
   */
  getDataCSV = url => {
    let data = [],
      headers = [];
    if (url === pathRoute.CUSTOMER) {
      data = this.props.customers;
      headers = [
        { label: "id", key: "id" },
        { label: "last_name", key: "last_name" },
        { label: "first_name", key: "first_name" },
        { label: "full_name", key: "full_name" },
        { label: "phone_number", key: "phone_number" },
        { label: "email", key: "email" },
        { label: "customer_code", key: "customer_code" },
        { label: "username", key: "username" },
        { label: "gender", key: "gender" },
        { label: "tow_factor_auth", key: "tow_factor_auth" },
        { label: "is_tow_factor_auth", key: "is_tow_factor_auth" },
        { label: "sponsorKey", key: "sponsorKey" },
        { label: "sponsor_id", key: "sponsor_id" },
        { label: "type_ref", key: "type_ref" },
        { label: "level_commissions", key: "level_commissions" },
        { label: "alepay_amount", key: "alepay_amount" },
        { label: "eth_amount", key: "eth_amount" },
        { label: "wallet_address", key: "wallet_address" },
        { label: "commissions_earned", key: "commissions_earned" },
        { label: "country", key: "country" },
        { label: "province", key: "province" },
        { label: "address", key: "address" },
        { label: "company", key: "company" },
        { label: "is_active", key: "is_active" },
        { label: "passport", key: "passport" },
        { label: "created_at", key: "created_at" },
        { label: "updated_at", key: "updated_at" }
      ]
    }
    if (url === pathRoute.WITHDRAW_REPORT) {
      data = this.props.withDraws;
      headers = [
        { label: "id", key: "id" },
        { label: "code", key: "code" },
        { label: "customer_id", key: "customer_id" },
        { label: "customer_first_name", key: "customer.first_name" },
        { label: "customer_last_name", key: "customer.last_name" },
        { label: "customer_email", key: "customer.email" },
        { label: "customer_sponsorKey", key: "customer.sponsorKey" },
        { label: "customer_level_commissions", key: "customer.level_commissions" },
        { label: "customer_level_name_commissions", key: "customer.level_name_commissions" },
        { label: "amount", key: "amount" },
        { label: "note", key: "note" },
        { label: "payment_withdraw", key: "payment_withdraw" },
        { label: "created_at", key: "created_at" },
        { label: "updated_at", key: "updated_at" },
        { label: "account_name", key: "account_name" },
        { label: "account_number", key: "account_number" },
        { label: "account_code", key: "account_code" },
        { label: "account_address", key: "account_address" },
        { label: "date_completed", key: "date_completed" },
        { label: "file_transaction", key: "file_transaction" },
        { label: "status", key: "status" }
      ];
    }
    return {data, headers};
  };

  getFileName = url => {
    let fileName = "customer-report.csv";
    if (url === pathRoute.WITHDRAW_REPORT) {
      fileName = "withdraw-report.csv";
    }
    return fileName;
  };

  showHeaderHasCondition = url => {
    /* Condition for packages template */
    let result;
    if (url === pathRoute.CATE_PACKAGE || url === pathRoute.PACKAGE) {
      result = (
        <div className="hd-left">
          <NavLink
            className="btn btn-primary"
            activeClassName="currentLink"
            to={pathRoute.PACKAGE}
          >
            <IntlMessages id="headerPackage.package" />
          </NavLink>
          <NavLink
            className="btn btn-primary"
            activeClassName="currentLink"
            to={pathRoute.CATE_PACKAGE}
          >
            <IntlMessages id="headerPackage.catePackage" />
          </NavLink>
        </div>
      );
    }
    /* Condition for customers template */
    if (url === pathRoute.CUSTOMER || url === pathRoute.WITHDRAW_REPORT) {
      result = (
        <div className="hd-left">
          <Button type="primary" className="st-csv-text-white" icon="download">
            <CSVLink
              data={this.getDataCSV(url).data}
              headers={this.getDataCSV(url).headers}
              filename={this.getFileName(url)}
            >
              Export
            </CSVLink>
          </Button>
        </div>
      );
    }
    return result;
  };
  showAddBTN = (url, authUser) => {
    const html = (
      <Button type="danger" ghost onClick={() => this.showModal()}>
        <Icon type="plus" />
        <IntlMessages id="headerPackage.Add" />
      </Button>
    );
    let result;
    if (url === pathRoute.ORDER) {
      if (Permission("saleOrderCreate", authUser.permissions)) {
        result = (
          <NavLink
            className="btn btn-danger"
            style={{ color: "red", border: "solid 1px red" }}
            to={pathRoute.CREATE_ORDER}
            onClick={() => this.clearListService(url)}
          >
            <Icon type="plus" />
            <IntlMessages id="headerPackage.Add" />
          </NavLink>
        );
      }
    }
    if (url === pathRoute.CREATE_ORDER) {
      if (Permission("saleOrderCreate", authUser.permissions)) {
        result = (
          <NavLink
            className="btn btn-primary"
            // style={{color: "red", border: "solid 1px red"}}
            to={pathRoute.ORDER}
          >
            <Icon type="enter" />
            <IntlMessages id="headerPackage.Back" />
          </NavLink>
        );
      }
    }
    if (url === pathRoute.PACKAGE) {
      if (Permission("salePackageCreate", authUser.permissions)) {
        result = html;
      }
    }
    // not role
    if (url === pathRoute.RECEIPT) {
      if (Permission("salePackageCreate", authUser.permissions)) {
        result = html;
      }
    }
    // not role
    if (url === pathRoute.NEWS) {
      if (Permission("salePackageCreate", authUser.permissions)) {
        result = html;
      }
    }
    if (url === pathRoute.CUSTOMER) {
      if (Permission("customerCreate", authUser.permissions)) {
        result = html;
      }
    }
    if (url === pathRoute.EXCHANGE_CURRENCY) {
      if (Permission("exchangeRateCreate", authUser.permissions)) {
        result = html;
      }
    }
    if (url === pathRoute.USER) {
      if (Permission("userCreate", authUser.permissions)) {
        result = html;
      }
    }
    if (url === pathRoute.ROLE) {
      if (Permission("userRoleCreate", authUser.permissions)) {
        result = html;
      }
    }
    if (url === pathRoute.AGENCY) {
      if (Permission("agencyCreate", authUser.permissions)) {
        result = html;
      }
    }
    if (url === pathRoute.COMBO) {
      if (Permission("comboView", authUser.permissions)) {
        result = html;
      }
    }
    if (url === pathRoute.PROMOTION) {
      if (Permission("promotionCreate", authUser.permissions)) {
        result = html;
      }
    }
    return result;
  };
  onChangePageSize = value => {
    this.props.onLoadingTable(true);
    setTimeout(() => {
      this.props.onUpdatePageSize(value);
    }, 1000);
  };
  render() {
    const { match, usersData } = this.props,
      { authUser } = usersData;
    return (
      <Row className="header-package">
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          {this.showHeaderHasCondition(match.url)}
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="hd-right">
            {match.url === pathRoute.CATE_PACKAGE
              ? ""
              : this.showAddBTN(match.url, authUser)}
            {match.url === pathRoute.CREATE_ORDER ? null : (
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select show"
                optionFilterProp="children"
                onChange={this.onChangePageSize}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                defaultValue={10}
              >
                <Option value={10}>
                  <IntlMessages id="headerPackage.show10" />
                </Option>
                <Option value={50}>
                  <IntlMessages id="headerPackage.show50" />
                </Option>
                <Option value={100}>
                  <IntlMessages id="headerPackage.show100" />
                </Option>
                <Option value={300}>
                  <IntlMessages id="headerPackage.show300" />
                </Option>
                <Option value={500}>
                  <IntlMessages id="headerPackage.show500" />
                </Option>
              </Select>
            )}
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersData: state.auth,
    customers: state.CustomerReducer.customers,
    withDraws: state.ReportReducer.listWithdrawReport
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    onLoadingTable: boolean => dispatch(loadingTable(boolean)),
    onUpdatePageSize: size => dispatch(updatePageSize(size)),
    //order
    onClearListService: () => dispatch(clearListService())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderPackage);
