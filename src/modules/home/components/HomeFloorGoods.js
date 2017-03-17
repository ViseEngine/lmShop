import React, { Component } from 'react';
import { Grid, List, Flex, Icon } from 'antd-mobile';
import { Img } from 'commonComponent';
import { ImgGoodsInfo, GoodsImgInfo } from './GoodsInfo';

const Layout28 = () => {}

const Layout48 = () => {

}

const Layout33 = ({ goodsList }) => {
  return null;
}

class HomeFloorGoods extends React.PureComponent {

  renderHeader = (data) => {
    return <Flex>
      <Flex.Item>{data.floorName}</Flex.Item>
      <Flex.Item style={{textAlign:'right'}}><a href='#'>更多</a><Icon type='right' size='xs'></Icon></Flex.Item>
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
            <ImgGoodsInfo dataItem={dataItem}></ImgGoodsInfo>
          )}>
      </Grid>

      sencondBlock = <Grid data={data.goodsList.slice(2,10)} columnNum={4} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <ImgGoodsInfo dataItem={dataItem}></ImgGoodsInfo>
          )}>
      </Grid>
    } else if (data.floorType == '9') {
      firstBlock = <Grid data={data.goodsList} columnNum={3} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <GoodsImgInfo dataItem={dataItem}></GoodsImgInfo>
          )}>
      </Grid>
    } else {
      firstBlock = <Grid data={data.goodsList.slice(0,2)} columnNum={4} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <ImgGoodsInfo dataItem={dataItem}></ImgGoodsInfo>
          )}>
      </Grid>

      sencondBlock = <Grid data={data.goodsList.slice(2,10)} columnNum={4} hasLine={false}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <ImgGoodsInfo dataItem={dataItem}></ImgGoodsInfo>
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
