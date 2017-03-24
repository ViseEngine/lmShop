import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import { List, Flex } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Shop extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  gotoGoodsDetail = (item) => {
    common.gotoGoodsDetail({
      specId: item.specId
    });
  }

  render() {
    const { data } = this.props;
    return <List className='wx-order-shop' renderHeader={() => data.storeName}> 
      {
        data.list.map((item,index) => {
          return <div key={index}><Item
            onClick={()=>this.gotoGoodsDetail(item)}  
            arrow="horizontal"
            multipleLine>
            <Flex>
              <Img src={item.goodsImages} style={{height:'200px',width:'200px'}}/>
              <div>
                <Brief>数量: {item.goodsNum}</Brief>
                <br/>
                <Brief style={{color:'red'}}>¥{item.goodsPrice}</Brief>
              </div>  
            </Flex>
          </Item>
            <Item extra={item.shipPrice || '免运费'}>&nbsp;</Item>  
          </div>  
        })
      }
    </List>
  }
}

export default Shop;
