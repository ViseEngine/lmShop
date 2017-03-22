import React, { Component } from 'react'
import {
  List,
  Flex,
  Button,
  WingBlank,
  WhiteSpace
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

/**
 * 商品评价
 */
export default function({ goodsDetailInfo }) {

  const { evaluateGoodsList } = goodsDetailInfo;

  const goodsEvalue = goodsDetailInfo.evaluate / 5;
  const evalue = goodsEvalue.toFixed(2) * 100
  // console.log(gevalScore);
  return <List>
    <List.Item extra={`${evalue}%好评`} arrow="horizontal">
      &nbsp;
    </List.Item>
    {
      evaluateGoodsList && evaluateGoodsList.map((item, index) => {
        {/*console.log(item.gevalScore);*/ }
        const res = [...Array(item.gevalScore)].map((_, i) => {
          return <img src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-on.png`} style={{ width: '44px' }} />
        });
        console.log(res);
        return <WingBlank key={index}>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <Flex.Item>
              {
                [...Array(item.gevalScore)].map((_, i) => {
                  return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-on.png`} style={{ width: '44px' }} />
                })
              }
              {
                [...Array(5-item.gevalScore)].map((_, i) => {
                  return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-off.png`} style={{ width: '44px' }} />
                })
              }
            </Flex.Item>
            <Flex.Item style={{textAlign:'right'}}>
              {item.gevalFrommembername}
            </Flex.Item>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <div>{item.gevalContent}</div>
          <WhiteSpace></WhiteSpace>
          {
            item.gevalImage && <div><Img src={item.gevalImage} /></div>
          }
        </WingBlank>
      })
    }
    <List.Item>
      <Flex>
        <Flex.Item>
          <Button>商品晒单 ({goodsDetailInfo.commentnum})</Button>
        </Flex.Item>
        <Flex.Item>
          <Button>购买咨询 ({goodsDetailInfo.consultationNum})</Button>
        </Flex.Item>
      </Flex>
    </List.Item>
  </List>
}
