import React, { Component } from "react";
import { Table, Input, Button, Icon, Select } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import Highlighter from "react-highlight-words";

import IntlMessages from "util/IntlMessages";
import {Permission} from "util/Permission"
const { Option } = Select;

export default class ListCatePackage extends Component {
  state = {
    searchText: "",
    warning: false,
    isChangeCate: false,
    idDel: 0
  };
  componentDidMount() {
    const {dataCates} = this.props;
    if(dataCates.catePackages.length <= 0)
      this.props.onGetListCatePackage()
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  /**************************************************************************/
  showAlert = record => {
    this.setState({ warning: true, idDel: record.id });
  };
  onCancelDelete = () => this.setState({ warning: false });
  onDelete = () => {
    this.setState({isChangeCate: false, warning:false})
    this.props.onDeleteCatePackage(this.state.idDel)
  };

  onChangeCate = value => {

  }
  /* modal change cate */
  onChangeAndDel = () => {
    
  }
  onCancelChangeAndDel = () => this.setState({ isChangeCate: false });
  /********************************************** Modal ***********************************************/
  showEdit = (e, record) => {
    e.preventDefault();
    this.props.onShowModalForEdit(record);
  };
  /************************ Table *************************** */
getDataForTable = (data) => {
  let result = [];
  if(data.catePackages){
    data.catePackages.map((obj, index) => {
      result.push({
        key: index+1,
        id: obj.id,
        index: index,
        title: obj.title,
        description: obj.description,
        cateCode: obj.code
      })
    })
  }
  return result;
}
  render() {
    const {dataCates, usersData} = this.props,
      {authUser} = usersData;
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key",
        width: "5%",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.key - b.key
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "Cate Code",
        dataIndex: "cateCode",
        key: "cateCode"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Action",
        dataIndex: "index",
        align: "center",
        key: "action",
        width: "3%",
        render: (text, record) => {
          return (
            <div className="st-acion-tb">
              {
                Permission("salePackageCategoryUpdate", authUser.permissions)
                  ? (
                    <a href="javascript:;" onClick={e => this.showEdit(e, record)}>
                      <i className="icon icon-edit" />
                    </a>
                  )
                  : null
              }
              {
                Permission("salePackageCategoryDelete", authUser.permissions)
                  ? (
                    <a href="javascript:;" onClick={() => this.showAlert(record)}>
                      <i className="icon icon-trash" />
                    </a>
                  )
                  : null
              }
            </div>
          );
        }
      }
    ];
    return (
      <>
        <Table className="st-th-center st-background-header" 
          loading={this.props.generalData.loaderTable}
          pagination={{ pageSize: this.props.generalData.pageSize }}
          columns={columns} 
          dataSource={this.getDataForTable(dataCates)} 
        />
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
        <SweetAlert
          show={this.state.isChangeCate}
          showCancel
          confirmBtnText={<IntlMessages id="sweetAlerts.agree" />}
          cancelBtnText={<IntlMessages id="modalPackage.Cancel" />}
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default"
          title={<IntlMessages id="sweetAlerts.selectCateNew" />}
          onConfirm={this.onChangeAndDel}
          onCancel={this.onCancelChangeAndDel}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            dropdownStyle = {{zIndex: "6500"}}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.onChangeCate}
            defaultValue={'jack'}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </SweetAlert>
      </>
    );
  }
}
