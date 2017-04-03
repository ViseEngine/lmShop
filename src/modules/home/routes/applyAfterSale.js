import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  TextareaItem,
  ImagePicker
} from 'antd-mobile';
import { Img } from 'commonComponent';
import CommentImg from '../components/CommentImg';
import { common } from 'common';
import { createForm } from 'rc-form';
import * as orderApi from '../api/order';

import './applyAfterSale.less';

class ApplyAfterSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      // gevalIsAnonymous: 0,
      // gevalScore: 0,
      // gevalContent: '',
      // sevalDeliverycredit: 0,
      // sevalDesccredit: 0,
      // recId: '',
      // imgUrl: '',
      // sevalServicecredit: 0,
    }
  }

  onChange = (files, type, index) => {
    this.setState({
      files,
    });
  }

  postComment = () => {
    const { orderItem } = this.props.location.state;
    const files = this.state.files;
    orderApi.filesUpload({
      images: files.map(item => item.file)
    }).then(result => {
      // 上传图片成功
      if (result.result == 1) {
        const imgUrl = result.data;
        orderApi.saveReviews({
          ...this.state,
          imgUrl,
          orderSn,
          recId: goods.recId,
        }).then(r => {
          if (r.result == 1) {
            Toast.info(r.msg);
            this.props.router.push('/orderList/3')
          } else {
            Toast.info(r.msg);
          }
        })
      }
    })
  }

  // 修改评分
  onChangeScore = (key, score) => {
    this.setState({
      [key]: score
    })
  }

  onChangeComment = (value) => {
    this.setState({
      gevalContent: value
    })
  }

  render() {
    const { orderItem } = this.props.location.state;
    const { getFieldProps } = this.props.form;
    const {
      files,
      // gevalIsAnonymous,
      // gevalContent
    } = this.state;
    console.log(orderItem);
    return (
      <div className="wx-applyafterSale">
        <WhiteSpace style={{
          height: '0.2rem',
          backgroundColor:'white'
        }}></WhiteSpace>
        {
          orderItem.orderGoodsList.map(goods => {
            return <Flex key={goods.specId} style={{ backgroundColor: 'white' }}>
              <Img src={goods.goodsImage} style={{width:'2rem',height:'2rem'}} />
              <Flex.Item>
                <p>{goods.goodsName}</p>
                <p style={{color:'red'}}>{`￥${goods.goodsPrice}`}</p>
              </Flex.Item>
            </Flex>
          })
        }
        
        <WhiteSpace style={{
          backgroundColor: '#ebebef',
          height: '0.2rem'
        }}></WhiteSpace>

        <WingBlank>
          <Flex style={{ height: '1rem' }}>
            <Button type='ghost'
              style={{marginRight:'.2rem'}}  
              size='small' inline>退款</Button>
            <Button
              style={{marginRight:'.2rem'}}  
              size='small' inline>退货</Button>
            <Button size='small' inline>换货</Button>
          </Flex>    
        </WingBlank>     
        
        <WhiteSpace style={{
          backgroundColor: '#ebebef',
          height: '0.2rem'
        }}></WhiteSpace>
        
        <WingBlank>
          <div style={{height:'1.5rem'}}>
            <p>退货金额</p> 
            <p>{`￥${orderItem.returnMoney}`}</p>
          </div>
        </WingBlank>

        <WhiteSpace style={{
          backgroundColor: '#ebebef',
          height: '0.2rem'
        }}></WhiteSpace>
        
        <WingBlank>
          <WhiteSpace></WhiteSpace>
          <div>问题描述</div> 
           <WhiteSpace></WhiteSpace>
          <TextareaItem
            {...getFieldProps('desc')}
            rows={3}
            placeholder="请填写您对商品的评价"
          />
          <WhiteSpace></WhiteSpace>
        </WingBlank>

        <WhiteSpace style={{
          backgroundColor: '#ebebef',
          height: '0.2rem'
        }}></WhiteSpace>
        
        <WingBlank>
          <div>
            <p>上传照片</p>
            <ImagePicker
              files={files}
              onChange={this.onChange}
              selectable={files.length < 3}
              />
          </div>  
        </WingBlank>
        
        <WingBlank>
          <Button type='primary'>退款提交</Button>
        </WingBlank> 
      </div>
    )
  }
}

export default withRouter(createForm()(ApplyAfterSale));
