import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as orderApi from '../api/order';
import {
  WhiteSpace,
  WingBlank,
  Flex,
  ListView,
  Button,
  Modal
} from 'antd-mobile';

export default class OrderItem extends Component {

  cancelOrder = (orderItem) => {
    Modal.alert('提示', '是否取消订单', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          orderApi.cancleorder({
            ordersn: orderItem.orderSn
          }).then(result => {
            if (result.result == 1) {
              // 取消成功
              if (this.props.cancelOrder) {
                this.props.cancelOrder();
              }
            }
          })
        }
      },
    ]);
  }

  gotoPay = (orderItem) => {
    // common.
    // if (this.props.gotPay) {
    //   this.props.gotPay();
    // }
  }

  gotoOrderDetail = (orderItem) => {
    console.log(orderItem);
  }

  render() {
    const { dataItem } = this.props;
    let orderStatus = '';
    let showCancelBtn = false;
    let showPayBtn = false;

    switch (dataItem.orderState) {
      case 0:
        orderStatus = '已取消'
        break;
      case 10:
        orderStatus = '待支付'
        showPayBtn = true;
        break;
      case 20:
        orderStatus = '等待发货'
        break;
      case 30:
        orderStatus = '待收货'
        break;
      case 40:
        orderStatus = '买家确认收货'
        break;
      case 50:
        orderStatus = '已提交'
        break;
      case 60:
        orderStatus = '待发货'
        break;
      default:
        break;
    }
    return <div className='orderitem'>
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Flex justify='between'>
          <div>{dataItem.storeName}</div>
          <div className="paystaus">{orderStatus}</div>
        </Flex>
        {
          dataItem.orderGoodsList.map(goods => {
            return <Flex key={goods.specId}>
              <Img src={goods.goodsImage} style={{ width: '1.5rem' }} />
              <div>
                <p>{goods.goodsName}</p>
                <p dangerouslySetInnerHTML={{ __html: goods.specInfo }}></p>
              </div>
            </Flex>
          })
        }
        <WhiteSpace></WhiteSpace>
        <Flex justify='between'>
          <div>订单总额: {`￥${dataItem.goodsAmount}`}</div>
          <div>
            {
              showCancelBtn && <Button
                onClick={(e) => this.cancelOrder(dataItem)}
                type='ghost' size='small' inline>取消订单</Button>
            }
            {
              showPayBtn && <Button
                onClick={(e) => this.gotoPay(dataItem)}
                style={{ marginLeft: '0.1rem' }} type='ghost' size='small' inline>去支付</Button>
            }
          </div>
        </Flex>
        <WhiteSpace></WhiteSpace>
      </WingBlank>
      <WhiteSpace style={{ backgroundColor: '#ebebef' }}></WhiteSpace>
    </div>
  }
}
