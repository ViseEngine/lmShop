import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  SearchBar,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Icon,
  ListView
} from 'antd-mobile';
import GoodsSearchComp from '../components/GoodsSearch';

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

  componentWillMount() {}

  renderItem = (dataItem) => {
    return <Flex onClick={() => common.gotoGoodsDetail({specId:dataItem.specId})}>
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
              <span>综合</span> :<span>综合</span>  
          }
          <div className="wx-goods-search-order">
            <Icon className="wx-goods-search-order-up" type="up" size='xxs' />
            <Icon className="wx-goods-search-order-down" type="down" size='xxs' />
          </div>
        </Flex.Item>
        <Flex.Item>销量
          <div className="wx-goods-search-order">
            <Icon className="wx-goods-search-order-up" type="up" size='xxs' />
            <Icon className="wx-goods-search-order-down" type="down" size='xxs' />
          </div>
        </Flex.Item>
        <Flex.Item>价格
          <div className="wx-goods-search-order">
            <Icon className="wx-goods-search-order-up" type="up" size='xxs' />
            <Icon className="wx-goods-search-order-down" type="down" size='xxs' />
          </div>
        </Flex.Item>
        <Flex.Item>筛选
          <div className="wx-goods-search-order">
            <Icon className="wx-goods-search-order-up" type="up" size='xxs' />
            <Icon className="wx-goods-search-order-down" type="down" size='xxs' />
          </div>
        </Flex.Item>
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

export default withRouter(GoodsSearch);
