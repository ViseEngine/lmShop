import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  Icon,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Grid,
  Button
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as memberApi from '../../api/member';
import './accountSafe.less';

const Item = List.Item;

class AccountSafe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberDetail: null
    }
  }

  componentDidMount() {}

  render() {
    return <div className="wx-accountSafe">
      <List>
        <Item arrow="horizontal">修改密码</Item>
        <Item arrow="horizontal">支付密码设置</Item>
      </List>
    </div>
  }
}

export default withRouter(AccountSafe);
