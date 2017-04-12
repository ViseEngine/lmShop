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
    this.props.router.push({
      pathname: '/applyAfterSale',
      state: {
        orderItem,
        type: 1 // type 1代表取消订单
      }
    })
  }

  gotoApply = (dataItem, goods) => {
    this.props.router.push({
      pathname: '/applyAfterSale',
      state: {
        orderItem: dataItem,
        goodsItem: goods,
        type: 2 // type 2代表申请售后
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
            return <div key={goods.specId} >
              <Flex onClick={() => this.gotoOrderDetail(goods)}>
                <div style={{ width: '1.5rem', height: '1.5rem' }}>
                  <Img src={goods.goodsImage} style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <div>
                  <div style={{
                    marginTop:'0.1rem',
                    height: '0.8rem',
                    lineHeight: '0.4rem',
                    overflow:'hidden'
                  }}>{goods.goodsName}</div>
                  <p style={{fontSize:'.24rem',color:'gray'}} dangerouslySetInnerHTML={{ __html: goods.specInfo }}></p>
                </div>
              </Flex>
              <Flex justify='end'>
              {
                showApplyBtn && <Button
                  onClick={(e) => this.gotoApply(dataItem,goods)}
                  type='ghost' size='small' inline>申请售后</Button>
                }
              </Flex>  
            </div>  
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
          </div>
        </Flex>
        <WhiteSpace></WhiteSpace>
      </WingBlank>
      <WhiteSpace style={{ backgroundColor: '#ebebef' }}></WhiteSpace>
    </div>
  }
}

export default withRouter(AfterSaleOrderItem);
