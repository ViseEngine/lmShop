import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  Icon
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as goodsDetailApi from '../api/goodsDetail';
import comment from 'svg/comment.svg';

import './consultList.less';

class ConsultList extends Component {

  static contextTypes = {
    initAction: React.PropTypes.func,
    clearAction: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      consultList: []
    }
  }

  componentWillUnmount() {
    this.context.clearAction();
  }

  componentDidMount() {
    // 绑定头部事件
    this.context.initAction({
      title: <Icon type={comment} onClick={() => {
        this.props.router.push('/consultEdit/'+this.props.params.goodsId);
      }} />
    })

    goodsDetailApi.goodsConsultList({
      goodsId: this.props.params.goodsId
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          consultList: result.data || []
        })
      }
    })
  }

  render() {
    const { consultList } = this.state;
    return (
      <div className='wx-ConsultList fix-scroll hastitle'>
      <List>
        {
          consultList.map(item => {
            return <List.Item key={item.consultId}>
              <Flex justify='between'>
                <div><Img src={item.memberImg} style={{ width: '.36rem', height: '.36rem' }} /><span>{item.cmemberName}</span></div>
                <span>{item.createTimeStr}</span>
              </Flex>
              <p>咨询:{item.consultContent}</p>
            </List.Item>    
          })
        }
      </List>
      </div>
    )
  }
}

export default withRouter(ConsultList);
