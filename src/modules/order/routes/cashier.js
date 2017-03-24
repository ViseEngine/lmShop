import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  List
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';

const Item = List.Item;

class Cashier extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    // {
    //   "data": [{
    //     "buyerId": "0764fc72e3964c2f89834b65cce18275",
    //     "apiPayState": "0",
    //     "payId": "80cf6eab294f424e85fd0034a1b93af9",
    //     "paySn": "P20170324162551277"
    //   }],
    //   "result": 1,
    //   "msg": "保存成功"
    // }
  }

  gotoPay = (type) => {
    if (type == 1) {

    } else if (type == 2) {

    } else {

    }
  }

  render() {
    const totalPrice = '4503.0'
    const imgUrl = ['/assets/img/WechatIMG96.png',
      '/assets/img/WechatIMG97.png',
      '/assets/img/WechatIMG98.png'
    ];

    return <List renderHeader={`当前订单金额为¥${totalPrice}，请立即在线支付!`}>
      <Item thumb={imgUrl[0]} arrow='horizontal' onClick={()=>this.gotoPay(1)}>微信支付</Item>
      {/*<Item thumb={imgUrl[1]} arrow='horizontal' onClick={()=>this.gotoPay(2)}>支付宝支付</Item>*/}
      <Item thumb={imgUrl[2]} arrow='horizontal' onClick={()=>this.gotoPay(3)}>银联支付</Item>
    </List>
  }
}

export default withRouter(Cashier);
