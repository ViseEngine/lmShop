import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Carousel, Modal, SearchBar, WhiteSpace, WingBlank, Toast, Flex } from 'antd-mobile';
import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';
import * as goodsApi from 'common/api/goods';

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
      // console.log(result);
      let data = result.data;
      this.setState({
        relGoodsRecommedlist: data
      });
    });
  }

  render() {
    return <div>
      <div>
       登录
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
