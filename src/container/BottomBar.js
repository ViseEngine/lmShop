import React, { Component } from 'react'
import { TabBar, Icon } from 'antd-mobile';

import "./BottomBar.less"

const IconClass = ({ url }) => {
  return <div style={{
    width: '0.50rem',
    height: '0.50rem',
    background: `url(http://bbc.leimingtech.com/${url}) center center /  0.50rem 0.50rem no-repeat`
  }}
  />
}

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
        className="wx-tab-bar"   
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="首页"
          key="首页"
          icon={
            <IconClass url={'/res_v4.0/h5/images/b_1.png'}></IconClass>
          }
          onPress={()=>this.changeTab('home')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={
            <IconClass url={'/res_v4.0/h5/images/b_2.png'}></IconClass>
          }
          title="分类"
          key="分类"
          onPress={()=>this.changeTab('goodsClass')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={
            <IconClass url={'/res_v4.0/h5/images/b_3.png'}></IconClass>
          }
          title="购物车"
          key="购物车"
          onPress={()=>this.changeTab('cart')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={
            <IconClass url={'/res_v4.0/h5/images/b_4.png'}></IconClass>
          }
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
