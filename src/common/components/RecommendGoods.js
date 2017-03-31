import React, { Component } from 'react';
import { Grid, Flex, List, WhiteSpace } from 'antd-mobile';
import Img from './Img';
import { common } from 'common';

class RecommendGoods extends React.PureComponent {

  onClick = (el, index) => {
    common.gotoGoodsDetail({ specId: el.specId });
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' >
      <Flex.Item>
        <Img src={dataItem.goodsImage} style={{ height:'2rem' }} />
      </Flex.Item>
      <Flex.Item>
        <span style={{ fontSize: '.28rem' }}>{dataItem.gcName}</span> 
      </Flex.Item>
      <Flex.Item>
        <div style={{ fontSize: '.24rem',width:'3rem', color: 'gray' }} className='text-overflow-hidden'>{dataItem.goodsName}</div>
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'.24rem',color:'red'}}>{`¥${dataItem.goodsStorePrice}`}</span>
      </Flex.Item>
    </Flex>
  }

  render() {
    const { data } = this.props;
    return <List renderHeader={() => <div style={{textAlign:'center'}}>为你推荐</div>}>
      <Grid data={data} columnNum={2} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>
      </Grid>
    </List>
  }
}

export default RecommendGoods;
