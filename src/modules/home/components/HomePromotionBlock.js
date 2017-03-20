import React, { Component } from 'react';
import { Grid, Flex, List, WhiteSpace, Modal } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

class HomePromotionBlock extends React.PureComponent {

  onClick = (el, index) => {
    Modal.alert("开发中..");
    // window.location.href = common.getFullUrl(`/goodsDetail.html#/?specId=${el.specId}`);
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' >
      <Flex.Item style={{textAlign:'center'}}>
        <Img src={dataItem.goodsImage} style={{ width: '100%', height:'100%' }} />
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'24px'}}>{dataItem.price}</span> 
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'24px',textDecoration:'line-through',color:'gray'}}>{`¥${dataItem.specGoodsPrice}`}</span>
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
        <span style={{color:'red',paddingRight:'20px'}}>{data.activityName}</span>
          <span>{data.activityTypeName}</span>
        </div>
    )}>
      <List.Item>
      <Grid data={objectUnionVOList} columnNum={4} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>
        </Grid>
      </List.Item>  
    </List>
  }
}

export default HomePromotionBlock;
