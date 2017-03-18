import React, { Component } from 'react'
import { TabBar, Icon } from 'antd-mobile';

import "./BottomBar.less"

class BottomBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
    };
  }

  changeTab = (type) => {
    alert(type);
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="首页"
          key="首页"
          icon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(http://bbc.leimingtech.com//res_v4.0/h5/images/b_1.png) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          onPress={()=>this.changeTab('home')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(http://bbc.leimingtech.com//res_v4.0/h5/images/b_3.png) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          title="分类"
          key="分类"
          onPress={()=>this.changeTab('goodsClass')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(http://bbc.leimingtech.com//res_v4.0/h5/images/b_4.png) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          title="购物车"
          key="购物车"
          onPress={()=>this.changeTab('cart')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="我的"
          key="我的"
          onPress={()=>this.changeTab('my')}
        >
        </TabBar.Item>
      </TabBar>
    );
  }
}

export default BottomBar;
