import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { WhiteSpace, WingBlank, Toast } from 'antd-mobile';

class Returns extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {}

  render() {
    const {
      floorList,
    } = this.state;
    return (
      <div>
       退换货
      </div>
    )
  }
}

export default withRouter(Returns);
