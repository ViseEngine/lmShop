import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Modal,
  Toast,
  Flex,
  Button,
  List,
  Checkbox
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as addressApi from '../api/address';
import { common } from 'common';
import { createForm } from 'rc-form';

import './address.less';

const Item = List.Item;
const Brief = Item.Brief;
const AgreeItem = Checkbox.AgreeItem;

class AddressEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressList: []
    }
  }

  render() {
    const { addressList } = this.state;
    return <div className='wx-addresslist'>
      地址更新
    </div>
  }
}

function mapStateToProps({ order }) {
  return { order };
}

export default withRouter(connect(mapStateToProps)(AddressEdit));
