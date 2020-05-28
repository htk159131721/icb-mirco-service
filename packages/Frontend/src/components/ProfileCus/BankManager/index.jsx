import React, { Component } from "react";
import { Button, Table, Modal, Form, Input } from "antd";
import IntlMessage from "util/IntlMessages";
import SweetAlert from "react-bootstrap-sweetalert";
/**
 * @class Index
 * @extends {Component}
 */
class Index extends Component {
  /**
   * @summary handle CRUD bank
   */
  /**
   * @function componentDidMout
   */
  componentDidMount() {
    const { userData } = this.props;
    if (userData.banks.length <= 0) this.props.onGetListBank();
  }
  /**
   * @declare state
   */
  state = {
    idUpdate: 0,
    idDel: 0,
    warning: false
  };
  /**
   * @function showModal
   * @summary show modal for add and edit bank mananger
   */
  showModal = () => {
    this.props.onShowModalDynamic("modalBankMN", true);
  };

  /**
   * @function resetModal
   * @summary reset input filled
   */
  resetModal = () => {
    this.props.form.resetFields();
    this.setState({
      idUpdate: 0,
      idDel: 0
    });
  };
  /**
   * @function hideModal
   * @summary hide Modal
   */
  hideModal = () => {
    this.props.onShowModalDynamic("modalBankMN", false);
    this.resetModal()
  };

  /**
   * @function handleSubmitForm
   * @summary submit form create or edit bank
   * @output create or edit bank
   */
  handleSubmitForm = () => {
    const { form } = this.props,
      { idUpdate } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        const data = {
          account_name: values.account_name,
          account_number: values.account_number,
          account_address: values.account_address,
          account_code: values.account_code
        };
        if (idUpdate !== 0) {
          // update
          data.id = idUpdate;
          this.props.onUpdateBank(data);
        } else {
          // create
          this.props.onCreateBank(data);
        }
      }
    });
  };

  /**
   * @function getDataForTable
   * @summary get data for show table
   * @input array data list bank
   * @output array data list bank customized
   */
  getDataForTable = data => {
    let result = [];
    if (data.banks) {
      data.banks.map((obj, index) => {
        result.push({
          key: index + 1,
          obj
        });
      });
    }
    return result;
  };

  /**
   * @function showEdit
   * @summary show form edit and field data
   */
  showEdit = (e, record) => {
    e.preventDefault();
    const { form } = this.props;
    form.setFieldsValue({
      account_code: record.obj.account_code,
      account_name: record.obj.account_name,
      account_address: record.obj.account_address,
      account_number: record.obj.account_number
    });
    this.setState({
      idUpdate: record.obj.id
    });
    this.props.onShowModalDynamic("modalBankMN", true);
  };
  /**
   * @function showAlert
   * @summary confirm delete record
   */
  showAlert = (e, record) => {
    e.preventDefault();
    this.setState({
      warning: true,
      idDel: record.obj.id
    });
  };

  /**
   * @function onDeleteRecord
   * @summary delete record
   */
  onDeleteRecord = () => {
    this.setState({ warning: false });
    this.props.onDeleteBank(this.state.idDel);
  };

  /**
   * @function onCancelDelRecord
   */
  onCancelDelRecord = () => this.setState({ idDel: 0, warning: false });

  render() {
    const { getFieldDecorator } = this.props.form,
      { userData } = this.props;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key"
      },
      {
        title: "Name",
        dataIndex: "obj.account_name",
        key: "obj.account_name"
      },
      {
        title: "Number",
        dataIndex: "obj.account_number",
        key: "obj.account_number"
      },
      {
        title: "Address",
        dataIndex: "obj.account_address",
        key: "obj.account_address"
      },
      {
        title: "Bank",
        dataIndex: "obj.account_code",
        key: "obj.account_code"
      },
      {
        title: "Action",
        dataIndex: "index",
        key: "action",
        width: "3%",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              <a onClick={e => this.showEdit(e, record)}>
                <i className="icon icon-edit" />
              </a>
              <a onClick={e => this.showAlert(e, record)}>
                <i className="icon icon-trash" />
              </a>
            </div>
          );
        }
      }
    ];
    return (
      <div className="manage-bank">
        <div className="header-bank">
          <Button type="primary" icon="plus" onClick={this.showModal}>
            Add Bank
          </Button>
        </div>
        <div className="table-bank">
          <Table
            dataSource={this.getDataForTable(userData)}
            columns={columns}
          />
        </div>
        <SweetAlert
          show={this.state.warning}
          warning
          showCancel
          confirmBtnText={<IntlMessage id="sweetAlerts.continue" />}
          cancelBtnText={<IntlMessage id="sweetAlerts.Cancel" />}
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default"
          title={<IntlMessage id="sweetAlerts.areYouSure" />}
          onConfirm={this.onDeleteRecord}
          onCancel={this.onCancelDelRecord}
        />
        <Modal
          visible={this.props.generalData.modalBankMN}
          title="ACCOUNT BANK"
          onOk={this.handleSubmitForm}
          onCancel={this.hideModal}
          footer={[
            <Button key="back" onClick={this.hideModal}>
              <IntlMessage id="modalPackage.Cancel" />
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.props.generalData.loadingBTN}
              onClick={this.handleSubmitForm}
            >
              <IntlMessage id="modalPackage.Save" />
            </Button>
          ]}
        >
          <Form layout="vertical">
            <Form.Item>
              {getFieldDecorator("account_name", {
                rules: [
                  {
                    required: true,
                    message: <IntlMessage id="modalPackage.Form.Err.Required" />
                  }
                ]
              })(<Input placeholder="Account name" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("account_number", {
                rules: [
                  {
                    required: true,
                    message: <IntlMessage id="modalPackage.Form.Err.Required" />
                  }
                ]
              })(<Input placeholder="Account number" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("account_address", {
                rules: [
                  {
                    required: true,
                    message: <IntlMessage id="modalPackage.Form.Err.Required" />
                  }
                ]
              })(<Input placeholder="Bank branch" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("account_code", {
                rules: [
                  {
                    required: true,
                    message: <IntlMessage id="modalPackage.Form.Err.Required" />
                  }
                ]
              })(<Input placeholder="Bank name" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(Index);
