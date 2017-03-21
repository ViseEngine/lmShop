import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { List, InputItem, Switch, Stepper, Range, Button, createTooltip } from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';

import './login.less';

const Item = List.Item;
const RangeWithTooltip = createTooltip(Range);

class ForgetPassword extends Component {

  state = {
    value: 1
  }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        alert('校验失败');
      }
    });
  }
  onReset = () => {
    this.props.form.resetFields();
  }
  validateAccount = (rule, value, callback) => {
    // if (value && value.length > 4) {
    //   callback();
    // } else {
    //   callback(new Error('帐号至少4个字符'));
    // }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (<form>
      <List renderHeader={() => '验证表单'}
        renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
      >
        <InputItem
          {...getFieldProps('account', {
            rules: [
              { required: true, message: '请输入用户名／邮箱／已验证邮箱' },
              { validator: this.validateAccount },
            ],
          })}
          clear
          error={!!getFieldError('account')}
          onErrorClick={() => {
            alert(getFieldError('account').join('、'));
          }}
          placeholder="请输入账号"
        >帐号</InputItem>
        <InputItem {...getFieldProps('password')} placeholder="请输入密码" type="password">
          密码
        </InputItem>
        <Item>
          <Button type="primary" onClick={this.onSubmit} inline>登录</Button>
        </Item>
        <Item extra={<div>忘记密码?</div>}>注册账号</Item>
      </List>
    </form>);
  }
}

export default createForm()(ForgetPassword);
