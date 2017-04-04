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
    this.props.router.push('/progressDetail/' + orderItem.refundId)
  }

  gotoReturnDetail = (orderItem) => {
    this.props.router.push('/returnDetail/' + orderItem.refundId)
  }

  onChange = (index) => {

  }

  render() {
    const { dataItem } = this.props;
    return <div className='progressItem'>
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Flex justify='between'>
          <div>{dataItem.refundSn}</div>
          <div>
            <Button type='ghost'
              onClick={()=>this.gotoProgressDetail(dataItem)}
              size='small' inline>进度查询</Button>
          </div>
        </Flex>
        <div>
          <p>{dataItem.goodsName}</p>
          <p style={{color:'red'}}>状态: {dataItem.refundState==1?'进行中':''}</p>
          <p style={{color:'#bbb'}}>申请时间: {dataItem.createTimeStr}</p>
          <Flex.Item>
            <Flex justify='end'>
              <Button size='small'
                onClick={()=>this.gotoReturnDetail(dataItem)}
                inline>退款详情</Button>
            </Flex>
          </Flex.Item>
        </div>
      </WingBlank>
      <WhiteSpace></WhiteSpace>
      <WhiteSpace style={{
        height: '0.2rem',
        backgroundColor:'#ebebef'
      }}></WhiteSpace>
    </div>
  }
}

export default withRouter(ProgressItem);
