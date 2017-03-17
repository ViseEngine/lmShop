import React, { Component } from 'react';
import { Grid, Flex, List } from 'antd-mobile';
import { Img } from 'commonComponent';

class HomeRecommendGoods extends React.PureComponent {

  onClick = (el, index) => {
    console.log(el);
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' >
      <Flex.Item style={{textAlign:'center'}}>
        <Img src={dataItem.goodsImage} style={{ width: '80%', height:'2rem' }} />
      </Flex.Item>
      <Flex.Item>
        <span>{dataItem.gcName}</span> 
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'0.2rem',color:'gray'}}>{dataItem.goodsName.slice(0,12)}</span>
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'0.2rem',color:'red'}}>{`¥${dataItem.goodsStorePrice}`}</span>
      </Flex.Item>
    </Flex>
  }

  render() {
    const { data } = this.props;
    console.log(data);
    return <List renderHeader={() => '为你推荐'}>
      <Grid data={data} columnNum={2} hasLine={true}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>
      </Grid>
    </List>
  }
}

export default HomeRecommendGoods;
