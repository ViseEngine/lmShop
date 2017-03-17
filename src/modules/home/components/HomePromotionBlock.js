import React, { Component } from 'react';
import { Grid, Flex, List, WhiteSpace } from 'antd-mobile';
import { Img } from 'commonComponent';

class HomePromotionBlock extends React.PureComponent {

  onClick = (el, index) => {
    console.log(el);
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' >
      <Flex.Item style={{textAlign:'center'}}>
        <Img src={dataItem.goodsImage} style={{ width: '80%', height:'1.5rem' }} />
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'0.24rem',color:'red'}}> {dataItem.price}</span> 
      </Flex.Item>
      <Flex.Item>
        <span style={{textDecoration:'line-through',fontSize:'0.24rem',color:'gray'}}>{`¥${dataItem.specGoodsPrice}`}</span>
      </Flex.Item>
    </Flex>
  }

  render() {
    const { data } = this.props;
    let objectUnionVOList = data.objectUnionVOList;
    if (objectUnionVOList && objectUnionVOList.length > 4) {
      objectUnionVOList = objectUnionVOList.slice(0, 4);
    }
    return <List renderHeader={() => (
        <div>
          <a style={{fontSize:'0.28rem',paddingRight:'0.1rem'}} href="#">{data.activityName}</a>
          <span style={{fontSize:'0.28rem'}} className='title'>{data.activityTypeName}</span>
        </div>
      ) }>
      <WhiteSpace></WhiteSpace>
      <Grid data={objectUnionVOList} columnNum={4} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>
      </Grid>
    </List>
  }
}

export default HomePromotionBlock;
