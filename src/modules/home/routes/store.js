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

  renderItem = (dataItem) => {
    return <Flex direction='column' style={{ padding:'10px'}}>
      <Flex.Item style={{textAlign:'center'}}>
        <Img src={dataItem.goodsImage} style={{ width: '100%' }} />
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'28px'}}>{dataItem.goodsName}</span> 
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'28px',color:'red'}}>{`¥${dataItem.goodsStorePrice}`}</span>
      </Flex.Item>
    </Flex>
  }


  render() {
    const { store, goodsList } = this.state;
    if (!store) {
      return null;
    }
    const storeBannerShow = `url(${common.IMAGE_DOMAIN}${store.storeBanner}) no-repeat fixed top `;
    return <div className='wx-store'>
      <WingBlank size='sm'>
        <div style={{ height: '3rem', background: storeBannerShow }}>
          <Flex style={{ position: 'absolute',top:'2rem',height:'1rem', width:'100%'}}>
            <Flex.Item style={{textAlign: 'center'}}>
              <Img src={store.storeLogo} style={{width:'100%'}} />
            </Flex.Item>
            <Flex.Item style={{textAlign: 'center'}}>
              <div>上新</div>
              <div>{store.newGoodsNum}</div>
            </Flex.Item>
            <Flex.Item style={{textAlign: 'center'}}>
            </Flex.Item>
            <Flex.Item style={{textAlign: 'center'}}>
              <Button type='primary' size='small'>关注</Button>
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
        <div>
          <Grid data={this.state.goodsList} columnNum={2} hasLine={false}
            onClick={(el,index)=>this.onClick(el,data)}
              renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>
          </Grid>
        </div>
      </WingBlank>
    </div>
  }
}

export default withRouter(Store);
