import React, { Component } from 'react'
import { withRouter } from 'react-router'
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

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      store: null
    }
  }

  componentDidMount() {
    storeApi.storedetail({
      storeId: this.props.params.storeId
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        this.setState({
          goodsList: data.goodsList,
          store: data.store[0]
        })
      }
    });
  }

  storecollection = () => {
    storeApi.storecollection({
      storeId: this.props.params.storeId,
      favType: 2,
      goodsId: null
    }).then(result => {
      if (result.result == 1) {
        Toast.info(result.msg);
        const store = {
          ...this.state.store,
          isFav: result.isfav
        };
        this.setState({
          store
        })
      }

    });
  }

  render() {
    const { store, goodsList } = this.state;
    if (!store) {
      return null;
    }

    const storeCodeShow = <Img src={store.storeCode} />;
    const storeBannerShow = `url(${common.IMAGE_DOMAIN}${store.storeBanner}) no-repeat fixed top `;
    return <div className='wx-store'>
      <WingBlank size='sm'>
        <div style={{ height: '3rem', background: storeBannerShow }}>
          <Flex style={{ position: 'absolute',top:'2rem',height:'1rem', width:'100%'}}>
            <Flex.Item style={{textAlign: 'center'}}>
              <Img src={store.storeLogo} style={{width:'100%'}} />
            </Flex.Item>
            <Flex.Item style={{textAlign: 'center'}}>
              <div>{store.storeName}</div>
              <div>{store.storeCollect}人关注</div>
            </Flex.Item>
            <Flex.Item style={{textAlign: 'center'}}>
            </Flex.Item>
            <Flex.Item style={{textAlign: 'left'}}>
              <Button type='primary' size='small' onClick={this.storecollection}>
                {
                  store.isFav==1?'已关注':'关注'
                }
              </Button>
            </Flex.Item>
          </Flex>
        </div>
        <WhiteSpace></WhiteSpace>
        <div>
          <Flex justify='center'>
            <Flex.Item style={{textAlign: 'center'}}>
              <div>全部</div>
              <div>{store.storeGoodsCount}</div>
            </Flex.Item>
            <Flex.Item style={{textAlign: 'center'}}>
              <div>上新</div>
              <div>{store.newGoodsNum}</div>
            </Flex.Item>
            <Flex.Item style={{textAlign: 'center'}}>
              <div>优惠券</div>
              <div>{store.couponNum}</div>
            </Flex.Item>
            <Flex.Item style={{textAlign: 'center'}}>
              <div>店铺动态</div>
              <div>0</div>
            </Flex.Item>
          </Flex>
        </div>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item extra={store.storeTel}>
            商家电话
          </Item>
          <Item extra={storeCodeShow}>
            店铺二维码
          </Item>
          <Item>
            店铺介绍 <span style={{color:'gray'}}> {store.storeName}</span>
          </Item>
          <Item>
            开始时间 <span style={{color:'gray'}}> {store.createTimeStr}</span> 
          </Item>
          <Item>
            授权品牌
          </Item>
        </List>
      </WingBlank>
    </div>
  }
}

export default withRouter(Store);
