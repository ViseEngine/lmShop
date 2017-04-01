import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Tabs,
  Flex
} from 'antd-mobile';
import * as orderApi from '../api/order';

class OrderList extends Component {

  state = {
    orderList: [],
    status: ''
  }

  refreshList = () => {
    orderApi.orderlist({
      status: this.state.status,
      pageNo: 1,
      orderType: 1
    }).then(result => {
      console.log(result);
    })
  }

  componentWillMount() {
    this.refreshList();
  }

  render() {
    return (
      <div className="wx-orderlist">
        <Tabs swipeable={false} onChange={this.onTabChange} defaultActiveKey={defaultActiveClass}>
          
        </Tabs>
      </div>
    )
  }
}

export default withRouter(OrderList);
