import React, { Component, PropTypes } from 'react'
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
import GoodsSearchSpecFilter from '../components/GoodsSearchSpecFilter';
import Immutable from 'immutable';

import * as goodsApi from '../api/goods';

import './goodsSearch.less';

class GoodsSearch extends Component {

  static contextTypes = {
    initAction: PropTypes.func,
    clearAction: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      sortField: '',
      sortOrder: 'asc',
      open: false,
      specList: [],
      maximumPrice: '',
      minimumPrice: '',
      layoutType: 1
    }
  }

  componentWillUnmount() {
    this.context.clearAction();
  }

  refreshList = () => {
    const specValueIds = [];
    const mapedList = this.state.specList.forEach(specItem => {
      specItem.specValueList.forEach(specValue => {
        if (specValue.checked) {
          specValueIds.push(specValue.spValueId);
        }
      })
    });
    console.log(specValueIds);

    goodsApi.goodslist({
      sortField: this.state.sortField,
      sortOrder: this.state.sortOrder,
      keyword: this.props.params.keyword,
      pageSize: 20,
      pageNo: 1,
      // 'keywordSearch'
      searchType: this.props.params.searchType,
      maximumPrice: this.state.maximumPrice,
      minimumPrice: this.state.minimumPrice,
      specFilter: specValueIds.join(',')
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          dataSource: this.ds.cloneWithRows(result.data)
        })
      }
    })
  }

  componentWillMount() {

    // this.context.initAction({
    //   title: '切换',
    //   action: () => {
    //     this.setState({
    //       layoutType: this.state.layoutType == 1 ? 2 : 1
    //     })
    //   }
    // });
    // 查询列表
    this.refreshList();

    // 初始化过滤条件
    goodsApi.goodsfiltermore({
      keyword: this.props.params.keyword,
      searchType: this.props.params.searchType,
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        if (data && data.length > 0) {
          const specList = data[0].specList;
          this.setState({
            specList
          });
        }
      }
    })
  }

  resetSpec = () => {
    const specList = this.state.specList;
    const mapedList = specList.map(specItem => {
      const specValueList = specItem.specValueList.map(specValue => {
        specValue.checked = false;
        return specValue;
      })
      specItem.specValueList = specValueList;
      return specItem;
    });
    this.setState({
      specList: mapedList
    })
  }

  // 修改价格过滤
  changePrice = (priceFilter) => {
    this.setState({
      ...priceFilter
    })
  }

  filterBySpec = () => {
    console.log(this.state);
    this.setState({
      open: false
    })
    this.refreshList();
  }

  onClickSpValue = (spec, spValue) => {
    const specList = this.state.specList;
    let mapedList = null;
    // 当前选择的规格值是选中状态
    if (spValue.checked) {
      mapedList = specList.map(specItem => {
        if (specItem.spId == spec.spId) {
          console.log(specItem);
          const specValueList = specItem.specValueList.map(specValue => {
            if (specValue.spValueId == spValue.spValueId) {
              specValue.checked = false;
            }
            return specValue;
          })
          specItem.specValueList = specValueList;
        }
        return specItem;
      });
      console.log(mapedList);
    } else {
      mapedList = specList.map(specItem => {
        if (specItem.spId == spec.spId) {
          const specValueList = specItem.specValueList.map(specValue => {
            if (specValue.spValueId == spValue.spValueId) {
              specValue.checked = true;
            } else {
              specValue.checked = false;
            }
            return specValue;
          })
          specItem.specValueList = specValueList;
        }
        return specItem;
      });
    }
    this.setState({
      specList: mapedList
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
              评论{dataItem.commentnum}条 销量 {dataItem.salenum}
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
    const { data, sortField, sortOrder, specList } = this.state;
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

    return <div className='wx-goods-search-page'>
      {
        this.state.open ? <GoodsSearchSpecFilter
          changePrice={this.changePrice}  
          onClickSpValue={this.onClickSpValue}
          resetSpec={this.resetSpec}
          filterBySpec={this.filterBySpec}
          maximumPrice={this.state.maximumPrice}
          minimumPrice={this.state.minimumPrice}
          specList={specList} /> : null
      }
      {
        this.state.open ? <div onClick={() => this.setState({
          open:false
        })} className="am-modal-mask"></div> : null
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
        <div className='fix-scroll' style={{paddingTop:'1.9rem'}}>
          <ListView
            style={{
              height:'100%'
            }}  
            dataSource={this.state.dataSource}
            renderRow={this.renderItem}
            delayTime={10}>
            </ListView>
        </div>
    </div>
  }
}

export default withRouter(GoodsSearch);
