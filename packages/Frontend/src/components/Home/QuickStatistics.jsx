import React, { Component } from "react";
import Auxiliary from "util/Auxiliary";
import Widget from "components/Widget/index";
import moment from "moment";
import { Link } from "react-router-dom";
import { Modal, Row, Col, Button, Icon, Input, message } from "antd";
import pathRoute from "constants/pathRoute";
import ModalWithDraw from "./ModalWithdraw";
import * as helper from "helpers/helpers";

const diffDay = moment(Date.now()).diff(
  moment()
    .startOf("month")
    .format("YYYY-MM-DD"),
  "day",
  true
);

export default class QuickStatistics extends Component {
  state = {
    loading: false,
    visible: false,
    inviteEmail: ""
  };

  copyRefCode = e => {
    e = e.toUpperCase();
    navigator.clipboard.writeText(e);
    message.success("Your ref-Code: " + e + " copied!");
  };
  copyRefLink = refCode => {
    const link = `${process.env.REACT_APP_USER_URL}/signup?sponsorkey=${refCode}`;
    navigator.clipboard.writeText(link);
    message.success(
      <span>
        Your link ref: <a href={link}> {link} </a> copied!
      </span>
    );
  };

  componentDidMount() {
    this.props.getDashboarData();
  }

  handleHideModal = nameModal => {
    this.props.showModalDynamic(nameModal, false);
  };

  handleClickShowModal = (nameModal, commission) => {
    if (nameModal === "withdrawModal") {
      if (commission < 50) {
        message.info(
          <span>
            Minimum balance is withdrawn <strong>$50</strong>
          </span>
        );
      } else this.props.showModalDynamic(nameModal, true);
    } else this.props.showModalDynamic(nameModal, true);
  };

  getEmailInvite = event => {
    this.setState({ inviteEmail: event.target.value });
  };

  handleSubmitInviteFriend = () => {
    let email = this.state.inviteEmail;
    if (email === "") {
      message.error("Email not available!");
    } else {
      this.props.postSentEmailInvite({ email });
    }
  };

  render() {
    const { dashboardData } = this.props;
    const data = helper.isExist(dashboardData.dashboard);
    /**
     * prepare data to append
     * change text here
     */
    let customerFulname = !data
        ? "Customer"
        : data.customer.first_name + " " + data.customer.last_name,
      customerSponsorKey = !data ? "" : data.customer.sponsorKey,
      customerSponsorLink = `${process.env.REACT_APP_USER_URL}/signup?sponsorkey=${customerSponsorKey}`,
      /**
       * commission withdraw already
       */
      customerCommissionWasEarn = !data
        ? "0"
        : data.total_commissions - data.customer.commissions_earned,
      /**
       * Current Commission can request to withdraw
       * Limit max amount to withdrawal
       */
      customerCommission = !data ? "0" : data.customer.commissions_earned;
    return (
      <Auxiliary>
        <Row>
          {/* User balance */}
          <Col lg={8} md={8} sm={8} xs={24}>
            <Widget>
              <h2 className="h4 gx-mb-3">Hi {customerFulname}</h2>

              <div className="ant-row-flex">
                <h2 className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">
                  {dashboardData.dashboard
                    ? dashboardData.dashboard.customer.levelInfoCommissions
                      ? dashboardData.dashboard.customer.levelInfoCommissions
                          .title
                      : "NULL"
                    : "NULL"}
                </h2>
                <h4 className="gx-pt-2 gx-chart-up">
                  {dashboardData.dashboard
                    ? dashboardData.dashboard.customer.levelInfoCommissions
                      ? `lv${dashboardData.dashboard.customer.levelInfoCommissions.level}`
                      : "NULL"
                    : "NULL"}
                </h4>
              </div>
              {/* <p className="gx-text-grey">Overall balance</p> */}
              <p className="gx-text-primary gx-pointer gx-d-none gx-d-sm-block gx-mb-3 gx-mt-3">
                <i className="icon icon-add-circle gx-fs-lg gx-d-inline-flex gx-vertical-align-middle" />{" "}
                Learn how to unlock level
              </p>
              <div className="ant-row-flex gx-mb-3 gx-mb-md-2">
                <Button className="gx-btn-cyan">
                  <Icon type="swap" />
                  Unlock Your Level
                </Button>
              </div>
            </Widget>
          </Col>
          {/* User commissions */}
          <Col lg={8} md={8} sm={8} xs={24}>
            <Widget>
              <h2 className="h4 gx-mb-3">My Commissions</h2>
              <div className="ant-row-flex">
                <h2 className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">
                  ${!!customerCommission ? customerCommission : 0}
                </h2>
              </div>
              {/* <p className="gx-text-grey">Overall balance</p> */}
              <p className="gx-text-primary gx-pointer gx-d-none gx-d-sm-block gx-mb-3 gx-mt-3">
                <i className="icon icon-add-circle gx-fs-lg gx-d-inline-flex gx-vertical-align-middle" />{" "}
                Was earned $
                {!!customerCommissionWasEarn ? customerCommissionWasEarn : 0}
              </p>
              <div className="ant-row-flex gx-mb-1 gx-mb-md-1">
                <Button className="gx-mr-2 gx-mb-2" type="primary">
                  <Link to={pathRoute.LIST_COMMISSION}>
                    <Icon type="money-collect" />
                    Lastest commission
                  </Link>
                </Button>
                <Button
                  className="gx-btn-red gx-mb-2"
                  disabled={diffDay > 11 || data.is_withdraw_in_mouth === 1 ? true : false}
                  onClick={() =>
                    this.handleClickShowModal(
                      "withdrawModal",
                      customerCommission
                    )
                  }
                >
                  Withdraw
                </Button>
              </div>
              <small>
                Withdraw from <strong>1-11</strong> monthly.
              </small>
            </Widget>
          </Col>
          {/* User Refferals */}
          <Col lg={8} md={8} sm={8} xs={24}>
            <Widget>
              <h2 className="h4 gx-mb-3 ref-card-box">Referals</h2>

              <div className="ant-row-flex">
                <h2 className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">
                  {customerSponsorKey.toUpperCase()}
                </h2>
                <a
                  className="gx-pt-2 gx-chart-up"
                  onClick={() => this.copyRefCode(customerSponsorKey)}
                >
                  <Icon type="copy" />
                  copy
                </a>
              </div>
              {/* <p className="gx-text-grey">Overall balance</p> */}
              <p
                className="gx-text-primary gx-pointer gx-d-none gx-d-sm-block gx-mb-3 gx-mt-3"
                onClick={() => this.copyRefLink(customerSponsorKey)}
              >
                <i className="icon icon-link gx-fs-lg gx-d-inline-flex gx-vertical-align-middle" />
                Copy referal link
              </p>
              <div className="ant-row-flex gx-mb-3 gx-mb-md-2">
                <Button
                  className="gx-mr-2"
                  type="primary"
                  onClick={() => this.handleClickShowModal("refferalsModal")}
                >
                  <Icon type="mail" />
                  Sent invitation email
                </Button>
              </div>
            </Widget>
          </Col>
        </Row>
        {/* Modal sent email invitation */}
        <Modal
          visible={this.props.generalData.refferalsModal}
          title="Invite your friend"
          onOk={this.handleOk}
          onCancel={() => this.handleHideModal("refferalsModal")}
          footer={[
            <Button
              key="back"
              onClick={() => this.handleHideModal("refferalsModal")}
            >
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleSubmitInviteFriend}
            >
              Submit
            </Button>
          ]}
        >
          <p>You can user this link to invite friend</p>
          <a href={customerSponsorLink}>{customerSponsorLink}</a>
          <Input
            placeholder="friend_email@gmail.com"
            onChange={this.getEmailInvite}
          />
        </Modal>
        {/* end invitation model */}
        <ModalWithDraw
          listBank={this.props.listBank}
          customerCommission={customerCommission}
          generalData={this.props.generalData}
          handleHideModal={this.handleHideModal}
          onGetListBank={this.props.onGetListBank}
          onCreateWithdraw={this.props.onCreateWithdraw}
        />
      </Auxiliary>
    );
  }
}
