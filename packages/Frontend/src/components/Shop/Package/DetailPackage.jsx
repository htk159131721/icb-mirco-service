import React, { Component } from "react";
import { Modal, Skeleton, List, Button } from "antd";
import IntlMessage from "util/IntlMessages"
export default class DetailPackage extends Component {
  state = { visible: false, loading: true, listData: [] };
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  showDetail = data => {
      this.setState({
          visible: true,
          listData: [{
                href: 'javascript:;',
                title: data.title,
                description: data.description,
                content:data.content,
                image: process.env.REACT_APP_URL+data.image
            }]
      }, () => {
        setTimeout(()=>{
            this.setState({loading: false})
        }, 500)
      })
  };
  render() {
    const { loading } = this.state;
    return (
        <Modal
          width = "70%"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer = {[
              <Button onClick={this.handleCancel} key="cancel">
                  <IntlMessage id="modal.Close"/>
              </Button>
          ]}
        >
          <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={
                !loading && (
                  <img
                    width={272}
                    alt="ICB"
                    src={item.image}
                  />
                )
              }
            >
              <Skeleton loading={loading} active avatar>
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                <div dangerouslySetInnerHTML={{__html: item.content}}/>
              </Skeleton>
            </List.Item>
          )}
        />
        </Modal>
    )
  }
}
