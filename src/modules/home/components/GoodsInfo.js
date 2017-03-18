import React, { Component } from 'react';
import { Carousel, Flex } from 'antd-mobile';
import { Img } from 'commonComponent';

/**图片在上面，文字在下面的布局 */
export function ImgGoodsInfo({ dataItem }) {
  return <Flex direction='column' >
      <Flex.Item style={{textAlign:'center'}}>
        <Img src={dataItem.goodsImage} style={{ width: '80%', height:'2rem' }} />
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'0.24rem',color:'gray'}} className='wx-home-goods-name'>{dataItem.goodsName.slice(0,10)}</span> 
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'0.24rem',color:'red'}}>{`¥${dataItem.goodsPrice}`}</span>
      </Flex.Item>
    </Flex>
}

/**文字在上面，图片在下面的布局 */
export function GoodsImgInfo({ dataItem }) {
  return <Flex direction='column' >
      <Flex.Item>
        <span style={{fontSize:'0.28rem'}}> {dataItem.gcName}</span> 
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'0.24rem',color:'gray'}}>{dataItem.goodsName}</span>
      </Flex.Item>
      <Flex.Item style={{textAlign:'center'}}>
        <Img src={dataItem.goodsImage} style={{ width: '80%', height:'1.5rem' }} />
      </Flex.Item>
    </Flex>
}
