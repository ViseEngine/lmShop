import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Tabs,
  Flex,
  ListView,
  SegmentedControl,
  Button
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import './orderList.less';

const TabPane = Tabs.TabPane;
class OrderList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.orderList = []
    let status = null;
    let orderType = 1;
    const type = parseInt(props.params.type);
    switch (type) {
      case 0:
        status = null;
        break;
      case 1:
        status = 20;
        break;
      case 2:
        status = 30;
        break;
      case 3:
        status = 40;
        break;
      default:
        status = '20,30,40';
        orderType = 2;
        break;
    }
    this.state = {
      selectedIndex: type,
      pageNo: 1,
      dataSource: this.ds.cloneWithRows(this.orderList),
      hasMore: false,
      isLoading: false,
      status,
      orderType
    }
  }

  refreshList = () => {
    // if (this.state.isLoading) {
    //   return;
    // }
    const { pageNo, orderType, status } = this.state;
    orderApi.orderlist({ pageNo, orderType, status }).then(result => {
      this.setState({
        isLoading: false
      });
      if (result.result == 1) {
        const data = result.data || [];
        const pageSize = 10;
        const dataLength = data.length;
        let hasMore = true;
        if (dataLength < pageSize) {
          hasMore = false;
        }
        if (orderType == this.state.orderType && status == this.state.status) {
          this.orderList = { ...this.orderList, ...data };
        } else {
          this.orderList = data;
        }
        this.setState({
          hasMore,
          pageNo,
          dataSource: this.ds.cloneWithRows(this.orderList),
          orderType,
          status
        })
      }
    })
  }

  onChange = (index) => {
    this.props.router.replace('/orderList/' + index);
  }

  renderItem = (dataItem) => {
    let orderStatus = '';
    switch (dataItem.orderState) {
      case 0:
        orderStatus = '已取消'
        break;
      case 10:
        orderStatus = '待支付'
        break;
      case 20:
        orderStatus = '等待发货'
        break;
      case 30:
        orderStatus = '待收货'
        break;
      case 40:
        orderStatus = '买家确认收货'
        break;
      case 50:
        orderStatus = '已提交'
        break;
      case 60:
        orderStatus = '待发货'
        break;
      default:
        break;
    }
    return <div className='orderitem'>
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Flex justify='between'>
          <div>{dataItem.storeName}</div>
          <div className="paystaus">{orderStatus}</div>
        </Flex>
        {
          dataItem.orderGoodsList.map(goods => {
            return <Flex key={goods.specId}>
              <Img src={goods.goodsImage} style={{width:'1.5rem'}}/>
              <div>
                <p>{goods.goodsName}</p>
                <p dangerouslySetInnerHTML={{ __html: goods.specInfo }}></p>
              </div>  
            </Flex>    
          })
        }
        <Flex justify='between'>
          <div>订单总额:{dataItem.goodsAmount}</div>
          <div>
            <Button type='ghost' size='small' inline>取消订单</Button>
            <Button style={{marginLeft:'0.1rem'}} type='ghost' size='small' inline>去支付</Button>
          </div>
        </Flex>
      </WingBlank>
      <WhiteSpace></WhiteSpace>
      <WhiteSpace style={{ backgroundColor: '#ebebef'}}></WhiteSpace>
    </div>
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.refreshList();
  }

  onEndReached = (event) => {
    console.log('onEndReached');
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    let pageNo = this.state.pageNo + 1;
    // orderApi.orderlist({
    //   pageNo,
    //   orderType: this.state.orderType,
    //   status: this.state.status
    // }).then(result => {
    //   if (result.result == 1) {
    //     const data = result.data || [];
    //     const pageSize = 10;
    //     const dataLength = data.length;
    //     let hasMore = true;
    //     if (dataLength < pageSize) {
    //       hasMore = false;
    //     }
    //     this.orderList = [...this.orderList, ...data];
    //     this.setState({
    //       hasMore,
    //       isLoading: false,
    //       pageNo,
    //       dataSource: this.ds.cloneWithRows(this.orderList),
    //     })
    //   }
    // })
    setTimeout(() => {
      this.refreshList({
        pageNo,
        status: this.state.status,
        orderType: this.state.orderType,
      });
    }, 1000);
  }

  render() {
    const { selectedIndex, dataSource } = this.state
    const footer = <div style={{ padding: 30, textAlign: 'center' }}>
      {this.state.isLoading ? '加载中...' : '加载完毕'}
    </div>;
    return (
      <div className="wx-orderlist">
        <SegmentedControl
          className='orderlist-header'  
          tintColor={'#ff0000'}
          onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex)}
          selectedIndex={selectedIndex}
          values={['全部订单', '待付款', '待收货', '待评价']} />
        <div className='orderlist-body'>
          <ListView
            style={{
              height: document.documentElement.clientHeight,
              overflow: 'auto',
            }}
            renderFooter={()=>footer}
            
            dataSource={this.state.dataSource}
            renderRow={this.renderItem}></ListView>
        </div>
      </div>
    )
  }
}

export default withRouter(OrderList);
