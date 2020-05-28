import React, { Component } from "react";
import { DatePicker, Select, Button, Form, Row, Col } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import pathRoute from "constants/pathRoute";
import {
  getListCommissionReport,
  getListSaleReport,
  getListPayment,
  getListPartner,
  getListPackageReport
} from "appRedux/actions/ReportAction";
import { getListOrder } from "appRedux/actions/OrderAction";
import { filterDuplicateFromArray } from "helpers";
const { RangePicker } = DatePicker;

class Index extends Component {
  state = {
    rangeDate: null
  }
  componentDidMount() {
    const { orderData } = this.props;
    if (orderData.orders.length <= 0) this.props.onGetListOrder();
  }

  /**
   * @function optionForSelectCustomer
   * @summary show option customer for sale report
   */
  optionForSelectCustomer = data => {
    const arrayCus = filterDuplicateFromArray(data, "customer_id");
    let result;
    if (arrayCus.length > 0) {
      result = arrayCus.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.customer.id}>
            {obj.customer.full_name}
          </Select.Option>
        );
      });
    }
    return result;
  };

  /**
   * @function optionForSelectCustomerPaymentReport
   * @summary show option customer for payment report
   */
  optionForSelectCustomerPaymentReport = data => {
    const arrayCus = filterDuplicateFromArray(data, "customer_id");
    let result;
    if (arrayCus.length > 0) {
      result = arrayCus.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.customer_id}>
            {`${obj.first_name} ${obj.last_name}`}
          </Select.Option>
        );
      });
    }
    return result;
  };

  /**
   * @function optionForSelectFromCustomer
   * @summary show option customer for payment report
   */
  optionForSelectFromCustomer = data => {
    const arrayCus = filterDuplicateFromArray(data, "from_customer_id");
    let result;
    if (arrayCus.length > 0) {
      result = arrayCus.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.from_customer_id}>
            {`${obj.from_first_name} ${obj.from_last_name}`}
          </Select.Option>
        );
      });
    }
    return result;
  };

  /**
   * @function optionForSelectFromCustomer
   * @summary show option customer for payment report
   */
  optionForSelectToCustomer = data => {
    const arrayCus = filterDuplicateFromArray(data, "to_customer_id");
    let result;
    if (arrayCus.length > 0) {
      result = arrayCus.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.to_customer_id}>
            {`${obj.to_first_name} ${obj.to_last_name}`}
          </Select.Option>
        );
      });
    }
    return result;
  };

  /**
   * @function optionForSelectOrderID
   * @summary show option for sale report
   */
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

  /**
   * @function optionForSelectTransactionCode
   * @summary show option for payment report
   */
  optionForSelectTransactionCode = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.tracsaction_code}>
            {obj.tracsaction_code}
          </Select.Option>
        );
      });
    }
    return result;
  };

  /**
   * @function showSlcOptionReport
   * @summary check and show input search follow report categories
   */

  showSlcOptionReport = match => {
    let result = "";
    const { orderData, reportData } = this.props,
      { getFieldDecorator } = this.props.form;
    if (match.path === pathRoute.SALE_REPORT) {
      // sale report
      result = (
        <>
          <Col lg={4} xl={4} md={4} sm={24} xs={24}>
            {getFieldDecorator("slcCustomer")(
              <Select mode="multiple" width="100%" placeholder="Customer">
                {this.optionForSelectCustomer(orderData.orders)}
              </Select>
            )}
          </Col>
          <Col lg={4} xl={4} md={4} sm={24} xs={24}>
            {getFieldDecorator("slcOrderCode")(
              <Select mode="multiple" width="100%" placeholder="Orders Code">
                {this.optionForSelectOrderID(orderData.orders)}
              </Select>
            )}
          </Col>
          <Col lg={4} xl={4} md={4} sm={24} xs={24}>
            {getFieldDecorator("slcStatus")(
              <Select mode="multiple" width="100%" placeholder="Status">
                <Select.Option value={1}>Complete</Select.Option>
                <Select.Option value={2}>New</Select.Option>
                <Select.Option value={3}>Pending</Select.Option>
              </Select>
            )}
          </Col>
        </>
      );
    }
    if (match.path === pathRoute.PAYMENT_REPORT) {
      //payment report
      result = (
        <>
          <Col lg={4} xl={4} md={4} sm={24} xs={24}>
            {getFieldDecorator("slcCustomer")(
              <Select mode="multiple" width="100%" placeholder="Customer">
                {this.optionForSelectCustomerPaymentReport(
                  reportData.listReportSaver
                )}
              </Select>
            )}
          </Col>
          <Col lg={4} xl={4} md={4} sm={24} xs={24}>
            {getFieldDecorator("slcTransactionCode")(
              <Select
                mode="multiple"
                width="100%"
                placeholder="Transactions Code"
              >
                {this.optionForSelectTransactionCode(
                  reportData.listReportSaver
                )}
              </Select>
            )}
          </Col>
          <Col lg={4} xl={4} md={4} sm={24} xs={24}>
            {getFieldDecorator("slcStatus")(
              <Select mode="multiple" width="100%" placeholder="Status">
                <Select.Option value={1}>Complete</Select.Option>
                <Select.Option value={2}>Failed</Select.Option>
              </Select>
            )}
          </Col>
        </>
      );
    }
    if (match.path === pathRoute.COMMISSION_REPORT) {
      //commission report
      result = (
        <>
          <Col lg={4} xl={4} md={4} sm={24} xs={24}>
            {getFieldDecorator("slcFromCustomer")(
              <Select mode="multiple" width="100%" placeholder="From Customer">
                {this.optionForSelectFromCustomer(reportData.listReportSaver)}
              </Select>
            )}
          </Col>
          <Col lg={4} xl={4} md={4} sm={24} xs={24}>
            {getFieldDecorator("slcToCustomer")(
              <Select mode="multiple" width="100%" placeholder="To Customer">
                {this.optionForSelectToCustomer(reportData.listReportSaver)}
              </Select>
            )}
          </Col>
          <Col lg={4} xl={4} md={4} sm={24} xs={24}>
            {getFieldDecorator("slcOrderCode")(
              <Select mode="multiple" width="100%" placeholder="Orders Code">
                {this.optionForSelectOrderID(orderData.orders)}
              </Select>
            )}
          </Col>
          <Col lg={4} xl={4} md={4} sm={24} xs={24}>
            {getFieldDecorator("slcStatus")(
              <Select mode="multiple" width="100%" placeholder="Status">
                <Select.Option value={1}>Approved</Select.Option>
                <Select.Option value={0}>Pending</Select.Option>
              </Select>
            )}
          </Col>
        </>
      );
    }
    return result;
  };

  /**
   * @function handleSubmitSearch
   * @summary search
   */
  handleSubmitSearch = () => {
    const { form, match } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const dataQuery = {};
        let queryString = null;
        // get value general all reports
        if (!!values.rangeDate && values.rangeDate.length > 0) {
          dataQuery[`from_date`] = moment(values.rangeDate[0]).format(
            "YYYY-MM-DD"
          );
          dataQuery[`to_date`] = moment(values.rangeDate[1]).format(
            "YYYY-MM-DD"
          );
        }
        if (!!values.slcStatus && values.slcStatus.length > 0) {
          dataQuery[`status`] = values.slcStatus.join(",");
        }
        // end get value general all reports

        if (match.path === pathRoute.SALE_REPORT) {
          // search of sale report
          if (!!values.slcCustomer && values.slcCustomer.length > 0) {
            dataQuery[`customers`] = values.slcCustomer.join(",");
          }
          if (!!values.slcOrderCode && values.slcOrderCode.length > 0) {
            dataQuery[`order_code`] = values.slcOrderCode.join(",");
          }
        }
        // search of payment report
        if (match.path === pathRoute.PAYMENT_REPORT) {
          if (!!values.slcCustomer && values.slcCustomer.length > 0) {
            dataQuery[`customers`] = values.slcCustomer.join(",");
          }
          if (
            !!values.slcTransactionCode &&
            values.slcTransactionCode.length > 0
          ) {
            dataQuery[`tracsaction_code`] = values.slcTransactionCode.join(",");
          }
        }
        // search of commission report
        if (match.path === pathRoute.COMMISSION_REPORT) {
          if (!!values.slcFromCustomer && values.slcFromCustomer.length > 0) {
            dataQuery[`from_customer_id`] = values.slcFromCustomer.join(",");
          }
          if (!!values.slcToCustomer && values.slcToCustomer.length > 0) {
            dataQuery[`to_customer_id`] = values.slcToCustomer.join(",");
          }
          if (!!values.slcOrderCode && values.slcOrderCode.length > 0) {
            dataQuery[`order_code`] = values.slcOrderCode.join(",");
          }
        }

        // create query string
        if (
          Object.entries(dataQuery).length > 0 &&
          dataQuery.constructor === Object
        ) {
          queryString = Object.keys(dataQuery)
            .map(key => key + "=" + dataQuery[key])
            .join("&");
        }
        // submit search
        if (match.path === pathRoute.SALE_REPORT) {
          this.props.onGetListSaleReport(queryString);
        }
        if (match.path === pathRoute.PAYMENT_REPORT) {
          this.props.onGetListPaymentReport(queryString);
        }
        if (match.path === pathRoute.COMMISSION_REPORT) {
          this.props.onGetListCommissionReport(queryString);
        }
        if (match.path === pathRoute.PARTNER_REPORT) {
          this.props.onGetListPartnerReport(queryString);
        }
        if (match.path === pathRoute.PACKAGE_REPORT) {
          this.props.onGetListPackageReport(queryString);
        }
      }
    });
  };

  /**
   * @function getRangeDate
   * @summary set state data for every change
   */
  getRangeDate = value => {
    this.setState({rangeDate:  value})
  }
  /**
   * @function getDataCSV
   * @summary get data for dowload csv
   */
  getDataCSV = reportData => {
    let data = [];
    const { match } = this.props;
    if (match.path === pathRoute.SALE_REPORT) {
      data = reportData.listSaleReport;
    }
    if (match.path === pathRoute.PAYMENT_REPORT) {
      data = reportData.listPaymentReport;
    }
    if (match.path === pathRoute.COMMISSION_REPORT) {
      data = reportData.listCommissionReport;
    }
    if (match.path === pathRoute.PARTNER_REPORT) {
      data = reportData.listPartnerReport;
    }
    if (match.path === pathRoute.PACKAGE_REPORT) {
      data = reportData.listPackageReport;
    }
    return data;
  };

  /**
   * @function getFileName
   * @summary get file name export
   */
  getFileName = match => {
    let fileName = "commission-report.csv";
    if (match.path === pathRoute.PAYMENT_REPORT) {
      fileName = "payment-report.csv";
    } 
    if (match.path === pathRoute.SALE_REPORT) {
      fileName = "sale-report.csv";
    }
    if (match.path === pathRoute.PARTNER_REPORT) {
      if(!!this.state.rangeDate && this.state.rangeDate.length > 0){
        fileName = `partner-report(${moment(this.state.rangeDate[0]).format("DD-MM-YYYY")} to ${moment(this.state.rangeDate[1]).format("DD-MM-YYYY")}).csv`;
      } else fileName = "partner-report(all).csv";
      
    }
    if (match.path === pathRoute.PACKAGE_REPORT) {
      if(!!this.state.rangeDate && this.state.rangeDate.length > 0){
        fileName = `package-report(${moment(this.state.rangeDate[0]).format("DD-MM-YYYY")} to ${moment(this.state.rangeDate[1]).format("DD-MM-YYYY")}).csv`;
      } else fileName = "package-report(all).csv";
      
    }
    return fileName;
  };
  render() {
    const { match } = this.props,
      { getFieldDecorator } = this.props.form;
    return (
      <div className="header-search">
        <Form layout="horizontal">
          <div className="input-search">
            <Row>
              <Col lg={8} xl={8} md={10} sm={24} xs={24}>
                {getFieldDecorator("rangeDate")(
                  <RangePicker
                    ranges={{
                      Today: [moment(), moment()],
                      "This Month": [
                        moment().startOf("month"),
                        moment().endOf("month")
                      ]
                    }}
                    showTime
                    onChange={this.getRangeDate}
                    className="st-range-search-report"
                    format="DD/MM/YYYY"
                  />
                )}
              </Col>
              {this.showSlcOptionReport(match)}
              <Col lg={3} xl={3} md={3} sm={7} xs={7}>
                <Button
                  type="primary"
                  icon="search"
                  onClick={this.handleSubmitSearch}
                >
                  Search
                </Button>
              </Col>
              <Col lg={2} xl={2} md={2} sm={7} xs={7}>
                <Button
                  className="st-btn-export"
                  type="primary"
                  icon="download"
                  size="default"
                >
                  <CSVLink
                    data={this.getDataCSV(this.props.reportData)}
                    filename={this.getFileName(match)}
                  >
                    Export
                  </CSVLink>
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    packageData: state.PackageReducer,
    orderData: state.OrderReducer,
    reportData: state.ReportReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetListOrder: () => dispatch(getListOrder()),
    onGetListSaleReport: queryString =>
      dispatch(getListSaleReport(queryString)),
    onGetListPaymentReport: queryString =>
      dispatch(getListPayment(queryString)),
    onGetListCommissionReport: queryString =>
      dispatch(getListCommissionReport(queryString)),
    onGetListPartnerReport: queryString => dispatch(getListPartner(queryString)),
    onGetListPackageReport: queryString => dispatch(getListPackageReport(queryString))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Index));
