import React, { Component } from 'react';
import { Carousel, Flex } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

const onClick = (el) => {
  common.gotoGoodsDetail({ specId: el.specId });
}

/**图片在上面，文字在下面的布局 */
export function ImgGoodsInfo({ dataItem, columnNum }) {
  let width = '1rem';
  if (columnNum == 2) {
    width = '3rem';
  } else if (columnNum == 3) {
    width = '2rem';
  } else if (columnNum == 4) {
    width = '1rem';
  }
  const styles = {
    fontSize: '.24rem',
    color: 'gray',
    width: `${width}`
  }
  // console.log(styles);
  // console.log(object);
  return <Flex direction='column' onClick={()=>onClick(dataItem)} style={{textAlign:'center'}}>
      <Flex.Item>
        <Img src={dataItem.goodsImage} style={{width:width,height:width }} />
      </Flex.Item>
      <Flex.Item>
      <div style={styles} className='text-overflow-hidden'>{dataItem.goodsName}</div> 
      </Flex.Item>
      <Flex.Item>
        <div style={{fontSize:'.24rem',color:'red'}}>{`¥${dataItem.goodsPrice}`}</div>
      </Flex.Item>
    </Flex>
}

/**文字在上面，图片在下面的布局 */
export function GoodsImgInfo({ dataItem, columnNum }) {
  let width = '1rem';
  if (columnNum == 2) {
    width = '3rem';
  } else if (columnNum == 3) {
    width = '2rem';
  } else if (columnNum == 4) {
    width = '1.5rem';
  }
  const styles = {
    fontSize: '.24rem',
    color: 'gray',
    width: `${width}`
  }
  return <Flex direction='column' style={{textAlign:'center'}} onClick={()=>onClick(dataItem)}>
      <Flex.Item>
        <div style={{fontSize:'.24rem'}} className='text-overflow-hidden'> {dataItem.gcName}</div> 
      </Flex.Item>
      <Flex.Item>
        <div style={styles} className='text-overflow-hidden'>{dataItem.goodsName}</div>
      </Flex.Item>
      <Flex.Item>
        <Img src={dataItem.goodsImage} style={{width:width,height:width }} />
      </Flex.Item>
    </Flex>
}
