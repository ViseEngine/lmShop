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

import './goodsDetail.less';

class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsDetailInfo: {},
      goodsProperty: '',

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
      const goodsDetailInfo = result.data[0];
      this.setState({
        goodsDetailInfo
      });

      // 浏览记录    
      // setTimeout(function() {
      //   goodsDetailApi.GoodsBrowseSaveOrUpdate({ goodsId: goodsDetailInfo.goodsId }).then(result => {
      //     console.log(object);
      //   });
      // }, 100);

    });

    // goodsDetailApi.cartList().then(result => {
    //   Toast.hide();
    //   if (result.result != 1) {
    //     Toast.error(result.msg);
    //     return;
    //   }
    // });
  }

  /**
   * 点击获取优惠券
   */
  getCoupon = () => {
    const onMaskClose = () => {
      console.log('关闭遮罩');
    }
    Popup.show(<CouponList storeId={this.state.goodsDetailInfo.storeId} onClose={() => Popup.hide()} />, { animationType: 'slide-up', onMaskClose });
  }



  render() {
    if (!this.state.goodsDetailInfo || !this.state.goodsDetailInfo.goodsCallyList) {
      return null;
    }
    const onTabChange = this.onTabChange;
    const { goodsDetailInfo } = this.state

    const storeImg = <Img src={goodsDetailInfo.storeLabel}></Img>
    return (
      <div className='wx-goods-detail'>
        <Carousel autoplay={false} infinite dots={false}>
          {
            this.state.goodsDetailInfo && this.state.goodsDetailInfo.goodsCallyList.map((item,index) => (
                <Img key={index} src={item} />
            ))
          }
        </Carousel>
        <Flex className='wx-goods-detail-info' direction='column' align='start'>
          <Flex.Item>{goodsDetailInfo.goodsName}</Flex.Item>
              <WhiteSpace size="lg" />
              <Flex.Item>{goodsDetailInfo.goodsSubtitle}</Flex.Item>
              <WhiteSpace size="lg" />
          <Flex.Item>{`¥${goodsDetailInfo.goodsStorePrice}`}</Flex.Item>
        </Flex>
        
        <List>  
          <List.Item arrow="horizontal" onClick={this.getCoupon}>
            领券猛戳这里
          </List.Item>
          <List.Item arrow="horizontal">
            已选：蓝色
          </List.Item>
          <List.Item>
            送至：广州市
          </List.Item>
          <List.Item>
            运费：卖家承担运费
          </List.Item>
          <List.Item extra="60.0%好评" arrow="horizontal">
            &nbsp;
          </List.Item>
          <List.Item>
            <Flex>
              <Flex.Item>
                <Button>商品晒单 (0)</Button>
              </Flex.Item>
              <Flex.Item>
                <Button>购买咨询 (9)</Button>
              </Flex.Item>
            </Flex>
          </List.Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <StoreInfo goodsDetailInfo={goodsDetailInfo}></StoreInfo>
        <WhiteSpace></WhiteSpace>
        <GoodsList goodsDetailInfo={goodsDetailInfo}></GoodsList>
        <GoodsMoreInfo goodsDetailInfo={goodsDetailInfo}></GoodsMoreInfo>
        <CartBar></CartBar>
      </div>
    )
  }
}

export default withRouter(GoodsDetail);
