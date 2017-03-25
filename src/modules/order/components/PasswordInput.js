import React, { Component, PropTypes } from 'react';
import './PasswordInput.less';

export class PasswordInput extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onComplete: PropTypes.func,
    onClose: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      len: 0,
      visible: props.visible,
      onComplete: props.onComplete,
      onClose: props.onClose
    }
  }

  componentDidUpdate() {
    this.refs.passwordInput.focus();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      ...nextProps
    });
  }

  input = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      this.setState({
        len: value.length
      });
      if (value.length == 6) {
        setTimeout(() => {
          this.setState({
            visible: false
          });
          this.state.onComplete(value.substr(0, 6));
        }, 0);
      }
    }
  }

  close = (e) => {
    this.setState({
      visible: false,
      len: 0
    });

    this.state.onClose(e);
  }

  render() {
    var { visible, len } = this.state;
    let passwordInputCls = "wx-password-six flex";
    if (!visible) {
      passwordInputCls = passwordInputCls.concat(" hidden");
    }
    let passwordInputCountCls = 'show-box show-' + len + ' flex';
    return (
      <div className={passwordInputCls}>
        <div className="panel">
          <p className="title">请输入支付密码</p>
          <div className="flex flex-pack-center">
            <div className={passwordInputCountCls}>
              <div className="show flex flex-align-center flex-pack-center">
                <div className="circle"></div>
              </div>
              <div className="show flex flex-align-center flex-pack-center">
                <div className="circle"></div>
              </div>
              <div className="show flex flex-align-center flex-pack-center">
                <div className="circle"></div>
              </div>
              <div className="show flex flex-align-center flex-pack-center">
                <div className="circle"></div>
              </div>
              <div className="show flex flex-align-center flex-pack-center">
                <div className="circle"></div>
              </div>
              <div className="show flex flex-align-center flex-pack-center">
                <div className="circle"></div>
              </div>
             <input type="text" ref="passwordInput" className="show-input" onInput={this.input} maxLength="7" />
            </div>
          </div>
        </div>
        <div className="mask" onClick={this.close}></div>
      </div>
    );
  }
}
