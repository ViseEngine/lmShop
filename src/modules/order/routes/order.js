import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Carousel, Modal, SearchBar, WhiteSpace, WingBlank, Toast, Flex, Button } from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';

import './order.less';

class Order extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.query) {
      if (this.props.location.query.cartId) {
        this.cartId = this.props.location.query.cartId;
      }
    }
    this.state = {
      relGoodsRecommedlist: []
    }
  }

  componentDidMount() {
    orderApi.subToOrder({ cartId: this.cartId }).then(result => {
      console.log(result);
    })
  }

  render() {
    return <div>
      <WingBlank>

      </WingBlank>
      <div style={{ padding:'20px 20px' }}>
        <img src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/b_3.png`}></img>
        <span style={{fontSize: '28px',color:'gray'}}>购物车是空的</span>
      </div>
      <div>
      </div>
    </div>
  }
}

export default withRouter(Order);
