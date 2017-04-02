import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  ActionSheet,
  Modal
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as memberApi from '../../api/member';

import './account.less';

const Item = List.Item;

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberDetail: null
    }
  }

  componentDidMount() {
    memberApi.memberDetail().then(result => {
      let data = result.data;
      if (data) {
        this.setState({
          memberDetail: data[0]
        });
      }
    })
  }

  gotoLogin = () => {
    common.gotoLogin();
  }

  logout = () => {
    Modal.alert('系统提示', '您确定要退出登录吗?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          common.removeToken();
          this.props.router.push('/my');
        }
      },
    ]);
  }

  gotoAddress = () => {
    console.log('gotoAddress');
  }

  changeIcon = () => {
    this.showActionSheet();
  }

  showActionSheet = () => {
    const BUTTONS = [<input type='file' className='wx-upload'></input>, '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        // title: '选择头像',
        // message: '我是描述我是描述',
        maskClosable: true,
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          alert('上传头像')
        }
        // this.setState({ clicked: BUTTONS[buttonIndex] });
      });
  }

  render() {
    const { memberDetail } = this.state;
    if (!memberDetail) {
      return null;
    }

    const userIcon = <Img onClick={() => {
        this.props.router.push('/account')
        }}
        style={{ width: '1rem', height: '1rem' }} src={memberDetail.memberAvatar}></Img>

    const memberBirthdaystr = memberDetail.memberBirthdaystr && memberDetail.memberBirthdaystr.substr(0, 10);

    return <div className="wx-account">
      <List>
        <Item arrow="horizontal" extra={userIcon} onClick={this.changeIcon}>头像</Item>
        <Item arrow="horizontal" extra={memberDetail.memberTruename}>昵称</Item>
        <Item extra={memberDetail.memberName}>用户名</Item>
        <Item arrow="horizontal" extra={memberDetail.memberSex==1?'男':'女'}>性别</Item>
        <Item arrow="horizontal" extra={memberBirthdaystr}>出生日期</Item>
        
        <Item arrow="horizontal" onClick={() => {
          this.gotoAddress()
        }}>地址管理</Item>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/accountSafe')}>账户安全</Item>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/recharge')}>余额充值</Item>
      </List>
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Button type='primary' onClick={this.logout}>退出登录</Button>
      </WingBlank>
      <input type="file" ref="head" name="image" style={{ display: 'none' }} accept="image/*" onChange={(e) => this.changeFile(e)} />
    </div>
  }
}

export default withRouter(Account);
