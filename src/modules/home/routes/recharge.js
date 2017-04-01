import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Tabs,
  Flex,
  List,
  InputItem
} from 'antd-mobile';

const Item = List.Item;

class Recharge extends Component {

  state = {
    orderList: [],
    status: ''
  }

  componentWillMount() {}

  render() {
    return (
      <div className="wx-recharge">
        <List>
          <Item>账户余额：¥100000.00</Item>
          <InputItem
            placeholder="点击下方按钮该输入框会获取光标"
          >充值金额</InputItem>
        </List>
      </div>
    )
  }
}

export default withRouter(Recharge);
