import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Carousel,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  Card,
  Grid,
  Popup
} from 'antd-mobile';
import * as goodsDetailApi from '../api/goodsDetail';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import CouponList from '../components/CouponList';
import GoodsMoreInfo from '../components/GoodsMoreInfo';
import GoodsList from '../components/GoodsList';
import StoreInfo from '../components/StoreInfo';
import GoodsSpec from '../components/GoodsSpec';
import EvaluateGoodsList from '../components/EvaluateGoodsList';
import { Map } from 'immutable'

import './goodsDetail.less';

class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsDetailInfo: Map(),
      buyCount: 1
    }
    // 获取URL参数
    if (this.props.location.query) {
      if (this.props.location.query.specId) {
        this.specId = this.props.location.query.specId;
      }
    }
  }

  componentDidMount() {
    Toast.loading();
    // 获取商品详情
    goodsDetailApi.goodsdetail({ specId: this.specId }).then(result => {
      Toast.hide();
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }
      const goodsDetailInfo = Map(result.data[0]);
      // alert(JSON.stringify(goodsDetailInfo));
      this.setState({
        goodsDetailInfo
      });

      // 登录后才上报 浏览记录
      if (common.isLogin()) {
        setTimeout(function() {
          goodsDetailApi.goodsBrowseSaveOrUpdate({
            goodsId: goodsDetailInfo.get('goodsId')
          });
        }, 100);
      }

    });
  }

  /**
   * 点击获取优惠券
   */
  getCoupon = () => {
    const goodsDetailInfo = this.state.goodsDetailInfo.toJS();
    const onMaskClose = () => {
      console.log('关闭遮罩');
    }
    Popup.show(<CouponList storeId={goodsDetailInfo.storeId} onClose={() => Popup.hide()} />, { animationType: 'slide-up', onMaskClose });
  }

  /**
   * 点击获取规格
   */
  getSpec = () => {
    const goodsDetailInfo = this.state.goodsDetailInfo.toJS();
    Popup.show(
      <GoodsSpec
        buyCount={this.state.buyCount}  
        onChangeSpec={this.onChangeSpec}
        onChangeBuyNum={this.onChangeBuyNum}
        goodsDetailInfo={goodsDetailInfo}
        onClose={() => Popup.hide()} />, { animationType: 'slide-up' }
    );
  }

  onChangeBuyNum = (num) => {
    this.setState({
      buyCount: num
    });
  }

  // 收藏
  storecollection = () => {
    alert('收藏');
  }
  // 去购物车
  gotoCart = () => {
    alert('去购物车');
  }
  // 加入购物车处理
  addCart = () => {
    alert('加入购物车');
  }
  // 立即购买
  gotoBuy = () => {
    alert('立即购买');
  }

  // 修改规格处理
  onChangeSpec = (currentSpecs, data) => {
    // 同步数据
    const newGoodsDetailInfo = this.state.goodsDetailInfo.update('goodsSpec', (item) => {
      item.specGoodsStorage = data.num;
      item.specGoodsPrice = data.price;
      item.specGoodsSpec = currentSpecs;
      item.goodsSpecId = data.goodsSpecId;
      return item;
    })
    // 记录已选的规格ID，加购物车的时候需要
    this.specId = data.specId
    this.setState({
      goodsDetailInfo: newGoodsDetailInfo,
    })
  }

  render() {
    const goodsDetailInfo = this.state.goodsDetailInfo.toJS();
    if (!goodsDetailInfo || !goodsDetailInfo.goodsCallyList) {
      return null;
    }
    console.log('render', goodsDetailInfo.goodsSpec.specGoodsSpec);

    // 获取规格组合名
    const vals = Object.keys(goodsDetailInfo.goodsSpec.specGoodsSpec).map(function(key) {
      return goodsDetailInfo.goodsSpec.specGoodsSpec[key];
    });
    const selectedSpecGoodsSpec = vals.join(' ');
    return (
      <div className='wx-goods-detail'>
        <Carousel autoplay={false} infinite dots={false}>
          {
            goodsDetailInfo.goodsCallyList.map((item,index) => (
                <Img key={index} src={item} />
            ))
          }
        </Carousel>
        <Flex className='wx-goods-detail-info' direction='column' align='start'>
          <WingBlank>
            <Flex.Item>{goodsDetailInfo.goodsName}</Flex.Item>
            <WhiteSpace size="lg" />
            <Flex.Item>{goodsDetailInfo.goodsSubtitle}</Flex.Item>
            <WhiteSpace size="lg" />
            <Flex.Item>{`¥${goodsDetailInfo.goodsSpec.specGoodsPrice}`}</Flex.Item>
          </WingBlank>
        </Flex>

        <List>  
          <List.Item arrow="horizontal" onClick={this.getCoupon}>
            领券猛戳这里
          </List.Item>
          <List.Item arrow="horizontal" onClick={this.getSpec}>
            已选：{selectedSpecGoodsSpec}
          </List.Item>
          <List.Item>
            所在地区：{goodsDetailInfo.cityName}
          </List.Item>
          <List.Item>
            运费：卖家承担运费
          </List.Item>
        </List>
        <EvaluateGoodsList goodsDetailInfo={goodsDetailInfo}></EvaluateGoodsList>
        <WhiteSpace></WhiteSpace>
        <StoreInfo goodsDetailInfo={goodsDetailInfo}></StoreInfo>
        <WhiteSpace></WhiteSpace>
        <GoodsList goodsDetailInfo={goodsDetailInfo}></GoodsList>
        <GoodsMoreInfo goodsDetailInfo={goodsDetailInfo}></GoodsMoreInfo>
        <CartBar storecollection={this.storecollection}
          gotoCart={this.gotoCart}
          gotoBuy={this.gotoBuy}
          addCart={this.addCart}
        ></CartBar>
      </div>
    )
  }
}

export default withRouter(GoodsDetail);
