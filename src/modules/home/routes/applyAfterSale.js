import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  TextareaItem,
  ImagePicker,
  Stepper
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
      selectedAction: 1,
      // goodsNum: 1,
      // buyerMessage: '',
      // refundAmount: 1
      // gevalIsAnonymous: 0,
      // gevalScore: 0,
      // gevalContent: '',
      // sevalDeliverycredit: 0,
      // sevalDesccredit: 0,
      // recId: '',
      // sevalServicecredit: 0,
    }
  }

  onChange = (files, type, index) => {
    this.setState({
      files,
    });
  }

  submit = () => {
    const { orderItem, goods, type } = this.props.location.state;
    const fieldsValue = this.props.form.getFieldsValue();
    const { files } = this.state;
    console.log(orderItem);
    if (!fieldsValue.buyerMessage || fieldsValue.buyerMessage == '') {
      Toast.info('请填写问题描述', 1);
      return;
    }
    if (files.length == 0) {
      Toast.info('请先上传照片', 1);
      return;
    }
    orderApi.filesUpload({
      images: files.map(item => item.file)
    }).then(result => {
      // 上传图片成功
      if (result.result == 1) {
        const imgUrl = result.data;
        if (type == 1) {
          orderApi.refundOrder({
            imgUrl,
            refundAmount: orderItem.refundAmount,
            buyerMessage: fieldsValue.buyerMessage,
            orderGoodsId: orderItem.goodsId,
            orderId: orderItem.orderId
          }).then(r => {
            if (r.result == 1) {
              Toast.info(r.msg);
              this.props.router.push('/orderList/3')
            } else {
              Toast.info(r.msg);
            }
          })
        } else {

        }
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

  onChangeAction = (action) => {
    this.setState({
      selectedAction: action
    })
  }

  onChangeNum = (val) => {
    this.setState({
      goodsNum: val
    })
  }

  render() {
    const { orderItem, goodsItem, type } = this.props.location.state;
    const { getFieldProps } = this.props.form;
    console.log(goodsItem);
    const {
      files,
      selectedAction,
      goodsNum
    } = this.state;
    // const orderState = orderItem.orderState;
    const showActions = [<Button
        key={1}
        {...(selectedAction == 1 ? { type: 'ghost' } : {})}
        onClick={()=>this.onChangeAction(1)}  
        style={{marginRight:'.2rem'}}  
        size='small' inline>退款</Button>]
    if (type == 2) {
      showActions.push(<Button
        key={2}
        {...(selectedAction == 2 ? { type: 'ghost' } : {}) }
        onClick={()=>this.onChangeAction(2)}  
        style={{marginRight:'.2rem'}}  
        size='small' inline>退货</Button>)
      showActions.push(<Button 
        key={3}
        {...(selectedAction == 3 ? { type: 'ghost' } : {}) }
        onClick={() => this.onChangeAction(3)}      
        style={{ marginRight: '.2rem' }}  
        size='small' inline>换货</Button>)
    }
    console.log(goodsItem);

    const returnMoney = type == 1 ?
      orderItem.returnMoney : goodsItem.goodsPayPrice * goodsNum

    return (
      <div className="wx-applyafterSale">
        <WhiteSpace style={{
          height: '0.2rem',
          backgroundColor:'white'
        }}></WhiteSpace>
        {
          type == 1 && orderItem && orderItem.orderGoodsList.map((goods,index) => {
            return <Flex key={index} style={{ backgroundColor: 'white' }}>
              <Img src={goods.goodsImage} style={{width:'2rem',height:'2rem'}} />
              <Flex.Item>
                <p>{goods.goodsName}</p>
                <p style={{color:'red'}}>{`￥${goods.goodsPrice}`}</p>
              </Flex.Item>
            </Flex>
          })
        }

        {
          type == 2 &&
            <Flex style={{ backgroundColor: 'white' }}>
              <Img src={goodsItem.goodsImage} style={{width:'2rem',height:'2rem'}} />
              <Flex.Item>
                <p>{goodsItem.goodsName}</p>
                <p style={{color:'red'}}>{`￥${goodsItem.goodsPrice}`}</p>
              </Flex.Item>
            </Flex>
        }
        
        <WhiteSpace style={{
          backgroundColor: '#ebebef',
          height: '0.2rem'
        }}></WhiteSpace>

        <WingBlank>
          <Flex style={{ height: '1rem' }}>
            {showActions}
          </Flex>    
        </WingBlank>     
        
        <WhiteSpace style={{
          backgroundColor: '#ebebef',
          height: '0.2rem'
        }}></WhiteSpace>
        
        <WingBlank>
          <div style={{height:'1.5rem'}}>
            <p>退货金额</p> 
            <p>{`￥${returnMoney}`}</p>
          </div>
        </WingBlank>

        {
          type==2 && <WingBlank>
            <div style={{height:'1.5rem'}}>
              <p>申请数量</p> 
              <Stepper
                {...getFieldProps('goodsNum')}  
                showNumber
                max={10} min={1}
                useTouch={false}
              />
            </div>
          </WingBlank>
        }
        <WhiteSpace style={{
          backgroundColor: '#ebebef',
          height: '0.2rem'
        }}></WhiteSpace>
        
        <WingBlank>
          <WhiteSpace></WhiteSpace>
          <div>问题描述</div> 
           <WhiteSpace></WhiteSpace>
          <TextareaItem
            {...getFieldProps('buyerMessage')}
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
          <Button type='primary' onClick={this.submit}>退款提交</Button>
        </WingBlank> 
      </div>
    )
  }
}

export default withRouter(createForm()(ApplyAfterSale));
