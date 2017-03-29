import React, { Component } from 'react';
import { Img } from 'commonComponent';
import {
  Toast,
  Flex,
  Button,
  ListView,
  WingBlank,
  WhiteSpace,
  List,
  Icon
} from 'antd-mobile';
import * as storeApi from '../api/store';

import './GoodsSearch.less'

class GoodsSearch extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      order: 'desc',
      orderField: ''
    }
  }

  componentDidMount() {
    storeApi.storegoods({
      order: this.state.order,
      orderField: this.state.orderField,
      pageNo: 1,
      pageSize: 20,
      goodsName: null,
      storeId: this.props.storeId
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        // console.log(data);
        this.setState({
          dataSource: this.ds.cloneWithRows(data),
        })
      }
    });
  }

  renderItem = (dataItem) => {
    return <Flex>
      <Flex.Item style={{flex:1,paddingLeft:'16px'}}>
        <Img src={dataItem.goodsImage} style={{width:'100%'}}/>
      </Flex.Item>
      <Flex.Item style={{flex:3}}>
        <div style={{width:'100%',height:'100%'}}>
          <div className='text-overflow-hidden'>
            {dataItem.goodsName}
          </div>
          <WhiteSpace></WhiteSpace>
          <div style={{color:'red'}}>
            {`¥${dataItem.goodsPrice}`}
          </div>
          <Flex>
            <Flex.Item style={{color:'red'}}>{dataItem.storeName}</Flex.Item>
            <Flex.Item style={{ minWidth: '200px', paddingRight: '8px' }}>
              {dataItem.commentnum}条评论 销量 {dataItem.salenum}
              {/*<Button size='small' type='primary' onClick={()=>this.gotoBuy(dataItem)}>马上抢</Button>*/}
            </Flex.Item>
          </Flex>
        </div>  
      </Flex.Item>
    </Flex>
  }

  render() {
    const { data, orderField, order } = this.props;
    return <div className='wx-goods-search'>
      <Flex className='wx-goods-search-header'>
        <Flex.Item>
          {
            orderField == '' ?
              <span className=''>综合</span> :
              <span>综合</span>  
          }
          <Icon type="up" size='xxs' />
        </Flex.Item>
        <Flex.Item>销量</Flex.Item>
        <Flex.Item>价格</Flex.Item>
        <Flex.Item>上新</Flex.Item>
      </Flex>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        stickyHeader
        delayTime={10}>
      </ListView>
    </div>
  }
}

export default GoodsSearch;
