import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Modal,
  Toast,
  Flex,
  Button,
  Radio,
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
const RadioItem = Radio.RadioItem;

class CartShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      checked: false
    }
  }

  // 领券  
  getCoupon = (shop) => {
    Modal.alert('提示', '确定要删除吗', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          this.props.getCoupon(shop);
        }
      },
    ]);
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
  updateCart = (goods) => {

  }

  // 选择购物车
  checkCart = (goods) => {

  }
  // 选中店
  checkShop = (storeId, e) => {
    // console.log(storeId);
    // console.log(e);

    this.setState({
      checked: e.target.checked
    });
  }

  renderHeader = () => {
    const { checked, storeName, storeId } = this.state;
    console.log(checked);
    return <Flex>
      <Radio className="my-radio" checked={checked}
        onChange={(e)=>this.checkShop(storeId,e)}
      >{storeName}</Radio>
      <Icon type='right' />
      <Flex.Item style={{ textAlign: 'right' }}>
        <Button size='small' inline onClick={()=>this.getCoupon(storeId)}>领券</Button>
        <Button size='small' inline onClick={()=>this.delShopCart(storeId)}>删除</Button>
      </Flex.Item>
    </Flex>
  }

  componentDidMount() {}

  render() {
    const { data } = this.props;
    return <List renderHeader={this.renderHeader}>
      {
        data.list.map((goods,index) => {
          return <Item key={index}>
            <Flex style={{fontSize:'24px'}}>
              <Radio className="my-radio" onChange={e => console.log('checkbox', e)}></Radio>
              <Img src={goods.goodsImages} style={{ height: '1rem', width: '1rem' }} />
              <Flex.Item>
                <div className='text-overflow-hidden'>{goods.goodsName}</div>
                <div className='text-overflow-hidden'>{goods.specInfo}</div>
                <Flex>
                  <div>{goods.goodsPrice}</div>
                  <Flex.Item style={{textAlign:'right'}}>
                    <Stepper showNumber min={1} defaultValue={goods.goodsNum} />
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
