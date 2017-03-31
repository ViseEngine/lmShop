import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  Grid,
  Popup
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as goodsDetailApi from '../api/goodsDetail';

class ConsultList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consultList: []
    }
  }

  componentDidMount() {
    console.log(this.props.params.goodsId);
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default withRouter(ConsultList);
