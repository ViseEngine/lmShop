import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import { List, Flex, Toast } from 'antd-mobile';
import * as storeApi from '../api/store';

import './CouponList.less';

class CouponList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  /**
   * 点击领券
   */
  onSel = (sel) => {
    // console.log(sel);
    storeApi.receiveCoupon({
      couponId: sel.id,
      storeId: sel.shopActivity.storeId
    }).then(result => {
      Toast.info(result.msg);
    })
  };

  render() {
    if (!this.props.storeId) {
      return null;
    }
    const { couponList } = this.props;
    return <div className='wx-CouponList'>
      <List renderHeader={() => '店铺优惠券'}>
      {
        couponList && couponList.map(item => {
          return <List.Item key={item.id} onClick={() => { this.onSel(item); }}>
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
    </div>
  }
}

export default CouponList;
