import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button
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
    goodsDetailApi.goodsConsultList({
      goodsId: this.props.params.goodsId
    }).then(result => {
      console.log(result);
      if (result.result == 1) {
        this.setState({
          consultList: result.data
        })
      }
    })
  }

  render() {
    return (
      <div>
        <List></List>
      </div>
    )
  }
}

export default withRouter(ConsultList);
