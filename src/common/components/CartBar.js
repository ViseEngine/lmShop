import React, { Component } from 'react'
import { common } from 'common';
import { Grid, Flex, List, WhiteSpace, Button } from 'antd-mobile';

import "./CartBar.less"

class CartBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='wx-cartbar'>
        <Flex style={{ width:'100%'}}>
          <Flex.Item style={{ flex: 1,textAlign:'center'}}>
            <img src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/b_1.png`} style={{width:'44px',height:'44px'}} alt=""/>   
            <div>收藏</div>
          </Flex.Item>
          <Flex.Item style={{flex:1,textAlign:'center'}}>
            <img src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/b_3.png`} style={{width:'44px',height:'44px'}} alt=""/>   
            <div>购物车</div>
          </Flex.Item>
          <Flex.Item style={{flex:2}}>
            <Button type='primary'>添加购物车</Button>
          </Flex.Item>
          <Flex.Item style={{flex:2}}>
            <Button type='primary'>立即购买</Button>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default CartBar;
