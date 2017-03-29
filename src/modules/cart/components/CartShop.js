import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { WhiteSpace, WingBlank, Toast, Flex, Button, Radio, List, Icon, Stepper } from 'antd-mobile';
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
    this.state = {}
  }

  renderHeader = () => {
    const { data } = this.props;
    return <Flex>
      <Radio className="my-radio" onChange={e => console.log('checkbox', e)}>{data.storeName}</Radio>
      <Icon type='right' />
      <Flex.Item style={{ textAlign: 'right' }}>
        <Button size='small' inline>领券</Button>
        <Button size='small' inline>删除</Button>
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
            <Flex>
              <Radio className="my-radio" onChange={e => console.log('checkbox', e)}></Radio>
              <Img src={goods.goodsImages} style={{ height: '1rem', width: '1rem' }} />
              <Flex.Item>
                <div className='text-overflow-hidden'>{goods.goodsName}</div>
                <div className='text-overflow-hidden'>{goods.specInfo}</div>
                <Flex>
                  <div>{goods.goodsPrice}</div>
                  <Flex.Item style={{textAlign:'right'}}>
                    <Stepper
                        showNumber max={10} min={1} defaultValue={3}
                    />
                  </Flex.Item>  
                </Flex>
              </Flex.Item>
            </Flex>
          </Item>
        })
      }  
    </List>
  }
}

export default CartShop;
