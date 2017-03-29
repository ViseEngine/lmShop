import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import {
  Toast,
  Flex,
  Button,
  ListView,
  WingBlank,
  WhiteSpace,
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import GoodsSearch from '../components/GoodsSearch';
import * as storeApi from '../api/store';

import './store.less';

// const Item = List.Item;

class StoreGoods extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    // storeApi.storegoods({
    //   order: 'desc',
    //   orderField: '',
    //   pageNo: 1,
    //   pageSize: 20,
    //   goodsName: null,
    //   storeId: this.props.params.storeId
    // }).then(result => {
    //   if (result.result == 1) {
    //     const data = result.data;
    //     console.log(data);
    //     // this.setState({
    //     //   goodsList: data.goodsList,
    //     //   store: data.store[0]
    //     // })
    //   }
    // });
  }

  onClick = (dataItem) => {
    // common.gotoGoodsDetail({ specId: dataItem.specId })
  }

  render() {
    const { goodsList } = this.state;
    const data = {
      storeId: this.props.params.storeId,
      goodsName: this.props.params.goodsName
    }
    return <div className='wx-storegoods'>
      <GoodsSearch data={data}></GoodsSearch>
    </div>
  }
}

export default withRouter(StoreGoods);
