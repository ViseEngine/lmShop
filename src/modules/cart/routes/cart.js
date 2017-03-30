import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  Radio
} from 'antd-mobile';
import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';
import CartShop from '../components/CartShop';
import * as goodsApi from 'common/api/goods';
import * as cartApi from '../api/cart';
import { common } from 'common';

import './cart.less';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relGoodsRecommedlist: [],
      cartList: []
    }
  }

  componentDidMount() {

    cartApi.cartList().then(result => {
      this.setState({
        cartList: result.data
      })
    })

    goodsApi.relGoodsRecommedlist().then(result => {
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }
      let data = result.data;
      this.setState({
        relGoodsRecommedlist: data
      });
    });
  }

  gotoLogin = () => {
    common.gotoLoginAndBack();
  }

  render() {
    const isLogin = common.isLogin();
    const { cartList } = this.state;
    return <div>
      <WhiteSpace></WhiteSpace>
      {
        !isLogin && <WingBlank>
          <Button inline size="small" onClick={this.gotoLogin}>登录</Button>
        </WingBlank>
      }
      {
        cartList.map((cart,index) => {
          return <CartShop data={cart} key={index}></CartShop>
        })
      }
      
      <div style={{ padding:'20px 20px' }}>
        <img src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/b_3.png`}></img>
        <span style={{fontSize: '28px',color:'gray'}}>购物车是空的</span>
      </div>
      <div>
        <RecommendGoods data={this.state.relGoodsRecommedlist}></RecommendGoods>
      </div>
      <div className='wx-cart-list-bar'>
        <Flex>
          <Flex.Item>
            <Radio className='my-radio'>全选</Radio>
          </Flex.Item>
          <Flex.Item>
            <span>合计：¥0.0</span><br/>
            <span>共0件</span>
          </Flex.Item>
          <Flex.Item style={{textAlign:'right'}}>
            <Button type='primary' inline>去结算</Button>
          </Flex.Item>
        </Flex>
      </div>  
    </div>
  }
}

export default withRouter(Cart);
