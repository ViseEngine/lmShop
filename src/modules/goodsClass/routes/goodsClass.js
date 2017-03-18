import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Carousel, Modal, SearchBar, WhiteSpace, WingBlank, Toast, Flex } from 'antd-mobile';
import * as goodsClassApi from '../api/goods';
import GoodsClassMenu from '../components/GoodsClassMenu';
import GoodsList from '../components/GoodsList';

import './goodsClass.less';

class GoodsClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      goodsList: []
    }
  }

  componentDidMount() {
    // Toast.loading();
    goodsClassApi.queryClasslist().then(result => {
      // Toast.hide();
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }
      let data = result.data;
      this.setState({
        classList: data
      });
    });
  }

  render() {
    return (
      <div>
        <Flex>
          <Flex.Item style={{flex:1}}>
            <GoodsClassMenu data={this.state.classList}></GoodsClassMenu>
          </Flex.Item>
          <Flex.Item style={{flex:2}}>
            {/*<GoodsList></GoodsList>*/}
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}

export default withRouter(GoodsClass);
