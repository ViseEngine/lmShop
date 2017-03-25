import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Tabs,
  Button,
  ListView
} from 'antd-mobile';
import * as timeBuyApi from '../api/timeBuy';
import { Img } from 'commonComponent';
import { common } from 'common';

import './timeBuy.less';

const TabPane = Tabs.TabPane;

class TimeBuy extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      qiangClass: [],
      defaultActiveClass: props.params.activityClass,
      dataSource: this.ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    // 获取分类TAB
    timeBuyApi.flashSaleApiList({
      activityClass: this.state.defaultActiveClass,
      pageNo: 1,
      activityType: 60,
      pageSize: 1,
    }).then(result => {
      if (result.result == 1) {
        const qiangClass = result.data[0].qiangClass
        if (qiangClass && qiangClass.length > 0) {
          this.setState({
            qiangClass
          });
          this.onTabChange(this.state.defaultActiveClass);
        }
      }
    })
  }

  onTabChange = (activityClass) => {
    timeBuyApi.flashSaleApiList({
      activityClass,
      pageNo: 1,
      activityType: 60,
      pageSize: 15
    }).then(result => {
      if (result.result == 1) {
        const data = result.data[0]
        this.setState({
          dataSource: this.ds.cloneWithRows(data.goodsList)
        });
      }
    })
  }

  renderItem = (dataItem) => {
    return <Flex>
      <Flex.Item style={{flex:1,paddingLeft:'16px'}}>
        <Img src={dataItem.goodsImage} style={{width:'100%'}}/>
      </Flex.Item>
      <Flex.Item style={{flex:2}}>
        <div style={{width:'100%',height:'100%'}}>
          <div>
            {dataItem.goodsName}
          </div>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <Flex.Item style={{color:'red'}}>{'¥'+dataItem.price}</Flex.Item>
            <Flex.Item style={{textDecoration:'line-through'}}>{'¥'+dataItem.specGoodsPrice}</Flex.Item>
            <Flex.Item style={{ minWidth: '150px', paddingRight: '16px' }}>
              <Button size='small' type='primary' onClick={()=>this.gotoBuy(dataItem)}>马上抢</Button>
            </Flex.Item>
          </Flex>
        </div>  
      </Flex.Item>
    </Flex>
  }

  gotoBuy = (item) => {
    common.gotoGoodsDetail({
      specId: item.goodsSpecId
    })
  }

  renderHeader = () => {
    const { qiangClass, defaultActiveClass, scrollAdv, goodsList } = this.state;
    return <Tabs onChange={this.onTabChange} defaultActiveKey={defaultActiveClass}>
      {
        qiangClass.map((item, index) => {
          return <TabPane tab={item.dictionaryName} key={item.dictionaryValue}>
          </TabPane>    
        })
      }
    </Tabs>
  }

  render() {
    const { qiangClass, defaultActiveClass, scrollAdv, goodsList } = this.state;
    if (qiangClass.length == 0) {
      return null;
    }
    return <div>
      {this.renderHeader()}
      <WhiteSpace></WhiteSpace>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        stickyHeader
        delayTime={10}>
      </ListView>
    </div>
  }
}

export default withRouter(TimeBuy);
