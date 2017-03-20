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
  Card
} from 'antd-mobile';
import * as goodsDetailApi from '../api/goodsDetail';
import { Img } from 'commonComponent';
import { common } from 'common';

import './goodsDetail.less';

class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsDetailInfo: {}
    }
    // 获取URL参数
    // http://localhost:3000/goodsDetail.html#/?specId=977b1be0ff274adeb4df1821b5f2e5f4
    // console.log(this.props.location);
    if (this.props.location.query) {
      if (this.props.location.query.specId) {
        this.specId = this.props.location.query.specId;
      }
    }
  }

  componentDidMount() {
    Toast.loading();
    // 获取商品详情
    // this.specId = '977b1be0ff274adeb4df1821b5f2e5f4';
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
    });

    // goodsDetailApi.cartList().then(result => {
    //   Toast.hide();
    //   if (result.result != 1) {
    //     Toast.error(result.msg);
    //     return;
    //   }
    // });

    // goodsDetailApi.GoodsBrowseSaveOrUpdate().then(result => {
    //   Toast.hide();
    //   if (result.result != 1) {
    //     Toast.error(result.msg);
    //     return;
    //   }
    // });
  }

  render() {
    if (!this.state.goodsDetailInfo || !this.state.goodsDetailInfo.goodsCallyList) {
      return null;
    }
    const { goodsDetailInfo } = this.state
    return (
      <div className='wx-goods-detail'>
        <Carousel autoplay={false} infinite dots={true}>
          {
            this.state.goodsDetailInfo && this.state.goodsDetailInfo.goodsCallyList.map((item,index) => (
                <Img key={index} src={item} />
            ))
          }
        </Carousel>
        <Flex direction='column' align='start'>
          <Flex.Item>{goodsDetailInfo.goodsName}</Flex.Item>
              <WhiteSpace size="lg" />
              <Flex.Item>{goodsDetailInfo.goodsSubtitle}</Flex.Item>
              <WhiteSpace size="lg" />
          <Flex.Item>{`¥${goodsDetailInfo.goodsStorePrice}`}</Flex.Item>
        </Flex>
        
        <List>  
          <List.Item arrow="horizontal">
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
        <Card>
          <Card.Header
            title="这是 title"
            thumb={`${common.IMAGE_DOMAIN}${goodsDetailInfo.storeLabel}`}
            extra={<span>this is extra</span>}
          />
          <Card.Body>
            <div>这是卡片内容</div>
          </Card.Body>
          <Card.Footer content="这是卡尾" extra={<div>这是尾部介绍</div>} />
        </Card>
      </div>
    )
  }
}

export default withRouter(GoodsDetail);
