import React, { Component } from "react";
import { DatePicker, Select, Button, Form, Row, Col } from "antd";
import moment from "moment";
import { filterDuplicateFromArray } from "helpers/helpers";
const { RangePicker } = DatePicker;

class Search extends Component {
  /**
   * @function optionForSelectFromCustomer
   * @summary  remove duplicate from customer into array list CMS and show option
   */
  optionForSelectFromCustomer = data => {
    let result;
    const arrayCus = filterDuplicateFromArray(data, "from_customer_id");
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
   * @function optionForSelectOrderCode
   * @summary  remove duplicate from customer into array list CMS and show option
   */
  optionForSelectOrderCode = data => {
    let result;
    const arrayCus = filterDuplicateFromArray(data, "order_code");
    if (arrayCus.length > 0) {
      result = arrayCus.map((obj, index) => {
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
   * @function handleSubmitSearch
   */
  handleSubmitSearch = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const dataQuery = {};
        let queryString = null;
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
        if (!!values.slcFromCustomer && values.slcFromCustomer.length > 0) {
          dataQuery[`from_customer_id`] = values.slcFromCustomer.join(",");
        }
        if (!!values.slcOrderCode && values.slcOrderCode.length > 0) {
          dataQuery[`order_code`] = values.slcOrderCode.join(",");
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

        // call api
        this.props.onGetListCMS(queryString)
      }
    });
  };

  render() {
    const { CMSData } = this.props,
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
                    className="st-range-search-report"
                    format="DD/MM/YYYY"
                  />
                )}
              </Col>
              <Col lg={4} xl={4} md={4} sm={24} xs={24}>
                {getFieldDecorator("slcFromCustomer")(
                  <Select
                    mode="multiple"
                    width="100%"
                    placeholder="From Customer"
                  >
                    {this.optionForSelectFromCustomer(CMSData.listSaver)}
                  </Select>
                )}
              </Col>
              <Col lg={4} xl={4} md={4} sm={24} xs={24}>
                {getFieldDecorator("slcOrderCode")(
                  <Select
                    mode="multiple"
                    width="100%"
                    placeholder="Orders Code"
                  >
                    {this.optionForSelectOrderCode(CMSData.listSaver)}
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
              <Col lg={3} xl={3} md={3} sm={7} xs={7}>
                <Button
                  type="primary"
                  icon="search"
                  onClick={this.handleSubmitSearch}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Search);
