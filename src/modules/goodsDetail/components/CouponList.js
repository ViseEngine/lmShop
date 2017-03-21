import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import { List, Flex } from 'antd-mobile';
import * as goodsDetailApi from '../api/goodsDetail';
import * as storeApi from 'common/api/store';

class CouponList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couponList: []
    }
  }

  componentDidMount() {
    console.log(this.props);
    storeApi.couponlist({ storeId: this.props.storeId }).then(result => {
      const data = result.data;
      if (data && data.length > 0) {
        this.setState({
          couponList: data
        });
      }
    })
  }

  /**
   * 点击领券
   */
  onSel = (sel) => {
    // this.setState({ sel });
    this.props.onClose();
  };

  render() {
    if (!this.props.storeId) {
      return null;
    }
    const { couponList } = this.state;
    return <List renderHeader={() => '店铺优惠券'}>
      {
        couponList && couponList.map(item => {
          return <List.Item onClick={() => { this.onSel(item); }}>
            <Flex>
              <Flex.Item>{item.shopActivity.storeName} ({item.couponSource}元)</Flex.Item>
              <Flex.Item>
                <div>会员限制：</div>
                <div>商品限制：</div>
                <div style={{color:'red'}}>{item.description}</div>
                <div>{item.shopActivity.startTimeStr} 至 <br/> {item.shopActivity.endTimeStr}</div>
              </Flex.Item>  
            </Flex>
          </List.Item>
        })  
      }  
    </List>
  }
}

export default CouponList;
