import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Toast,
  Flex,
  Button,
  List
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as storeApi from '../api/store';
import { common } from 'common';

import './store.less';

const Item = List.Item;

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    console.log(this.props.params.storeId);
    // storeApi.storedetail({
    //   storeId: this.props.params.storeId
    // }).then(result => {
    //   console.log(result);
    //   this.setState({

    //   });
    // });
  }

  render() {
    return <div className='wx-store'>
      11111
    </div>
  }
}

export default withRouter(Store);
