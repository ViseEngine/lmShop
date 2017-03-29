import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import * as memberApi from '../api/member';

class MyIntegral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopPointsLogsList: [],
      pointsNum: 0
    }
  }

  componentWillMount() {
    memberApi.shopPointsLogList({
      pageNo: 1,
      pageSize: 50
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          ...result.data
        })
      }
    })
  }

  render() {
    const {
      pointsNum,
      shopPointsLogsList
    } = this.state;
    return (
      <div>
        <div style={{height:'1rem',padding:'0.5rem 0.3rem'}}>
          {pointsNum}分<br />
          积分有多大用，多领一些存起来
       </div>
      </div>
    )
  }
}

export default withRouter(MyIntegral);
