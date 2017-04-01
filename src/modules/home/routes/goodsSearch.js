import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Icon,
  ListView,
  Button,
  InputItem
} from 'antd-mobile';
import GoodsSearchComp from '../components/GoodsSearch';
import classnames from 'classnames';
import { common } from 'common';
import { Img } from 'commonComponent';
import { createForm } from 'rc-form';
import * as goodsApi from '../api/goods';

import './goodsSearch.less';

class GoodsSearch extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      sortField: '',
      sortOrder: 'asc',
      open: false,
      specList: []
    }
  }

  refreshList = () => {
    goodsApi.goodslist({
      sortField: this.state.sortField,
      sortOrder: this.state.sortOrder,
      keyword: this.props.params.keyword,
      pageSize: 20,
      pageNo: 1,
      searchType: 'keywordSearch',
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          dataSource: this.ds.cloneWithRows(result.data)
        })
      }
    })
  }

  componentWillMount() {
    // 查询列表
    this.refreshList();

    // 初始化过滤条件
    goodsApi.goodsfiltermore({
      keyword: this.props.params.keyword,
      searchType: 'keywordSearch'
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        if (data && data.length > 0) {
          const specList = data[0].specList;
          console.log(specList);
          this.setState({
            specList
          });
        }
      }
    })
  }

  renderItem = (dataItem) => {
    return <Flex onClick={() => common.gotoGoodsDetail({specId:dataItem.specId})}>
      <Flex.Item style={{flex:1,paddingLeft:'16px'}}>
        <Img src={dataItem.goodsImage} style={{width:'1.5rem',height:'1.5rem'}}/>
      </Flex.Item>
      <Flex.Item style={{flex:3}}>
        <div style={{width:'100%',height:'100%'}}>
          <div>
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
            </Flex.Item>
          </Flex>
        </div>  
      </Flex.Item>
    </Flex>
  }

  changeOrder = (sortField) => {
    this.setState({
      sortField,
      sortOrder: this.state.sortOrder == 'desc' ? 'asc' : 'desc'
    })
    this.refreshList();
  }

  onClickFilter = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { data, sortField, sortOrder } = this.state;
    const allUpClass = classnames('wx-goods-search-order-up', {
      'selected': sortField == '' && sortOrder == 'desc'
    })
    const allDownClass = classnames('wx-goods-search-order-down', {
      'selected': sortField == '' && sortOrder == 'asc'
    })

    const salenumUpClass = classnames('wx-goods-search-order-up', {
      'selected': sortField == 'salenum' && sortOrder == 'desc'
    })
    const salenumDownClass = classnames('wx-goods-search-order-down', {
      'selected': sortField == 'salenum' && sortOrder == 'asc'
    })

    const goodsStorePriceUpClass = classnames('wx-goods-search-order-up', {
      'selected': sortField == 'goodsStorePrice' && sortOrder == 'desc'
    })
    const goodsStorePriceDownClass = classnames('wx-goods-search-order-down', {
      'selected': sortField == 'goodsStorePrice' && sortOrder == 'asc'
    })

    const { getFieldProps } = this.props.form;

    return <div className='wx-goods-search-page'>
      {
        this.state.open ? <div style={{
          height: document.documentElement.clientHeight,
          width: '5rem',
          backgroundColor: 'white',
          zIndex: 10000,
          position: 'fixed',
          right: 0,
          overflowY: 'scroll'
        }}>
          <Flex direction='column'>
            <Flex>
              <InputItem
                {...getFieldProps('minprice')}
                clear
                placeholder="最低价"
                autoFocus
              ></InputItem>
              <InputItem
                {...getFieldProps('maxprice')}
                clear
                placeholder="最高价"
              ></InputItem>
            </Flex>
            {
              this.state.specList.map((spec,index) => {
                return <div key={index}>
                  <div>{spec.spName}</div>
                  <Flex wrap="wrap">
                    {
                      spec.specValueList.map((value,i) => {
                        return <Button key={i}>{value.spValueName}</Button>
                      })
                    }
                  </Flex>
                </div>
              })
            }
          </Flex>  
        </div> : null
      }
      <Flex className='wx-goods-search-header'>
        <Flex.Item onClick={()=>this.changeOrder('')}>
          {
            sortField == '' ? <span style={{color:'red'}}>综合</span>:'综合'
          }  
          <div className='wx-goods-search-order'>
            <Icon className={allUpClass} type="up" />
            <Icon className={allDownClass} type="down" />
          </div>
        </Flex.Item>
        <Flex.Item onClick={()=>this.changeOrder('salenum')}>
          {
            sortField == 'salenum' ? <span style={{color:'red'}}>销量</span>:'销量'
          }  
          <div className="wx-goods-search-order">
            <Icon className={salenumUpClass} type="up" />
            <Icon className={salenumDownClass} type="down" />
          </div>
        </Flex.Item>
        <Flex.Item onClick={()=>this.changeOrder('goodsStorePrice')}>
          {
            sortField == 'goodsStorePrice' ? <span style={{color:'red'}}>价格</span>:'价格'
          }  
          <div className="wx-goods-search-order">
            <Icon className={goodsStorePriceUpClass} type="up"/>
            <Icon className={goodsStorePriceDownClass} type="down" />
          </div>
        </Flex.Item>
        <Flex.Item onClick={()=>this.onClickFilter()}>
          筛选<img style={{width:'.2rem',height:'.2rem'}} src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/list_saixuan.png`} />
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

export default withRouter(createForm()(GoodsSearch));
