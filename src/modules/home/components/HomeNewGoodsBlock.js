import React, { Component } from 'react';
import { Grid, Flex, WhiteSpace, List } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

class HomeNewGoodsBlock extends React.PureComponent {

  onClick = (el, index) => {
    // console.log(el);
    window.location.href = common.getFullUrl(`/goodsDetail.html#/?specId=${el.specId}`);
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' >
      <Flex.Item>
        <div> {dataItem.gcName}</div> 
      </Flex.Item>
      <Flex.Item>
        <div style={{color:'gray',width:'1.5rem'}} className='text-overflow-hidden'>{dataItem.goodsName}</div>
      </Flex.Item>
      <Flex.Item style={{textAlign:'center'}}>
        <Img src={dataItem.goodsImage} style={{width:'100%', height:'100%' }} />
      </Flex.Item>
    </Flex>
  }

  render() {
    const { data } = this.props;
    return <List renderHeader={() => <div>新品上市</div>}>
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
