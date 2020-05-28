import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";

import { deleteCart } from "appRedux/actions/CartAction";

import CustomScrollbars from "util/CustomScrollbars";
import Auxiliary from "util/Auxiliary";

class ItemCartSmall extends Component {
  /**
   * @function showItem
   * @summary show item cart from list cart
   */
  showItem = (cart, index) => {
    return (
      <li key={index} className="gx-media">
        <div className="gx-media-body">
          <div className="gx-flex-row gx-justify-content-between gx-align-items-center">
            <h5
              style={{ width: "90%" }}
              className="gx-text-capitalize gx-user-name gx-mb-0"
            >
              <span className="gx-link">{cart.name}</span>
            </h5>
            <span className="gx-meta-date">
              <a
                href="javascript:;"
                onClick={e => this.delItemcart(e, cart.id)}
              >
                <small>Xóa</small>
              </a>
            </span>
          </div>
          <span className="gx-fs-sm mr-1">
            <CurrencyFormat
              value={cart.price}
              displayType="text"
              suffix=" USD"
              thousandSeparator={true}
            />
          </span>
          <span className="gx-fs-sm mr-1">x</span>
          <span className="gx-fs-sm mr-1">{cart.quantity}</span>
          <span className="gx-fs-sm mr-1">=</span>
          <span className="gx-fs-sm mr-1">
            <CurrencyFormat
              value={parseInt(cart.quantity) * parseInt(cart.price)}
              displayType="text"
              suffix=" USD"
              thousandSeparator={true}
            />
          </span>
        </div>
      </li>
    );
  };
  /**
   * @function delItemcart
   * @summary delete item cart from list
   * @input  id
   * @output list cart new
   */
  delItemcart = (e, id) => {
    e.preventDefault();
    this.props.onDeleteCart(id);
  };
  /**
   * @function showTotalcart
   * @summary calculate and show total cart
   */
  showTotalcart = cartsData => {
    let result = 0;
    if (cartsData.carts.length > 0) {
      result = cartsData.carts.reduce(
        (sum, cart) => (sum += cart.price * cart.quantity),
        0
      );
    }
    return result;
  };
  /**
   * @function showViewCartContent
   * @summary check length cart > 0 => show
   */
  showViewCartContent = cartsData => {
    let result = (
      <Auxiliary>
        <div className="gx-popover-header-cart-null">
            <h4>No items in cart</h4>
        </div>
      </Auxiliary>
    );
    if (cartsData.carts.length > 0) {
      result = (
        <Auxiliary>
          <div className="gx-popover-header">
            <h3 className="gx-mb-0">Cart</h3>
            <i className="gx-icon-btn icon icon-charvlet-down" />
          </div>
          <div className="custom-popover-scroll">
            <CustomScrollbars className="gx-popover-scroll">
              <ul className="gx-sub-popover">
                {cartsData.carts.map((cart, index) =>
                  this.showItem(cart, index)
                )}
              </ul>
            </CustomScrollbars>
          </div>
          <div className="footer-cart-small">
            <div className="sub-total">
              <span>Total Order:</span>
              <CurrencyFormat
                value={this.showTotalcart(cartsData)}
                thousandSeparator={true}
                suffix=" USD"
                prefix=" "
                displayType="text"
              />
            </div>
            <div className="view-cart">
              <Link to="/cart">VIEW CART</Link>
            </div>
          </div>
        </Auxiliary>
      );
    }
    return result;
  };
  render() {
    const { cartsData } = this.props;
    return this.showViewCartContent(cartsData);
  }
}
const mapStateToProps = state => {
  return {
    cartsData: state.CartReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDeleteCart: data => dispatch(deleteCart(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCartSmall);
