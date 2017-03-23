import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  List,
  Switch
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';
import Shop from '../components/Shop';
import Fee from '../components/Fee';
import OrderBar from '../components/OrderBar';
import { createForm } from 'rc-form';

const Item = List.Item;
const Brief = Item.Brief;

import './order.less';

class Order extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.query) {
      if (this.props.location.query.cartId) {
        this.cartId = this.props.location.query.cartId;
      }
    }
  }

  componentDidMount() {
    orderApi.subToOrder({ cartId: this.cartId }).then(result => {
      if (result.result == 1) {
        this.props.dispatch({
          type: 'init',
          payload: result.data[0]
        })
      } else {
        Toast.fail(result.msg);
      }
    })

    //     export function addShipping({ cartIds, cityId }) {
    //   return fetch.get('/cartapi/subToOrder', {
    //     cartIds,
    //     cityId
    //   });
    // }

    // export function getPrice({
    //   isPd,
    //   freight,
    //   cartIds,
    //   couponId,
    //   cityId,
    // }) {
    //   return fetch.get('/cartapi/getPrice', {
    //     isPd,
    //     freight,
    //     cartIds,
    //     couponId,
    //     cityId,
    //   });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { cartVoList, selectedAddress } = this.props.order;
    console.log(selectedAddress);
    return <div>
      {
        selectedAddress && <List>
          <Item
            arrow="horizontal"
            multipleLine>
            {selectedAddress.mobPhone}&nbsp;&nbsp; {selectedAddress.trueName}
            <Brief>{selectedAddress.address}</Brief>
          </Item>
        </List>
      }
      {
        cartVoList.map((shop,index) => {
          return <Shop key={index} data={shop}></Shop>
        })
      }
      <List>
        <Item
          arrow="horizontal"
          extra={'在线支付'}
          >
          支付方式
        </Item>
        <Item
          arrow="horizontal"
          extra={'2张优惠券'}
          >
          优惠券
        </Item>
        <Item
          extra={<Switch {...getFieldProps('1', { initialValue: true, valuePropName: 'checked' })} />}
        >确认信息</Item>
        <Item
          extra={'0.0'}
        >&nbsp;</Item>
        <Item
          arrow="horizontal"
          extra={'不开发票'}
          >
          发票信息
        </Item>
      </List>
      <WhiteSpace></WhiteSpace>
      <Flex>
        <Flex.Item style={{flex:2.5}}>
          <List>
            <Item extra={`¥4792.00`}>商品总价</Item>
            <Item extra={'4792.00'}>运费</Item>
            <Item extra={'4792.00'}>余额支付</Item>
            <Item extra={'4792.00'}>抵用券</Item>
            <Item extra={'4792.00'}>优惠促销</Item>
          </List>
        </Flex.Item>
        <Flex.Item style={{ flex: 1 }}>
          <div >
            <div>共需支付</div>
            <div>{`¥4792.00`}</div>
          </div>
        </Flex.Item>
      </Flex>
      <OrderBar totalPrice={'0.00'}></OrderBar>
    </div>
  }
}

function mapStateToProps({ order }) {
  return { order };
}

export default withRouter(connect(mapStateToProps)(createForm()(Order)));
