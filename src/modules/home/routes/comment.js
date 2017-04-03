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
import './afterSale.less';

const TabPane = Tabs.TabPane;
class AfterSale extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.orderList = []
    this.state = {
      pageNo: 1,
      dataSource: this.ds.cloneWithRows(this.orderList),
      hasMore: false,
      isLoading: false,
      isInit: true
    }
  }

  refreshList = ({ pageNo }) => {
    orderApi.orderlist({
      pageNo,
      orderType: 2,
      status: '20,30,40'
    }).then(result => {
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

  componentDidMount() {
    this.refreshList({
      pageNo: 1
    });
  }

  onEndReached = (event) => {
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
    const { dataSource } = this.state
    /*const footer = <div style={{ padding: 30, textAlign: 'center' }}>
      {this.state.isLoading ? '加载中...' : '加载完毕'}
    </div>;*/
    const footer = null;
    return (
      <div className="wx-afterSale">
        <ListView
          style={{
            height: document.documentElement.clientHeight - 200,
            overflowY: 'auto',
          }}
          renderFooter={() => footer}
          dataSource={this.state.dataSource}
          renderRow={(dataItem) => (
            <OrderItem
              cancelOrder={() => this.refreshList({
                pageNo:1
              })}
              dataItem={dataItem}></OrderItem>
            )}></ListView>
      </div>
    )
  }
}

export default withRouter(AfterSale);
