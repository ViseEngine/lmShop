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
  Tabs,
  Grid,
  Popup
} from 'antd-mobile';
import * as goodsDetailApi from '../api/goodsDetail';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import CouponList from '../components/CouponList';
const TabPane = Tabs.TabPane;

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

  renderItem = (dataItem) => {
    return <Flex direction='column' >
      <Flex.Item style={{textAlign:'center'}}>
        <Img src={dataItem.goodsImage} style={{ height:'2rem' }} />
      </Flex.Item>
      <Flex.Item>
        <span>{dataItem.gcName}</span> 
      </Flex.Item>
      <Flex.Item>
        <div style={{ fontSize: '24px',width:'3rem', color: 'gray' }} className='text-overflow-hidden'>{dataItem.goodsName}</div>
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'24px',color:'red'}}>{`¥${dataItem.goodsStorePrice}`}</span>
      </Flex.Item>
    </Flex>
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
        <WingBlank>
        <Flex>
          <Flex.Item style={{ flex: 1 }}>
            <Img src={goodsDetailInfo.storeLabel} style={{width:'100%'}}></Img>
          </Flex.Item>
          <Flex.Item style={{ flex: 2 }}>
            <Flex>
                <Flex.Item style={{ flex: 2 }}><div>衣品天成<br/><font color='gray'>正品行货,欢迎选购</font></div></Flex.Item>
                <Flex.Item style={{ flex: 1 }}><div style={{color:'red',textAlign:'right'}}>4.93</div></Flex.Item>
            </Flex>  
          </Flex.Item>
        </Flex>
        <WhiteSpace></WhiteSpace>  
        <Flex>
          <Flex.Item>
              <Flex direction='column'>
                <Flex.Item>商品3.0</Flex.Item>
                <Flex.Item>2</Flex.Item>
                <Flex.Item>关注人数</Flex.Item>
              </Flex>
          </Flex.Item>
           <Flex.Item>
              <Flex direction='column'>
                <Flex.Item>服务5.0</Flex.Item>
                <Flex.Item>48</Flex.Item>
                <Flex.Item>全部商品</Flex.Item>
              </Flex>
           </Flex.Item>
           <Flex.Item>
              <Flex direction='column'>
                <Flex.Item>物流4.8</Flex.Item>
                <Flex.Item>149</Flex.Item>
                <Flex.Item>店铺动态</Flex.Item>
              </Flex>
          </Flex.Item>  
          </Flex>
        <WhiteSpace></WhiteSpace>  
        <Flex>
            <Flex.Item><Button>联系客服</Button></Flex.Item>
            <Flex.Item><Button>进入店铺</Button></Flex.Item>
        </Flex>  
        </WingBlank>  
        <WhiteSpace></WhiteSpace>
        <Tabs defaultActiveKey="1">
          <TabPane tab="猜你喜欢" key="1">
            {
              this.state.goodsDetailInfo.recommendList &&
              <Grid hasLine={false}
                renderItem={(dataItem, index) => (this.renderItem(dataItem))}
                data={this.state.goodsDetailInfo.recommendList} columnNum={3} >
            </Grid>
            }
          </TabPane>
          <TabPane tab="排行榜" key="2">
            {
              this.state.goodsDetailInfo.orderList &&
              <Grid hasLine={false}
                renderItem={(dataItem, index) => (this.renderItem(dataItem))}
                data={this.state.goodsDetailInfo.orderList} columnNum={3} >
            </Grid>
            }
          </TabPane>
        </Tabs>
        <CartBar></CartBar>
      </div>
    )
  }
}

export default withRouter(GoodsDetail);
