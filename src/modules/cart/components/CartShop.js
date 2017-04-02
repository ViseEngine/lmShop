import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Modal,
  Toast,
  Flex,
  Button,
  Checkbox,
  List,
  Icon,
  Stepper
} from 'antd-mobile';
import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';
import * as cartApi from '../api/cart';
import { common } from 'common';

import './CartShop.less';
const Item = List.Item;
const AgreeItem = Checkbox.AgreeItem;

class CartShop extends Component {
  constructor(props) {
    super(props);
  }

  // 领券  
  getCoupon = (shop) => {
    this.props.getCoupon(shop);
  }

  // 删除店
  delShopCart = (shop) => {
    Modal.alert('提示', '确定要删除吗', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          this.props.delShopCart(shop);
        }
      },
    ]);
  }

  // 删除购物车商品
  delCart = (goods) => {
    Modal.alert('提示', '确定要删除吗', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          this.props.delCart(goods);
        }
      },
    ]);
  }

  // 更新购物车数量
  updateCart = (store, goods, num) => {
    this.props.updateCart(store, goods, num);
  }

  // 选择购物车
  checkGoods = (store, goods, e) => {
    this.props.checkGoods(store, goods, e.target.checked);
  }
  // 选中店
  checkShop = (store, e) => {
    this.props.checkShop(store, e.target.checked);
  }

  renderHeader = () => {
    const { data } = this.props;
    return <Flex>
      <Checkbox checked={data.checked}
        onChange={(e)=>this.checkShop(data,e)}
      >{data.storeName}</Checkbox>
      <Icon type='right' />
      <Flex.Item style={{ textAlign: 'right' }}>
        <Button size='small' inline onClick={()=>this.getCoupon(data)}>领券</Button>
        <Button size='small' inline onClick={()=>this.delShopCart(data)}>删除</Button>
      </Flex.Item>
    </Flex>
  }

  render() {
    const { data } = this.props;
    return <List renderHeader={this.renderHeader}>
      {
        data.list.map((goods,index) => {
          return <Item key={index}>
            <Flex>
              <Checkbox checked={goods.checked} onChange={e => this.checkGoods(data,goods,e)}></Checkbox>
              <Img src={goods.goodsImages} style={{ height: '1.5rem', width: '1.5rem' }} />
              <Flex.Item>
                <div className='text-overflow-hidden'>{goods.goodsName}</div>
                <p className='text-overflow-hidden' style={{ fontSize: '.24rem',color:'#bbb' }}
                  dangerouslySetInnerHTML={{ __html: goods.specInfo }}>
                </p>
                <Flex>
                  <div>{goods.goodsPrice}</div>
                  <Flex.Item style={{textAlign:'right'}}>
                    <Stepper showNumber min={1} value={goods.goodsNum} onChange={(val)=>this.updateCart(data,goods,val)} />
                  </Flex.Item>
                </Flex>
                <div style={{ textAlign: 'right' }}>
                  <Button size='small' inline onClick={() => this.delCart(goods)}>删除</Button>
                </div>
              </Flex.Item>
            </Flex>
          </Item>
        })
      }  
    </List>
  }
}

export default CartShop;
