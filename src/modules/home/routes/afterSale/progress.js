import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  ListView,
  Button,
  SegmentedControl
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../../api/order';
import ProgressItem from '../../components/ProgressItem';

import './progress.less';

class Progress extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows([])
    }
  }

  refreshList = () => {
    orderApi.returnList({
      pageNo: 1,
      pageSize: 10
    }).then(result => {
      if (result.result == 1 && result.data) {
        this.setState({
          dataSource: this.ds.cloneWithRows(result.data)
        })
      }
    })
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.selectedIndex !== this.props.params.selectedIndex) {
      this.refreshList();
    }
  }

  render() {
    const { dataSource } = this.state
    let type = this.props.params.type
    type = (type && parseInt(type)) || 0

    return (
      <div className="wx-progress">
        <SegmentedControl
          style={{ height: '0.8rem'}}  
          tintColor={'#ff0000'}
          onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex)}
          selectedIndex={type}
          values={['退款退货列表', '换货列表']} />
        <ListView
          style={{
            height: document.documentElement.clientHeight,
            overflowY: 'auto',
          }}
          dataSource={dataSource}
          renderRow={(dataItem) => (
            <ProgressItem dataItem={dataItem}></ProgressItem>
          )}></ListView>
      </div>
    )
  }
}

export default withRouter(Progress);
