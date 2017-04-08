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
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import CouponList from '../components/CouponList';
import GoodsMoreInfo from '../components/GoodsMoreInfo';
import GoodsList from '../components/GoodsList';
import StoreInfo from '../components/StoreInfo';
import GoodsSpec from '../components/GoodsSpec';
import EvaluateGoodsList from '../components/EvaluateGoodsList';
import { Map } from 'immutable'
import * as goodsDetailApi from '../api/goodsDetail';
import * as cartApi from '../api/cart';

import './goodsDetail.less';

class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsDetailInfo: Map(),
      buyCount: 1,
      cartNum: 0,
      isFav: 0
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
    this.setState({
      cartNum: common.getCartNum()
    });
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
        goodsDetailInfo,
        isFav: goodsDetailInfo.isFav
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

  gotoEvaluateList = (goodsDetailInfo) => {
    this.props.router.push(`/evaluteList/${goodsDetailInfo.goodsId}`);
  }

  gotoConsultation = (goodsDetailInfo) => {
    this.props.router.push(`/consultList/${goodsDetailInfo.goodsId}`);
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
        addCart={this.addCart}  
        gotoBuy={this.gotoBuy}
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
    common.checkLogin();
    const goodsSpec = this.state.goodsDetailInfo.get('goodsSpec')
    goodsDetailApi.storecollection({
      favType: 1,
      goodsId: goodsSpec.goodsId
    }).then(result => {
      if (result.result == 1) {
        if (result.isfav == 1) {
          Toast.info('已收藏');
        }
        this.setState({
          isFav: result.isfav
        });
      } else {
        Toast.fail(result.msg);
      }
    });
  }

  // 去购物车
  gotoCart = () => {
    common.gotoCart();
  }

  // 加入购物车处理
  addCart = (count) => {
    common.checkLogin();
    const goodsSpec = this.state.goodsDetailInfo.get('goodsSpec')
    cartApi.addCart({
      goodsId: goodsSpec.goodsId,
      count: count || 1,
      specId: goodsSpec.goodsSpecId,
      saveType: 0
    }).then(result => {
      if (result.result == 1) {
        const cartCount = result.data[0].cartCount;
        this.setState({
          cartNum: cartCount
        })
        // 同步购物车数量
        common.setCartNum(cartCount);
        Toast.info('商品已添加到购物车');
      } else {
        Toast.fail(result.msg);
      }
    });
  }

  // 立即购买
  gotoBuy = (count) => {
    common.checkLogin();
    const goodsSpec = this.state.goodsDetailInfo.get('goodsSpec')
    // 先加购物车
    cartApi.addCart({
      goodsId: goodsSpec.goodsId,
      count: count || 1,
      specId: goodsSpec.goodsSpecId,
      saveType: 1
    }).then(result => {
      if (result.result == 1) {
        const cartCount = result.data[0].cartCount;
        this.setState({
          cartNum: cartCount
        })
        // 同步购物车数量
        common.setCartNum(cartCount);
        // 跳转到订单确认页面
        common.gotoOrder({
          cartId: result.data[0].cartIds
        });
      } else {
        Toast.fail(result.msg);
      }
    })

  }

  // 修改规格处理
  onChangeSpec = (currentSpecs, data) => {
    // 同步数据
    const newGoodsDetailInfo = this.state.goodsDetailInfo.update('goodsSpec', (item) => {
      item.specGoodsStorage = data.num;
      item.specGoodsPrice = data.price;
      item.specGoodsSpec = currentSpecs;
      item.goodsSpecId = data.specId;
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
        <Carousel autoplay={false} infinite={false} dots={false}>
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
        <EvaluateGoodsList
          gotoEvaluateList={this.gotoEvaluateList}
          gotoConsultation={this.gotoConsultation}
          goodsDetailInfo={goodsDetailInfo}></EvaluateGoodsList>
        <WhiteSpace></WhiteSpace>
        <StoreInfo goodsDetailInfo={goodsDetailInfo}></StoreInfo>
        <WhiteSpace></WhiteSpace>
        <GoodsList goodsDetailInfo={goodsDetailInfo}></GoodsList>
        <GoodsMoreInfo goodsDetailInfo={goodsDetailInfo}></GoodsMoreInfo>
        <CartBar storecollection={this.storecollection}
          isFav={this.state.isFav}  
          cartNum={this.state.cartNum}
          showCollectionCart={true}
          gotoCart={this.gotoCart}
          gotoBuy={this.gotoBuy}
          addCart={this.addCart}
        ></CartBar>
      </div>
    )
  }
}

export default withRouter(GoodsDetail);
