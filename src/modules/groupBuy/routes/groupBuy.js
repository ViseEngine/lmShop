import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Carousel, Modal, SearchBar, WhiteSpace, WingBlank, Toast, Flex } from 'antd-mobile';
import * as groupBuyApi from '../api/groupBuy';

import './groupBuy.less';

class GroupBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: []
    }
  }

  componentDidMount() {
    groupBuyApi.groupPurchaseList({
      activityClass: 20,
      pageNo: 1,
      apKey,
      activityType: 50,
      pageSize: 1,
    }).then(result => {
      console.log(result);
    })
  }

  render() {
    return (
      <div>
        团购
      </div>
    )
  }
}

export default withRouter(GroupBuy);
