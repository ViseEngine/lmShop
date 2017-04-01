import React, { Component } from 'react';
import {
  Flex,
  InputItem,
  Button,
  WingBlank,
  WhiteSpace,
} from 'antd-mobile';
import { Img } from 'commonComponent';

import './GoodsSearchSpecFilter.less'

class GoodsSearchSpecFilter extends Component {

  // 点击规格值
  onClickSpValue = (spec, value) => {
    this.props.onClickSpValue(spec, value);
  }

  reset = () => {
    this.props.resetSpec();
  }

  submit = () => {
    this.props.filterBySpec();
  }

  render() {
    const { specList } = this.props;
    return <div className='fixios' style={{
      height: document.documentElement.clientHeight
    }}>
      <div className='wx-GoodsSearchSpecFilter'
        style={{
          height: document.documentElement.clientHeight
        }}
      >  
      <Flex>
        <InputItem
          placeholder="最低价"
          autoFocus
        ></InputItem>
        <InputItem
          placeholder="最高价"
        ></InputItem>
      </Flex>
      <WhiteSpace></WhiteSpace>
      <WingBlank>
      {
        specList.map((spec, index) => {
          
          return <div key={index}>
            <WhiteSpace></WhiteSpace>
            <div>{spec.spName}</div>
            <WhiteSpace></WhiteSpace>
            <Flex wrap="wrap">
              {
                spec.specValueList.map((value,i) => {
                  let type = 'ghost'
                  if (value.checked) {
                    type = 'primary'  
                  }
                  return <div key={i} className='spec-value'>
                    <Button onClick={() => this.onClickSpValue(spec, value)}
                      type={type}>{value.spValueName}</Button>
                  </div>  
                })
              }
            </Flex>
          </div>
        })
      }
      </WingBlank>
      <WhiteSpace style={{height:'2rem'}}></WhiteSpace>
      <Flex className='spec-btn'>
        <Flex.Item>
            <Button onClick={this.reset}>重置</Button>
        </Flex.Item>
        <Flex.Item>
          <Button type='primary' onClick={this.submit}>确定</Button>
        </Flex.Item>
      </Flex>
      </div>
    </div>
  }
}

export default GoodsSearchSpecFilter;
