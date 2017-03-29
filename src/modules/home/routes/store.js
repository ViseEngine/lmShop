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

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      store: null,
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

  onClick = (dataItem) => {
    common.gotoGoodsDetail({ specId: dataItem.specId })
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' style={{ padding: '10px' }} >
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
        // console.log(store);
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
    const { params, router } = this.props;
    const storeBannerShow = `url(${common.IMAGE_DOMAIN}${store.storeBanner}) no-repeat fixed top `;
    return <div className='wx-store'>
      <WingBlank size='sm'>
        <div className='wx-store-header' style={{ background: storeBannerShow }}>
          <Flex className='wx-store-header-left'>
            <Flex.Item>
              <Img src={store.storeLogo} style={{width:'100%'}} />
            </Flex.Item>
            <Flex.Item>
              <div>{store.storeName}</div>
              <div>{store.storeCollect}人关注</div>
            </Flex.Item>
            <Flex.Item>
            </Flex.Item>
            <Flex.Item>
              <Button type='primary' size='small' onClick={this.storecollection}>
                {
                  store.isFav==1?'已关注':'关注'
                }
              </Button>
            </Flex.Item>
          </Flex>
        </div>
        <WhiteSpace></WhiteSpace>
        <Flex style={{textAlign: 'center'}}>
          <Flex.Item onClick={()=>
            router.push(`/store/${params.storeId}/goods`)
          }>
            <div>全部</div>
            <div>{store.storeGoodsCount}</div>
          </Flex.Item>
          <Flex.Item onClick={()=>
            router.push(`/store/${params.storeId}/newgoods`)
          }>
            <div>上新</div>
            <div>{store.newGoodsNum}</div>
          </Flex.Item>
          <Flex.Item onClick={()=>
            router.push(`/store/${params.storeId}/coupon`)
          }>
            <div>优惠券</div>
            <div>{store.couponNum}</div>
          </Flex.Item>
          <Flex.Item>
            <div>店铺动态</div>
            <div>0</div>
          </Flex.Item>
        </Flex>
        <WhiteSpace></WhiteSpace>
        <div>
          <Grid data={this.state.goodsList} columnNum={2} hasLine={false}
            onClick={(el,index)=>this.onClick(el)}
              renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>
          </Grid>
        </div>
      </WingBlank>
      
      <div className='wx-store-bar'>
        <Flex style={{ width:'100%',textAlign:'center'}} >
          <Flex.Item>
            <Link to={`/store/${this.props.params.storeId}/detail`}>店铺详情</Link>
          </Flex.Item>
          <Flex.Item onClick={()=> Toast.info('暂无此功能，等待下次开放哦',1)} >
            热门分类
          </Flex.Item>
          <Flex.Item onClick={()=> Toast.info('暂无此功能，等待下次开放哦',1)}>
            联系卖家
          </Flex.Item>
        </Flex>
      </div>
      
    </div>
  }
}

export default withRouter(Store);
