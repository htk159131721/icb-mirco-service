import React, { Component } from "react";
import { Col, Row, Button } from "antd";
import CurrencyFormat from "react-currency-format";
import SweetAlert from "react-bootstrap-sweetalert";

import IntlMessages from "util/IntlMessages";

class ItemCombo extends Component {
  state = {
    info: false,
    packageData: null,
    paymentMethod: 1
  };
  /*************************************************** */
  onShowConfirm = data => {
    data.type = "combo"
    this.setState({ info: true, packageData: data })
  }
  onCancelBuyPackage = () => this.setState({ info: false });
  onBuyPackage = () => {
    this.setState({ info: false });
    this.props.onShowModal(true);
    this.props.onSetDataPackage(this.state.packageData)
  };
  componentDidMount() {
    const { comboData } = this.props;
    if (comboData.combos.length <= 0) this.props.onGetListCombo();
  }
  showItemCombo = data => {
    let result;
    if (data.combos.length > 0) {
      result = data.combos.map((combo, index) => {
        return (
          <Col key={index} xl={8} lg={24} md={8} xs={24}>
            <div className="gx-package st-combo-icb">
              <div className="gx-package-header gx-bg-primary gx-text-white">
                <h2 className="gx-price">
                  <i className="icon icon-halfstar" />
                  <CurrencyFormat
                    suffix=" USD"
                    value={combo.price}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  
                </h2>
                {
                  combo.discounts !== 0 || combo.discounts
                  ? <h5 className="gx-text-success st-off">{combo.discounts}% off</h5>
                  : null
                }
                <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">
                  {combo.combo_name}
                </p>
              </div>

              <div className="gx-package-body">
                <div className="gx-package-items" dangerouslySetInnerHTML={{__html: combo.combo_description}}/>
                <div className="gx-package-footer">
                  <Button type="primary" onClick={() => this.onShowConfirm(combo)}>
                    {<IntlMessages id="pricingTable.buyNow" />}
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        );
      });
    }
    return result;
  };
  render() {
    const { comboData } = this.props;
    return (
      <div className="gx-price-tables gx-pt-default">
        <Row>{this.showItemCombo(comboData)}</Row>
        <SweetAlert
          show={this.state.info}
          info
          showCancel
          confirmBtnText={<IntlMessages id="sweetAlerts.continue" />}
          cancelBtnText={<IntlMessages id="sweetAlerts.Cancel" />}
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default"
          title={<IntlMessages id="sweetAlerts.areYouSure" />}
          onConfirm={this.onBuyPackage}
          onCancel={this.onCancelBuyPackage}
        />
      </div>
    );
  }
}

export default ItemCombo;
