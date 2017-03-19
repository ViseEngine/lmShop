import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Carousel, Modal, SearchBar, WhiteSpace, WingBlank, Toast, Flex } from 'antd-mobile';
import { Img } from 'commonComponent';

import './my.less';

class My extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   classList: [],
    //   goodsList: []
    // }
  }

  componentDidMount() {
    // goodsClassApi.queryClasslist().then(result => {
    //   // Toast.hide();
    //   if (result.result != 1) {
    //     Toast.error(result.msg);
    //     return;
    //   }

    //   let data = result.data;
    //   this.setState({
    //     classList: data
    //   });

    //   if (data && data.length > 0) {
    //     this.onMenuChange(data[0]);
    //   }
    // });
  }

  render() {
    return <div>
      <div>
       登录
      </div>
      <div>关注</div>
      <div>我的订单</div>
      <div>我的钱包</div>
      <div>账户管理</div>
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

export default withRouter(My);
