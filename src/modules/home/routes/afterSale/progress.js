import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  ListView,
  Button
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
      if (result.result == 1) {
        console.log(result);
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
    return (
      <div className="wx-progress">
        <ListView
          style={{
            height: document.documentElement.clientHeight - 200,
            overflowY: 'auto',
          }}
          dataSource={dataSource}
          renderRow={(dataItem) => (
            <ProgressItem></ProgressItem>
          )}></ListView>
      </div>
    )
  }
}

export default withRouter(Progress);
