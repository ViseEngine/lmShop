import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  List,
  Button,
  Steps
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../../api/order';
const Step = Steps.Step;
const Item = List.Item;
import './progress.less';

class ProgressDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progressDetail: null
    }
  }

  componentDidMount() {
    const refundId = this.props.params.refundId;
    orderApi.returnDetail({
      refundId
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          progressDetail: result.data[0]
        })
      }
    })
  }

  render() {
    const { progressDetail } = this.state
    if (!progressDetail) {
      return null;
    }
    return (
      <div className="wx-progress-detail">
        <List>
          <Item>问题描述</Item>
          <Item style={{height:'2rem'}}>
            {progressDetail.buyerMessage}
          </Item>
          <Item>审核留言</Item>
          <Item style={{height:'2rem'}}>
            {progressDetail.sellerMessage}
          </Item>
          <Item>审核进度</Item>
          <Item>
            <Steps current={1}>
              {
                progressDetail.returnLogList.map(log => {
                  return <Step title={log.createTimeStr}
                    description={log.stateInfo}
                     />
                })
              }
            </Steps>
          </Item>
        </List> 
      </div>
    )
  }
}

export default withRouter(ProgressDetail);
