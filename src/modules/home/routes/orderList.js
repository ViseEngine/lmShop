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
import OrderItem from '../components/OrderItem';
import * as orderApi from '../api/order';
import './orderList.less';

const TabPane = Tabs.TabPane;
class OrderList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.orderList = []
    // let status = null;
    // let orderType = 1;
    this.state = {
      selectedIndex: parseInt(props.params.type),
      pageNo: 1,
      dataSource: this.ds.cloneWithRows(this.orderList),
      hasMore: false,
      isLoading: false,
      isInit: true
      // status,
      // orderType
    }
  }

  refreshList = ({ pageNo, selectedIndex }) => {
    let status = null;
    let orderType = 1;
    switch (selectedIndex) {
      case 0:
        status = null;
        break;
      case 1:
        status = 10;
        break;
      case 2:
        status = 30;
        break;
      case 3:
        status = 40;
        break;
    }

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
        if (this.state.isInit) {
          this.orderList = data;
        } else {
          this.orderList = { ...this.orderList, ...data };
        }
        this.setState({
          hasMore,
          pageNo,
          dataSource: this.ds.cloneWithRows(this.orderList)
        })
      }
    })
  }

  // 改变tab
  onChange = (index) => {
    this.props.router.replace('/orderList/' + index);
  }

  // renderItem = (dataItem) => {
  //   return <OrderItem dataItem={dataItem}></OrderItem>
  // }

  componentDidUpdate(prevProps, prevState) {
    // 当前url参数
    const type = parseInt(this.props.params.type);
    // 如果变化参数
    if (type != this.state.selectedIndex) {
      this.setState({
        pageNo: 1,
        selectedIndex: type,
        isInit: true
      })

      this.refreshList({
        pageNo: 1,
        selectedIndex: type
      });
    }
  }

  componentDidMount() {
    this.refreshList({
      pageNo: 1,
      selectedIndex: this.state.selectedIndex
    });
  }

  refresh = () => {
    this.refreshList({
      pageNo: 1,
      selectedIndex: this.state.selectedIndex
    });
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
    /*const footer = <div style={{ padding: 30, textAlign: 'center' }}>
      {this.state.isLoading ? '加载中...' : '加载完毕'}
    </div>;*/
    const footer = null;
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
              height: `${document.documentElement.clientHeight/100-1.9}rem`,
              overflow: 'auto',
            }}
            renderFooter={()=>footer}
            dataSource={this.state.dataSource}
            renderRow={(dataItem) => (
              <OrderItem
                cancelOrder={this.refresh}
                finishorder={this.refresh}
                dataItem={dataItem}></OrderItem>
            )}></ListView>
        </div>
      </div>
    )
  }
}

export default withRouter(OrderList);
