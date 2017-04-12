import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  Toast,
  Flex,
  Button,
  List,
  Checkbox
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';

const Item = List.Item;

import './order.less';

class PaySuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payInfo: null
    }
  }

  componentDidMount() {
    orderApi.getOrderPay({
      paySn: this.props.params.paySn
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          payInfo: result.data[0]
        })
      }
    })
  }

  render() {
    const { payInfo } = this.state;
    if (!payInfo) {
      return null;
    }
    return <div className='wx-pay-result'>
      <List>
        <Item>
          订单编号: {payInfo.paySn}
        </Item>
        <Item>
          订单金额: <span style={{color:'red'}}>{payInfo.orderTotalPrice}</span>
        </Item>
        <Item>
          应付金额: <span style={{color:'red'}}>{payInfo.payAmount}</span>
        </Item>
      </List>
      <div style={{
        paddingTop:'0.2rem',
        height: '1.2rem',
        lineHeight: '0.5rem'
      }}>
        重要提示：雷铭商城不会以订单异常，系统升级为由，要求您点击任何链接进行退款操作
      </div>
      <List>
        <Item>
          您可继续
        </Item>
        <Item onClick={() => {
          window.location.href ='home.html#/orderDetail/'+payInfo.orderId
        }}>
          查询订单
        </Item>
      </List>
    </div>
  }
}

export default withRouter(PaySuccess);
