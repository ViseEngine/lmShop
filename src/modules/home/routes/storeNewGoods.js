import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import {
  Toast,
  Flex,
  Button,
  List,
  WingBlank,
  WhiteSpace,
  Grid
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as storeApi from '../api/store';
import { common } from 'common';

import './store.less';

const Item = List.Item;

class StoreNewGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
    }
  }

  componentDidMount() {
    storeApi.storegoods({
      order: 'asc',
      orderField: 'new',
      goodsType: 1,
      storeId: this.props.params.storeId
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        this.setState({
          goodsList: data,
        })
      }
    });
  }

  onClick = (dataItem) => {}

  renderItem = (dataItem) => {
    return <Flex direction='column' style={{ padding: '10px' }} >
      <Flex.Item style={{textAlign:'center'}}>
        <Img src={dataItem.goodsImage} style={{ width: '100%' }} />
      </Flex.Item>
      <Flex.Item>
        <span>{dataItem.goodsName}</span> 
      </Flex.Item>
      <Flex.Item>
        <span style={{color:'red'}}>{`¥${dataItem.goodsStorePrice}`}</span>
      </Flex.Item>
    </Flex>
  }

  render() {
    const { goodsList } = this.state;
    return <div className='wx-storegoods'>
      <Grid data={this.state.goodsList} columnNum={2} hasLine={false}
        onClick={(el,index)=>this.onClick(el)}
          renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>
      </Grid>
    </div>
  }
}

export default withRouter(StoreNewGoods);
