import React, { Component } from 'react';
import { Grid, Flex, WhiteSpace, List } from 'antd-mobile';
import { Img } from 'commonComponent';

class HomeNewGoodsBlock extends React.PureComponent {

  onClick = (el, index) => {
    console.log(el);
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' >
      <Flex.Item>
        <div style={{fontSize:'0.28rem'}}>{dataItem.gcName}</div>
      </Flex.Item>
      <WhiteSpace />
      <Flex.Item>
        <div style={{fontSize:'0.24rem'}} className='text-overflow-hidden gray'>{dataItem.goodsName.slice(0,10)}</div>
      </Flex.Item>
      <Flex.Item style={{textAlign:'center'}}>
        <Img src={dataItem.goodsImage} style={{ width: '80%', height:'1.5rem' }} />
      </Flex.Item>
    </Flex>
  }

  render() {
    const { data } = this.props;
    return <List renderHeader={() => '新品上市'}>
      <List.Item>
      <Grid data={data.slice(0,6)} columnNum={3} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>
        </Grid>
      </List.Item>  
    </List>
  }
}

export default HomeNewGoodsBlock;
