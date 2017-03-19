import React, { Component } from 'react';
import { Grid, List, Flex, Icon } from 'antd-mobile';
import { Img } from 'commonComponent';
import { ImgGoodsInfo, GoodsImgInfo } from './GoodsInfo';

class HomeFloorGoods extends React.PureComponent {

  renderHeader = (data) => {
    return <Flex>
      <Flex.Item>{data.floorName}</Flex.Item>
      <Flex.Item style={{textAlign:'right'}}><span>更多</span><Icon type='right' size='xs'></Icon></Flex.Item>
    </Flex>
  }

  render() {
    const { data } = this.props;
    let firstBlock = null;
    let sencondBlock = null;

    if (data.floorType == '2*8') {
      firstBlock = <Grid data={data.goodsList.slice(0,2)} columnNum={2} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
          <ImgGoodsInfo dataItem={dataItem} columnNum={2}></ImgGoodsInfo>
          )}>
      </Grid>

      sencondBlock = <Grid data={data.goodsList.slice(2,10)} columnNum={4} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <ImgGoodsInfo dataItem={dataItem} columnNum={4}></ImgGoodsInfo>
          )}>
      </Grid>
    } else if (data.floorType == '9') {
      firstBlock = <Grid data={data.goodsList} columnNum={3} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <GoodsImgInfo dataItem={dataItem} columnNum={3}></GoodsImgInfo>
          )}>
      </Grid>
    } else {
      firstBlock = <Grid data={data.goodsList.slice(0,4)} columnNum={2} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <ImgGoodsInfo dataItem={dataItem} columnNum={2}></ImgGoodsInfo>
          )}>
      </Grid>

      sencondBlock = <Grid data={data.goodsList.slice(4,10)} columnNum={4} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <ImgGoodsInfo dataItem={dataItem} columnNum={4}></ImgGoodsInfo>
          )}>
      </Grid>
    }

    return <List renderHeader={() => this.renderHeader(data) }>
      <List.Item>
        {firstBlock}
      </List.Item>
      {sencondBlock && <List.Item>
        {sencondBlock}
      </List.Item>
      }
    </List>
  }
}

export default HomeFloorGoods;
