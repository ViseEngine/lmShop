import React, { Component } from 'react'
import {
  Tabs,
  Grid,
  Flex
} from 'antd-mobile';
import { Img } from 'commonComponent';
const TabPane = Tabs.TabPane;

const renderItem = (dataItem) => {
  return <Flex direction='column' >
      <Flex.Item style={{textAlign:'center'}}>
        <Img src={dataItem.goodsImage} style={{ height:'2rem' }} />
      </Flex.Item>
      <Flex.Item>
        <span>{dataItem.gcName}</span> 
      </Flex.Item>
      <Flex.Item>
        <div style={{ fontSize: '24px',width:'3rem', color: 'gray' }} className='text-overflow-hidden'>{dataItem.goodsName}</div>
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'24px',color:'red'}}>{`¥${dataItem.goodsStorePrice}`}</span>
      </Flex.Item>
    </Flex>
}

/**
 * 商品更多信息
 * @param {*} param0 
 */
export default function({ goodsDetailInfo }) {
  return <Tabs defaultActiveKey="1">
    <TabPane tab="猜你喜欢" key="1">
      {
        goodsDetailInfo.recommendList &&
        <Grid hasLine={false}
          renderItem={(dataItem, index) => (renderItem(dataItem))}
          data={goodsDetailInfo.recommendList} columnNum={3} >
      </Grid>
      }
    </TabPane>
    <TabPane tab="排行榜" key="2">
      {
        goodsDetailInfo.orderList &&
        <Grid hasLine={false}
          renderItem={(dataItem, index) => (renderItem(dataItem))}
          data={goodsDetailInfo.orderList} columnNum={3} >
      </Grid>
      }
    </TabPane>
  </Tabs>
}
