import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Modal,
  Toast,
  Flex,
  Button,
  List,
  Checkbox,
  InputItem,
  Picker
} from 'antd-mobile';

import { Img } from 'commonComponent';
import * as addressApi from '../api/address';
import { common } from 'common';
import { createForm } from 'rc-form';

import './address.less';

const Item = List.Item;
const Brief = Item.Brief;

// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', padding: '0 0.3rem' }}
  >
    <div style={{ display: 'flex', height: '0.9rem', lineHeight: '0.9rem' }}>
      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
      <div style={{ textAlign: 'right', color: '#888' }}>{props.extra}</div>
    </div>
  </div>
);

class AddressAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      trueName: '',
      mobPhone: '',
      areaInfo: '',
      zipCode: '',
      areaId: '',
      provinceId: '',
      addressId: '',
      telPhone: '',
      cityId: '',
    }
  }

  onChangeArea = () => {
    alert(111);
  }

  onSubmit = () => {

  }

  render() {
    const { getFieldProps } = this.props.form;
    return <div className='wx-address-add'>
      <List className="my-list">
         <InputItem
            {...getFieldProps('trueName')}
            clear
            placeholder="请输入收货人"
          >收货人</InputItem>
        <InputItem
            {...getFieldProps('mobPhone')}
            clear
            placeholder="请输入手机号"
        >手机号</InputItem>
        <InputItem
            {...getFieldProps('zipCode')}
            clear
            placeholder="请输入邮政编码">邮政编码</InputItem>
        <Picker
          data={district}
          title="选择地区"
          extra="请选择(可选)"
          value={this.state.pickerValue}
          onChange={v => this.setState({ pickerValue: v })}
        >
          <CustomChildren>选择地区（自定义 children）</CustomChildren>
        </Picker>
        <InputItem
            {...getFieldProps('address')}
            clear
            placeholder="详细地址">详细地址</InputItem>
        <InputItem
            {...getFieldProps('telPhone')}
            clear
            placeholder="座机电话">座机电话</InputItem>
        <Item>
          <Button onClick={this.onSubmit} type='primary'>保存</Button>
        </Item>
      </List>
    </div>
  }
}

function mapStateToProps({ order }) {
  return { order };
}

export default withRouter(
  connect(mapStateToProps)(
    createForm()(AddressAdd)
  )
);
