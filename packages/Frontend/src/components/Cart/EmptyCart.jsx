import React, { Component } from "react";
import IntlMessage from "util/IntlMessages";
import { Link } from "react-router-dom";

export default class EmptyCart extends Component {
  render() {
    return (
      <>
        <div>
          <IntlMessage id="cart.emptyCart" />
        </div>
        <div className="st-return-shop">
            <Link to = "/package">
                <IntlMessage id="cart.returnToShop" />
            </Link>
        </div>
      </>
    );
  }
}
