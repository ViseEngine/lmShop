import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import {
  Toast,
  Flex,
  Button,
  List,
  WingBlank,
  WhiteSpace,
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
    // storeApi.storedetail({
    //   storeId: this.props.params.storeId
    // }).then(result => {
    //   if (result.result == 1) {
    //     const data = result.data;
    //     this.setState({
    //       goodsList: data.goodsList,
    //       store: data.store[0]
    //     })
    //   }
    // });
  }

  onClick = (dataItem) => {
    // common.gotoGoodsDetail({ specId: dataItem.specId })
  }


  render() {
    const { store, goodsList } = this.state;
    if (!store) {
      return null;
    }
    // const storeBannerShow = `url(${common.IMAGE_DOMAIN}${store.storeBanner}) no-repeat fixed top `;
    return <div className='wx-storegoods'>
      上新
      
    </div>
  }
}

export default withRouter(StoreNewGoods);
