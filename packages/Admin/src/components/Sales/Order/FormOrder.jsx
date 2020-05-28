import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Table,
  Form,
  message,
  Select,
  Row,
  Col,
  Input,
  Icon
} from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import CurrencyFormat from "react-currency-format";
import {
  saveListService,
  updateListService,
  deleteService,
  createOrder,
  getDetailOrder,
  updateOrder,
  getInfoCus,
  applyCodePromotion,
  clearListService
} from "appRedux/actions/OrderAction";
import { getListCustomer } from "appRedux/actions/CustomerAction";
import { getListPackage } from "appRedux/actions/PackageAction";
import { getListCombo } from "appRedux/actions/ComboAction";
import {
  getDataCountries,
  getDataCities
} from "appRedux/actions/GeoraphyAction";
import CircularProgress from "components/CircularProgress";
import {
  showModalPackage,
  hideMessError,
  hideMessSuccess,
  showLoadingBtn,
  hideLoadingBtn,
  showMessSuccess
} from "appRedux/actions/GeneralAction";
import Header from "../../Generals/HeaderPackage";
import FormAddInfoCus from "./ModalAddInfoCus";
import IntlMessages from "util/IntlMessages";
/**
 * @class FormOrder
 * @extends Component
 * @summary handler create, update order
 */
class FormOrder extends Component {
  /**
   * @memberof FormOrder
   */
  /*************************************************************************/
  /**
   * @lyfecycle componentDidMount
   */
  componentDidMount() {
    const { customerData, packageData, comboData } = this.props;
    if (customerData.customers.length <= 0) this.props.onGetListCustomer();
    if (packageData.packages.length <= 0) this.props.onGetListPackage();
    if (comboData.listCombo.length <= 0) this.props.onGetListCombo();
    const idService = this.getServiceIdUpdate();
    if (idService !== 0) {
      this.props.onGetDetailOrder({ id: idService, view: "UPDATE" });
    }
  }

  /**
   * @lyfecycle componentDidUpdate
   */
  componentDidUpdate() {
    if (this.props.generalData.flagSuccess) {
      message.success(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.hideMessSuccess();
      }, 100);
    }
    if (this.props.generalData.flagError) {
      message.error(this.props.generalData.messAlert);
      setTimeout(() => {
        this.props.hideMessError();
      }, 100);
    }
  }

  /**
   * @lyfecycle componentWillUnmount
   * @summary destroy orderDetail in store 
   */
  componentWillUnmount(){
    this.props.onClearListService();
  }
  /**
   * @deprecated state
   */
  state = {
    idUpdate: 0,
    price: 0,
    indexDel: 0,
    warning: false,
    package: null,
    combo: null,
    name: ""
  };

  /**
   * @function getServiceIdUpdate
   * @summary get service id from query string
   */
  getServiceIdUpdate = () => {
    let id = 0;
    const search = this.props.location.search,
      values = new URLSearchParams(search);
    if (search) {
      if (values.get("id")) id = values.get("id");
    }
    return id;
  };

  /**
   * @function optionForSelectCustomer
   * @summary apply data for component Select
   */
  optionForSelectCustomer = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option key={index} value={obj.id}>
            {`${obj.username} - ${obj.full_name} - ${obj.email}`}
          </Select.Option>
        );
      });
    }
    return result;
  };
  /**
   * @function optionForSelectPackage
   * @summary apply data for component Select
   */
  optionForSelectPackage = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option
            key={index}
            value={obj.id}
            valueprice={
              obj.price_sale && obj.price > obj.price_sale
                ? obj.price_sale
                : obj.price
            }
            valuename={obj.title}
          >
            {obj.title}
          </Select.Option>
        );
      });
    }
    return result;
  };
  /**
   * @function optionForSelectCombo
   * @summary apply data for component Select
   */
  optionForSelectCombo = data => {
    let result;
    if (data.length > 0) {
      result = data.map((obj, index) => {
        return (
          <Select.Option
            key={index}
            value={obj.id}
            valueprice={obj.price}
            valuename={obj.combo_name}
          >
            {obj.combo_name}
          </Select.Option>
        );
      });
    }
    return result;
  };

  /**
   * @function onChangeService
   * @summary set state when change select
   */
  onChangeService = (value, option, typeService) => {
    if (typeService === "combo") {
      this.setState({
        combo: value,
        price: option.props.valueprice,
        name: option.props.valuename
      });
    } else {
      this.setState({
        package: value,
        price: option.props.valueprice,
        name: option.props.valuename
      });
    }
  };
  /**
   * @function showModalAddInfoCus
   * @summary set data for modal and show modal
   */
  showModalAddInfoCus = (typeAction, typeService, recordData) => {
    const data = {
      typeService,
      typeAction,
      price: this.state.price,
      name: this.state.name
    };
    //call action get info cus selected for update order
    if (this.getServiceIdUpdate() !== 0 && typeAction === "ADD") {
      this.onGetInfoCusForAddService(this.props.form.getFieldValue("customer"));
    }
    setTimeout(() => {
      if (typeAction === "ADD") {
        if (typeService === "package") {
          if (!!this.state.package) {
            data.id = this.state.package;
            this.formCus.setDataForForm(typeAction, data);
          } else {
            message.error("Please select service");
          }
        } else {
          if (!!this.state.combo) {
            data.id = this.state.combo;
            this.formCus.setDataForForm(typeAction, data);
          } else {
            message.error("Please select service");
          }
        }
      } else {
        this.formCus.setDataForForm(typeAction, recordData);
      }
    }, 100);
  };
  /**
   * @function onCancelDelete
   */
  onCancelDelete = () => this.setState({ warning: false, indexDel: 0 });
  /**
   * @function onDelete
   */
  onDelete = () => {
    this.setState({ warning: false });
    this.props.onDeleteService(this.state.indexDel);
  };

  /**
   * @function getDataForTable
   */
  getDataForTable = data => {
    let result = [];
    if (data.listService.length > 0) {
      data.listService.map((service, index) => {
        result.push({
          key: index + 1,
          index,
          service
        });
      });
    }
    return result;
  };
  showAlert = index => {
    this.setState({ indexDel: index, warning: true });
  };
  /**
   * @function handleCreateOrder
   * @summary handle Create Order
   */
  handleCreateOrder = () => {
    const { form, orderData } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (orderData.listService.length > 0) {
          const totalPrice = orderData.listService.reduce(
            (sum, obj) => sum + obj.total,
            0
          );
          let orderDetail = {};
          orderData.listService.map((obj, index) => {
            Object.assign(orderDetail, { [index + 1]: obj });
          });
          const data = {
            status: 2,
            customer_id: values.customer,
            quantity: 1,
            node: values.note,
            payment_type: "admin",
            order_details: orderDetail
          };
          if (this.getServiceIdUpdate() === 0) {
            //handle create order
            data.promotion_code = orderData.promotion
              ? orderData.promotion.code
              : "";
            data.promotion_value = orderData.promotion
              ? orderData.promotion.discount
              : "";
            data.total_pay = orderData.promotion
              ? totalPrice - orderData.promotion.discount
              : totalPrice;
            this.props.onCreateOrder(data);
          } else {
            //handle update order
            data.promotion_code = orderData.orderDetail.promotion_code;
            data.promotion_value = orderData.orderDetail.promotion_value;
            data.total_pay = orderData.orderDetail.total_pay;
            data.id = this.getServiceIdUpdate();
            this.props.onUpdateOrder(data);
          }
        } else {
          message.error("No service in order");
        }
      }
    });
  };

  /**
   * @function onApplyPromotionCode
   * @summary check and appy code promotion for order
   */
  onApplyPromotionCode = value => {
    const { orderData } = this.props;
    if (value) {
      if (orderData.listService.length > 0) {
        if (this.getServiceIdUpdate() !== 0) {
          message.error("Cannot apply code promotion this order!");
        } else {
          //for create order
          this.props.onApplyCodePromotion({ promotion_code: value });
        }
      } else message.error("Product list empty!");
    } else message.error("Code promotion empty!");
  };

  onGetInfoCusForAddService = idCus => {
    const cusSelected = this.props.customerData.customers.filter(
      cus => cus.id === idCus
    );
    if (cusSelected.length > 0) this.props.onGetInfoCus(cusSelected[0]);
  };

  calSumTotal = orderData => {
    let sum = this.getDataForTable(orderData).reduce(
        (sum, i) => sum + i.service.total,
        0
      ),
      discount = 0;
    console.log(orderData);
    if (orderData.orderDetail) {
      if (orderData.orderDetail.promotion_value && !orderData.promotion)
        sum -= orderData.orderDetail.promotion_value;
      discount = orderData.orderDetail.promotion_value
        ? orderData.orderDetail.promotion_value
        : 0;
    }
    if (orderData.promotion) {
      sum -= orderData.promotion.discount;
      discount = orderData.promotion.discount;
    }
    return { sum, discount };
  };
  render() {
    const { getFieldDecorator } = this.props.form,
      { customerData, packageData, comboData, orderData } = this.props;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key"
      },
      {
        title: "Name service",
        dataIndex: "service.name",
        key: "service.name"
      },
      {
        title: "Type service",
        dataIndex: "service.type",
        key: "service.type",
        render: (text, record) => {
          return (
            <span style={{ textTransform: "uppercase" }}>
              {record.service.type}
            </span>
          );
        }
      },
      {
        title: "Quantity",
        dataIndex: "service.quantity",
        key: "service.quantity"
      },
      {
        title: "Price",
        dataIndex: "service.price",
        key: "service.price",
        render: (text, record) => {
          return (
            <CurrencyFormat
              suffix=" USD"
              value={record.service.price}
              displayType={"text"}
              thousandSeparator={true}
            />
          );
        }
      },
      {
        title: "Total",
        dataIndex: "service.total",
        key: "service.total",
        render: (text, record) => {
          return (
            <CurrencyFormat
              suffix=" USD"
              value={record.service.total}
              displayType={"text"}
              thousandSeparator={true}
            />
          );
        }
      },
      {
        title: "Action",
        dataIndex: "index",
        key: "action",
        width: "3%",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              <a
                href="javascript:;"
                onClick={e => this.showModalAddInfoCus("UPDATE", null, record)}
              >
                <i className="icon icon-edit" />
              </a>
              <a
                href="javascript:;"
                onClick={() => this.showAlert(record.index)}
              >
                <i className="icon icon-trash" />
              </a>
            </div>
          );
        }
      }
    ];
    const footerSumTable = props => {
      return (
        <tbody {...props}>
          {props.children}
          <tr className="ant-table-row">
            <td colSpan="3">Discount:</td>
            <td>-</td>
            <td>-</td>
            <td>
              <CurrencyFormat
                suffix=" USD"
                value={this.calSumTotal(orderData).discount}
                displayType={"text"}
                thousandSeparator={true}
              />
            </td>
            <td>-</td>
          </tr>
          <tr className="ant-table-row">
            <td colSpan="3">Total Payment:</td>
            <td>
              {this.getDataForTable(orderData).reduce(
                (sum, i) => sum + i.service.quantity,
                0
              )}
            </td>
            <td>-</td>
            <td>
              <CurrencyFormat
                suffix=" USD"
                value={this.calSumTotal(orderData).sum}
                displayType={"text"}
                thousandSeparator={true}
              />
            </td>
            <td>-</td>
          </tr>
        </tbody>
      );
    };
    return (
      <div>
        <Header match={this.props.match} />
        <div className="section-main">
          <Form>
            <Row>
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                {this.getServiceIdUpdate() !== 0 ? ( //view update
                  <Form.Item>
                    <IntlMessages id="modalPackage.Form.Customer" />
                    {getFieldDecorator("customer", {
                      rules: [
                        {
                          required: true,
                          message: (
                            <IntlMessages id="modalPackage.Form.Err.Required" />
                          )
                        }
                      ],
                      initialValue: orderData.orderDetail
                        ? orderData.orderDetail.customer_id
                        : undefined
                    })(
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Username - Fullname - Email"
                        optionFilterProp="children"
                        onChange={this.onGetInfoCusForAddService}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {this.optionForSelectCustomer(customerData.customers)}
                      </Select>
                    )}
                  </Form.Item>
                ) : (
                  // view create
                  <Form.Item>
                    <IntlMessages id="modalPackage.Form.Customer" />
                    {getFieldDecorator("customer", {
                      rules: [
                        {
                          required: true,
                          message: (
                            <IntlMessages id="modalPackage.Form.Err.Required" />
                          )
                        }
                      ]
                    })(
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Username - Fullname - Email"
                        optionFilterProp="children"
                        onChange={this.onGetInfoCusForAddService}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {this.optionForSelectCustomer(customerData.customers)}
                      </Select>
                    )}
                  </Form.Item>
                )}
              </Col>
            </Row>
            {/* select package */}
            <Row>
              <Col xl={8} lg={8} md={12} sm={16} xs={16}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Package" />
                  {getFieldDecorator("package")(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a package"
                      onChange={(value, option) =>
                        this.onChangeService(value, option, "package")
                      }
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.optionForSelectPackage(packageData.packages)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                <div className="btn-add-order">
                  <Button
                    type="dashed"
                    disabled={this.getServiceIdUpdate() !== 0 ? true : false}
                    onClick={() =>
                      this.showModalAddInfoCus("ADD", "package", null)
                    }
                  >
                    <Icon type="plus" />
                    <IntlMessages id="headerPackage.Add" />
                  </Button>
                </div>
              </Col>
            </Row>
            {/* select combo */}
            <Row>
              <Col xl={8} lg={8} md={12} sm={16} xs={16}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Combo" />
                  {getFieldDecorator("combo")(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Select a combo"
                      optionFilterProp="children"
                      onChange={(value, option) =>
                        this.onChangeService(value, option, "combo")
                      }
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.optionForSelectCombo(comboData.listCombo)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={3} lg={3} md={6} sm={6} xs={6}>
                <div className="btn-add-order">
                  <Button
                    type="dashed"
                    disabled={this.getServiceIdUpdate() !== 0 ? true : false}
                    onClick={() =>
                      this.showModalAddInfoCus("ADD", "combo", null)
                    }
                  >
                    <Icon type="plus" />
                    <IntlMessages id="headerPackage.Add" />
                  </Button>
                </div>
              </Col>
            </Row>

            <div className="table-package">
              <Table
                components={{ body: { wrapper: footerSumTable } }}
                dataSource={this.getDataForTable(orderData)}
                columns={columns}
                className="gx-pb-4"
              />
              <Col xl={10} lg={10} md={12} sm={24} xs={24}>
                <Form.Item>
                  {getFieldDecorator("promotion_code", {
                    initialValue: orderData.orderDetail
                      ? orderData.orderDetail.promotion_code
                      : ""
                  })(
                    <Input.Search
                      placeholder="Code promotion"
                      enterButton="Apply"
                      className="gx-mb-0"
                      size="default"
                      onSearch={value => this.onApplyPromotionCode(value)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={10} lg={10} md={12} sm={24} xs={24}>
                <Form.Item>
                  <IntlMessages id="modalPackage.Form.Note" />
                  {getFieldDecorator("note", {
                    initialValue: orderData.orderDetail
                      ? orderData.orderDetail.node
                      : ""
                  })(<Input.TextArea rows={3} />)}
                </Form.Item>
              </Col>
            </div>

            <div className="btn-sbm-create">
              <Button
                loading={this.props.generalData.loadingBTN}
                type="primary"
                onClick={this.handleCreateOrder}
              >
                <Icon type="login" />
                <IntlMessages id="modalPackage.Form.CreateOrder" />
              </Button>
            </div>
          </Form>
        </div>
        {this.props.generalData.loaderTotal ? (
          <div className="gx-loader-view-mask">
            <CircularProgress />
          </div>
        ) : null}
        {/* alert */}
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
        <FormAddInfoCus
          onRef={ref => (this.formCus = ref)}
          georaphyData={this.props.georaphyData}
          generalData={this.props.generalData}
          orderData={this.props.orderData}
          onShowModal={this.props.onShowModal}
          onSaveListService={this.props.onSaveListService}
          onUpdateListService={this.props.onUpdateListService}
          onGetDataCities={this.props.onGetDataCities}
          onGetDataCountries={this.props.onGetDataCountries}
          onShowLoadingBTN={this.props.onShowLoadingBTN}
          onHideLoadingBTN={this.props.onHideLoadingBTN}
          onShowMessSuccess={this.props.onShowMessSuccess}
        />
      </div>
    );
  }
}
/**
 * @function mapStateToProps
 * @summary pass state from reducer become to props of component
 * @input state Reducer
 * @output props of component
 */
const mapStateToProps = state => {
  return {
    usersData: state.auth,
    generalData: state.generalReducer,
    orderData: state.OrderReducer,
    customerData: state.CustomerReducer,
    packageData: state.PackageReducer,
    comboData: state.ComboReducer,
    georaphyData: state.GeoraphyReducer
  };
};

/**
 * @function mapDispatchToProps
 * @input dispatch
 * @output props of component
 * @summary dispatch actions become to props of component
 */
const mapDispatchToProps = dispatch => {
  return {
    //general
    onShowModal: boolean => dispatch(showModalPackage(boolean)),
    hideMessError: () => dispatch(hideMessError()),
    hideMessSuccess: () => dispatch(hideMessSuccess()),
    onShowLoadingBTN: () => dispatch(showLoadingBtn()),
    onHideLoadingBTN: () => dispatch(hideLoadingBtn()),
    onShowMessSuccess: mess => dispatch(showMessSuccess(mess)),
    // georaphy
    onGetDataCountries: () => dispatch(getDataCountries()),
    onGetDataCities: nameCountry => dispatch(getDataCities(nameCountry)),
    //order
    onSaveListService: data => dispatch(saveListService(data)),
    onUpdateListService: (data, index) =>
      dispatch(updateListService(data, index)),
    onGetDetailOrder: id => dispatch(getDetailOrder(id)),
    onDeleteService: index => dispatch(deleteService(index)),
    onCreateOrder: data => dispatch(createOrder(data)),
    onUpdateOrder: data => dispatch(updateOrder(data)),
    onGetInfoCus: data => dispatch(getInfoCus(data)),
    onApplyCodePromotion: data => dispatch(applyCodePromotion(data)),
    onClearListService: () => dispatch(clearListService()),
    //customer
    onGetListCustomer: () => dispatch(getListCustomer()),
    //package
    onGetListPackage: () => dispatch(getListPackage()),
    //combo
    onGetListCombo: () => dispatch(getListCombo())
  };
};
export default Form.create()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FormOrder)
);
