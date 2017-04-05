import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Carousel, Modal, SearchBar, WhiteSpace, WingBlank, Toast, Flex } from 'antd-mobile';
// import * as content from '../api/circle';

import './content.less';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // classList: [],
      // goodsList: []
    }
  }

  componentDidMount() {
    // // Toast.loading();
    // goodsClassApi.queryClasslist().then(result => {
    //   // Toast.hide();
    //   if (result.result != 1) {
    //     Toast.error(result.msg);
    //     return;
    //   }

    //   let data = result.data;
    //   this.setState({
    //     classList: data
    //   });

    //   if (data && data.length > 0) {
    //     this.onMenuChange(data[0]);
    //   }
    // });
  }

  render() {
    return (
      <div>
        资讯
      </div>
    )
  }
}

export default withRouter(Content);
