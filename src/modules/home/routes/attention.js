import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  Modal,
  WingBlank,
  Toast,
  Tabs,
  List,
  Flex,
  Button
} from 'antd-mobile';
import * as memberApi from '../api/member';
import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';

import './attention.less';

const TabPane = Tabs.TabPane;

class Attention extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      storeList: [],
      recommendGoodsList: []
    }
  }

  componentWillMount() {
    // console.log(this.props.params.type);
    this.onChangeTab(this.props.params.type);

    memberApi.centRecommendList().then(result => {
      this.setState({
        recommendGoodsList: result.data
      })
    })
  }

  onChangeTab = (value) => {
    memberApi.memberfavotites({
      type: value,
      pageno: 1,
      pageSize: 50
    }).then(result => {
      if (result.result == 1) {
        if (value == 1) {
          this.setState({
            goodsList: result.data
          })
        } else {
          this.setState({
            storeList: result.data
          })
        }
      }
    })
  }

  render() {
    const {
      goodsList,
      storeList,
      recommendGoodsList,
    } = this.state;
    return (
      <div className='wx-attention'>
        <Tabs swipeable={false} defaultActiveKey="1" onChange={this.onChangeTab}>
          <TabPane tab="关注的商品" key="1">
            <List>
              {
                goodsList.map((item, index) => <List.Item key={index}>
                  <Flex>
                    <Flex.Item style={{flex:1}}><Img src={item.goods.goodsImage} style={{width:'100%',height:'100%'}} /></Flex.Item>
                    <Flex.Item style={{flex:2}}>
                      <div className='text-overflow-hidden'>{item.goods.goodsName}</div>
                      <div>{item.goods.goodsPrice}</div>
                      <div style={{textAlign:'right'}}><Button type='primary' size='small' inline>取消关注</Button></div>
                    </Flex.Item>
                  </Flex> 
                </List.Item>)
              }
            </List>
            {
              recommendGoodsList.length > 0 &&    
                  <RecommendGoods data={recommendGoodsList}></RecommendGoods>    
            }    
          </TabPane>
          <TabPane tab="关注的店铺" key="2">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
              选项卡二内容
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(Attention);
