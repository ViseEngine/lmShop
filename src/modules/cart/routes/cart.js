import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  Checkbox
} from 'antd-mobile';
import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';
import CartShop from '../components/CartShop';
import * as goodsApi from 'common/api/goods';
import * as cartApi from '../api/cart';
import { common } from 'common';

const AgreeItem = Checkbox.AgreeItem;

import './cart.less';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relGoodsRecommedlist: [],
      cartList: [],
      isInit: false,
      checkAll: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    Toast.loading();
    cartApi.cartList().then(result => {
      Toast.hide();
      if (result.result == 1) {
        this.setState({
          isInit: true,
          cartList: result.data || []
        })
      }
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

  // 选择购物车
  checkGoods = (checkedStore, checkedGoods, checked) => {
    // 遍历当前店铺的所有商品
    const mapedList = checkedStore.list.map(goods => {
      if (checkedGoods.goodsId == goods.goodsId) {
        goods.checked = checked;
      }
      return goods
    })

    let isAllGoodsChecked = true;
    // 当前店铺商品 checked 不存在false,
    if (mapedList.find(item => !item.checked)) {
      isAllGoodsChecked = false;
    }

    const cartList = this.state.cartList.map(shop => {
      if (checkedStore.storeId == shop.storeId) {
        shop.list = mapedList;
        shop.checked = isAllGoodsChecked;
      }
      return shop;
    })

    let isCheckAll = true;
    if (cartList.find(shop => !shop.checked)) {
      isCheckAll = false;
    }
    this.setState({
      checkAll: isCheckAll,
      cartList
    });
  }

  // 选中店
  checkShop = (store, checked) => {
    const cartList = this.state.cartList.map(shop => {
      if (store.storeId == shop.storeId) {
        shop.checked = checked;
        const mapedList = shop.list.map(goods => {
          goods.checked = checked;
          return goods;
        })
        shop.list = mapedList;
      }
      return shop;
    })
    let isCheckAll = false;
    const checkedShopCount = cartList.filter(item => item.checked).length;
    if (checkedShopCount == cartList.length) {
      isCheckAll = true;
    }
    this.setState({
      checkAll: isCheckAll,
      cartList
    });
  }

  checkAll = (checked) => {
    const cartList = this.state.cartList.map(shop => {
      shop.checked = checked;
      const mapedList = shop.list.map(goods => {
        goods.checked = checked;
        return goods;
      })
      shop.list = mapedList;
      return shop;
    })
    this.setState({
      checkAll: checked,
      cartList: cartList
    });
  }

  render() {
    const isLogin = common.isLogin();
    const { cartList, isInit } = this.state;
    if (!isInit) {
      return null;
    }
    return <div>
      <WhiteSpace></WhiteSpace>
      {
        !isLogin && <WingBlank>
          <Button inline size="small" onClick={this.gotoLogin}>登录</Button>
        </WingBlank>
      }
      {
        cartList && cartList.map((shop,index) => {
          return <CartShop
            key={index}  
            data={shop}
            checkShop={this.checkShop}
            checkGoods={this.checkGoods}
          >
          </CartShop>
        })
      }
      {
        cartList.length == 0 && 
          <div style={{ padding:'20px 20px' }}>
            <img src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/b_3.png`}></img>
            <span style={{fontSize: '28px',color:'gray'}}>购物车是空的</span>
          </div>
      }
      
      <div>
        <RecommendGoods data={this.state.relGoodsRecommedlist}></RecommendGoods>
      </div>
      
      <div className='wx-cart-list-bar'>
        <Flex>
          <Flex.Item>
            <AgreeItem checked={this.state.checkAll}
              onChange={(e)=>this.checkAll(e.target.checked)}
              >全选</AgreeItem>
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
