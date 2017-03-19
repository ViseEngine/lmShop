import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Carousel, Modal, SearchBar, WhiteSpace, WingBlank, Toast, Flex, Button } from 'antd-mobile';
import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';
import * as goodsApi from 'common/api/goods';
import { common } from 'common';

import './cart.less';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   classList: [],
      relGoodsRecommedlist: []
    }
  }

  componentDidMount() {
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

  render() {
    return <div>
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Button inline size="small">登录</Button>
      </WingBlank>
      <div style={{ padding:'20px 20px' }}>
        <img src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/b_3.png`}></img>
        <span style={{fontSize: '28px',color:'gray'}}>购物车是空的</span>
      </div>
      <div>
        <RecommendGoods data={this.state.relGoodsRecommedlist}></RecommendGoods>
      </div>
    </div>
    /*<div className="wx-goodsClass">
      <div className="wx-goodsClass-menu">
        <GoodsClassMenu data={this.state.classList} onMenuChange={this.onMenuChange}></GoodsClassMenu>
      </div>
      <div className="wx-goodsClass-list">
        <GoodsList data={this.state.goodsList}></GoodsList>
      </div>
    </div>*/
  }
}

export default withRouter(Cart);
