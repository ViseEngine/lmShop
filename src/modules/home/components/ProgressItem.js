import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as orderApi from '../api/order';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  ListView,
  Button,
  Modal,
  List
} from 'antd-mobile';

const Item = List.Item;

class ProgressItem extends Component {

  gotoProgressDetail = (orderItem) => {

  }

  onChange = (index) => {

  }

  render() {
    return <div className='progressItem'>
      <SegmentedControl
          className='orderlist-header'  
          tintColor={'#ff0000'}
          onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex)}
          selectedIndex={selectedIndex}
          values={['退款退货列表', '换货列表']} />
      <List>
        <Item>
          <Flex>
            <div>1111</div>
            <Button type='ghost' inline>进度查询</Button>
          </Flex>
        </Item>
        <Item>
          <p>12212121</p>
          <p>12212121</p>
          <p>12212121</p>
          <Flex justify='end'>
            <Button inline>退款详情</Button>
          </Flex>
        </Item>
      </List>
    </div>
  }
}

export default withRouter(ProgressItem);
