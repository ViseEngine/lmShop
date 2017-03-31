import React, { Component } from 'react';
import { Grid, Flex, WhiteSpace, List } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

class HomeNewGoodsBlock extends React.PureComponent {

  onClick = (el, index) => {
    // console.log(el);
    common.gotoGoodsDetail({ specId: el.specId });
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' style={{fontSize:'.24rem'}}>
      <Flex.Item>
        <div style={{fontSize:'.28rem'}}>{dataItem.gcName}</div> 
      </Flex.Item>
      <Flex.Item>
        <div style={{color:'gray',width:'2.2rem'}} className='text-overflow-hidden'>{dataItem.goodsName}</div>
      </Flex.Item>
      <Flex.Item>
        <Img src={dataItem.goodsImage} style={{width:'2rem', height:'2rem' }} />
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
