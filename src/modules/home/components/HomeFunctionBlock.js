import React, { Component } from 'react';
import { Grid, Flex } from 'antd-mobile';

import './HomeFunctionBlock.less';

class HomeFunctionBlock extends React.PureComponent {

  jumpHandle = () => {

  }

  render() {
    const url = 'http://bbc.leimingtech.com/'
    const data = [{
        icon: `${url}/res_v4.0/h5/images/i_1.png`,
        text: `分类`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_2.png`,
        text: `购物车`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_3.png`,
        text: `关注的商品`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_4.png`,
        text: `关注的店铺`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_5.png`,
        text: `浏览记录`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_6.png`,
        text: `退换货`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_7.png`,
        text: `积分`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_8.png`,
        text: `优惠券`,
      },
      {
        icon: `${url}/res_v4.0/h5/images/i_8.png`,
        text: `圈子`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_8.png`,
        text: `资讯`,
      }
    ]

    return (
      <Grid data={data} columnNum={5} hasLine={false} />
    )
  }
}

export default HomeFunctionBlock;
