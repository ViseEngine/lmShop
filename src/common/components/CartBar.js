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

      {
        /*<div className='wx-cartbar'>
                <Flex >
                  <Flex.Item style={{flex:1}}>
                    <div></div>
                    <div>收藏</div>
                  </Flex.Item>
                  <Flex.Item style={{flex:1}}>
                    <div>收藏</div>
                    <div>购物车</div>
                  </Flex.Item>
                  <Flex.Item style={{flex:2}}>
                    <Button>添加购物车</Button>
                  </Flex.Item>
                  <Flex.Item style={{flex:2}}>
                    <Button>立即购买</Button>
                  </Flex.Item>
                </Flex>
              </div>*/
      }
    );
  }
}

export default CartBar;
