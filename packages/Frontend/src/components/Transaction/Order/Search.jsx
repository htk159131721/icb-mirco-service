import React, { Component } from "react";
import { DatePicker, Select, Button } from "antd";
import moment from "moment";

import * as PackageAction from "appRedux/actions/ShopAction";
import * as OrderAction from "appRedux/actions/OrderAction";
const { RangePicker } = DatePicker;

class Search extends Component {
  state = {
    fromDate: "",
    toDate: "",
    status: "",
    orderID: ""
  };
  componentDidMount () {
    this.props.onGetListOrderToSearch()
  }
  onChangeDate = (dates, dateStrings) => {
    // console.log("From: ", dates[0], ", to: ", dates[1]);
    // console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    this.setState({
      fromDate: dates[0],
      toDate: dates[1]
    });
  }
  handleChangeOrder = value => {
    this.setState({ orderID: value })};
  handleChangeStatus = value => this.setState({ status: value });
  onSearch = () => {
    const {
      fromDate,
      toDate,
      status,
      orderID} = this.state;
    let queryString = "";
    //order_id=ICB00001&from_date=2019-06-26&to_date=2019-07-29&status=1;
    if(!!orderID) {
      queryString += `?order_id=${orderID}`;
      if(!!fromDate) queryString += `&from_date=${moment(fromDate).format("YYYY-MM-DD")}&to_date=${moment(toDate).format("YYYY-MM-DD")}`;
      if(!!status) queryString += `&status=${status}`
    } else {
      if(!!fromDate) {
        queryString += `?from_date=${moment(fromDate).format("YYYY-MM-DD")}&to_date=${moment(toDate).format("YYYY-MM-DD")}`;
        if(!!status) queryString += `&status=${status}`
      } else {
        if(!!status)
          queryString += `?status=${status}`
      }
    }
    this.props.onGetListOrder(queryString)
  }
  optionForSelectPackage = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.id}>
            {obj.title}
          </Select.Option>
        );
      });
    }
    return result;
  };
  optionForSelectOrderID = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.order_code}>
            {obj.order_code}
          </Select.Option>
        );
      });
    }
    return result;
  };
  render() {
    const { packageData, orderData } = this.props;
    return (
      <div className="header-search">
        <div className="input-search">
          <RangePicker
            ranges={{
              Today: [moment(), moment()],
              "This Month": [moment().startOf("month"), moment().endOf("month")]
            }}
            showTime
            allowClear
            style={{ width: "300px" }}
            format="DD/MM/YYYY"
            onChange={this.onChangeDate}
          />
          <Select
          allowClear
            style={{ width: "200px", marginLeft: ".3rem" }}
            placeholder="Orders ID"
            onChange={this.handleChangeOrder}
          >
            {this.optionForSelectOrderID(orderData.ordersToSearch)}
          </Select>

          <Select
          allowClear
            style={{ width: "200px", marginLeft: ".3rem" }}
            placeholder="Status"
            onChange={this.handleChangeStatus}
          >
            <Select.Option value={1}>Completed</Select.Option>
            <Select.Option value={2}>New</Select.Option>
            <Select.Option value={3}>Pending Payment</Select.Option>
          </Select>

          <Button
            style={{ marginBottom: "0", marginLeft: ".3rem" }}
            type="primary"
            icon="search"
            onClick = {this.onSearch}
          >
            Search
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    packageData: state.PackageReducer,
    orderData: state.OrderReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetListPackage: () => dispatch(PackageAction.getListPackage()),
    onGetListOrder: () => dispatch(OrderAction.getListOrder())
  };
};
export default Search;
