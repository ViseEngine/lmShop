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
import * as storeApi from '../api/store';

import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';

import './attention.less';

const TabPane = Tabs.TabPane;

class GoodsViewRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      storeList: [],
      type: props.params.type
    }
  }

  componentDidMount() {
    this.onChangeTab(this.state.type);
  }

  cancelAttention = (item) => {
    const alertInstance = Modal.alert('提示', '是否取消关注', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          let params = {
            favType: this.state.type,
          }
          // 商品
          if (this.state.type == 1) {
            params.goodsId = item.goods.goodsId;
          } else {
            params.storeId = item.store.storeId;
          }
          storeApi.storecollection(params).then(result => {
            Toast.info(result.msg);
            // 刷新页面
            this.onChangeTab(this.state.type);
          });
        }
      }
    ]);
  }

  onChangeTab = (value) => {
    this.setState({
      type: value
    })

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
      type
    } = this.state;
    return (
      <div className='wx-attention'>
        <Tabs swipeable={false} defaultActiveKey={type} onChange={this.onChangeTab}>
          <TabPane tab="关注的商品" key="1">
            <List>
              {
                goodsList && goodsList.map((item, index) => <List.Item key={index}>
                  <Flex>
                    <Flex.Item style={{flex:1}}><Img src={item.goods.goodsImage} style={{width:'100%',height:'100%'}} /></Flex.Item>
                    <Flex.Item style={{flex:2}}>
                      <div className='text-overflow-hidden'>{item.goods.goodsName}</div>
                      <div>{item.goods.goodsPrice}</div>
                      <div style={{ textAlign: 'right' }}>
                        <Button type='primary' size='small' inline onClick={()=>this.cancelAttention(item)}>取消关注</Button>
                      </div>
                    </Flex.Item>
                  </Flex> 
                </List.Item>)
              }
            </List>
            
          </TabPane>
          <TabPane tab="关注的店铺" key="2">
            <List>
              {
                storeList && storeList.map((item, index) => <List.Item key={index}>
                  <Flex>
                    <Flex.Item style={{flex:1}}><Img src={item.store.storeLogo} style={{width:'100%',height:'100%'}} /></Flex.Item>
                    <Flex.Item style={{flex:2}}>
                      <div className='text-overflow-hidden'>{item.store.storeName}</div>
                      <div>关注人数 {item.store.storeCollect}</div>
                      <div style={{ textAlign: 'right' }}>
                        <Button type='primary' size='small' inline onClick={()=>this.cancelAttention(item)}>取消关注</Button>
                      </div>
                    </Flex.Item>
                  </Flex> 
                </List.Item>)
              }
            </List>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(GoodsViewRecord);
