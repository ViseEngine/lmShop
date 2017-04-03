import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as orderApi from '../api/order';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  ListView,
  Button,
  Modal
} from 'antd-mobile';

class AfterSaleOrderItem extends Component {

  cancelOrder = (orderItem) => {
    console.log(orderItem);
    // Modal.alert('提示', '是否取消订单', [
    //   { text: '取消' },
    //   {
    //     text: '确定',
    //     onPress: () => {
    //       orderApi.cancleorder({
    //         ordersn: orderItem.orderSn
    //       }).then(result => {
    //         if (result.result == 1) {
    //           // 取消成功
    //           if (this.props.cancelOrder) {
    //             this.props.cancelOrder();
    //           }
    //         }
    //       })
    //     }
    //   },
    // ]);
  }

  gotoApply = (orderItem) => {
    this.props.router.push({
      pathname: '/commentList',
      state: {
        orderItem
      }
    })
  }

  gotoOrderDetail = (goods) => {
    this.props.router.push('/orderDetail/' + goods.orderId)
  }

  render() {
    const { dataItem } = this.props;
    let orderStatus = '';
    let showCancelBtn = false;
    let showApplyBtn = false;

    switch (dataItem.orderState) {
      case 20:
        orderStatus = '等待发货'
        showCancelBtn = true;
        break;
      case 30:
        orderStatus = '已发货'
        showApplyBtn = true;
        break;
      case 40:
        orderStatus = '已完成'
        showApplyBtn = true;
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
            return <Flex key={goods.specId} onClick={()=>this.gotoOrderDetail(goods)}>
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
          <div>实付款: {`￥${dataItem.goodsAmount}`}</div>
          <div>
            {
              showCancelBtn && <Button
                onClick={(e) => this.cancelOrder(dataItem)}
                type='ghost' size='small' inline>取消订单</Button>
            }
            {
              showApplyBtn && <Button
                onClick={(e) => this.gotoApply(dataItem)}
                style={{ marginLeft: '0.1rem' }} type='ghost' size='small' inline>申请售后</Button>
            }
          </div>
        </Flex>
        <WhiteSpace></WhiteSpace>
      </WingBlank>
      <WhiteSpace style={{ backgroundColor: '#ebebef' }}></WhiteSpace>
    </div>
  }
}

export default withRouter(AfterSaleOrderItem);
