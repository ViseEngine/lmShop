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
import * as orderApi from '../api/order';

import './applyAfterSale.less';

// 商品显示模块
const GoodsItem = ({ goods }) => {
  return <Flex style={{ backgroundColor: 'white' }}>
    <Img src={goods.goodsImage} style={{ width: '2rem', height: '2rem' }} />
    <Flex.Item>
      <p>{goods.goodsName}</p>
      <p style={{ color: 'red' }}>{`￥${goods.goodsPrice}`}</p>
    </Flex.Item>
  </Flex>
}

// 分割线
const SeparationLine = () => {
  return <WhiteSpace style={{
    backgroundColor: '#ebebef',
    height: '0.2rem'
  }}></WhiteSpace>
}

// 申请售后
class ApplyAfterSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      selectedAction: 1,
      goodsNum: 1,
      buyerMessage: ''
    }
  }

  // 修改上传文件  
  onChange = (files, type, index) => {
    this.setState({
      files,
    });
  }

  // 修改售后类型  
  onChangeAction = (action) => {
    this.setState({
      selectedAction: action
    })
  }

  // 修改数量
  onChangeNum = (val) => {
    this.setState({
      goodsNum: val
    })
  }

  onChangeBuyMessage = (buyerMessage) => {
    this.setState({
      buyerMessage
    })
  }

  // 提交申请
  submit = () => {
    const { orderItem, goodsItem, type } = this.props.location.state;
    const { files, selectedAction, buyerMessage, goodsNum } = this.state;
    console.log(orderItem);
    if (buyerMessage == '') {
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
        if (selectedAction == 1) {
          const returnMoney = type == 1 ?
            orderItem.returnMoney :
            parseFloat(goodsItem.goodsPayPrice * goodsItem.goodsNum).toFixed(2)
          orderApi.refundOrder({
            imgUrl,
            refundAmount: returnMoney,
            buyerMessage,
            orderGoodsId: goodsItem && goodsItem.recId,
            orderId: orderItem && orderItem.orderId
          }).then(r => {
            if (r.result == 1) {
              Toast.info(r.msg);
              this.props.router.push('/afterSale')
            } else {
              Toast.info(r.msg);
            }
          })
        } else if (selectedAction == 2) { // 选择退货
          orderApi.returnOrder({
            imgUrl,
            buyerMessage,
            goodsNum,
            orderGoodsId: goodsItem && goodsItem.recId,
            orderId: orderItem && orderItem.orderId
          }).then(r => {
            if (r.result == 1) {
              Toast.info(r.msg);
              this.props.router.push('/afterSale')
            } else {
              Toast.info(r.msg);
            }
          })
        } else {
          // 换货
          orderApi.barterOrder({
            imgUrl,
            buyerMessage,
            goodsNum,
            orderGoodsId: goodsItem && goodsItem.recId,
            orderId: orderItem && orderItem.orderId
          }).then(r => {
            if (r.result == 1) {
              Toast.info(r.msg);
              this.props.router.push('/afterSale')
            } else {
              Toast.info(r.msg);
            }
          })
        }
      }
    })
  }

  render() {
    const { orderItem, goodsItem, type } = this.props.location.state;
    const {
      files,
      selectedAction,
      goodsNum
    } = this.state;
    const showActions = [<Button
        key={1}
        {...(selectedAction == 1 ? { type: 'ghost' } : {})}
        onClick={()=>this.onChangeAction(1)}  
        style={{marginRight:'.2rem'}}  
        size='small' inline>退款</Button>]
    if (type == 2 && orderItem.orderState == 40) {
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
    // 退款
    const returnMoney = type == 1 ?
      orderItem.returnMoney :
      parseFloat(goodsItem.goodsPayPrice * goodsItem.goodsNum).toFixed(2)

    return (
      <div className="wx-applyafterSale">
        <WhiteSpace style={{
          height: '0.2rem',
          backgroundColor:'white'
        }}></WhiteSpace>
        {
          type == 1 && orderItem && orderItem.orderGoodsList.map((goods,index) => {
            return <GoodsItem key={index} goods={goods}></GoodsItem>
          })
        }

        {
          type == 2 && <GoodsItem goods={goodsItem}></GoodsItem>
        }
        
        <SeparationLine></SeparationLine>

        <WingBlank>
          <Flex style={{ height: '1rem' }}>
            {showActions}
          </Flex>    
        </WingBlank>     
        
        <SeparationLine></SeparationLine>
        
        {
          selectedAction ==1 &&  <WingBlank>
              <div style={{height:'1.5rem'}}>
                <p>退货金额</p> 
                <p>{`￥${returnMoney}`}</p>
              </div>
            </WingBlank>
        }
        {
          type==2 && selectedAction !=1 && <WingBlank>
            <div style={{height:'1.5rem'}}>
              <p>申请数量</p> 
              <Stepper
                showNumber
                onChange={this.onChangeNum}
                value={this.state.goodsNum}
                max={goodsItem.goodsNum} min={1}
                useTouch={false}
              />
            </div>
          </WingBlank>
        }
        <SeparationLine></SeparationLine>
        
        <WingBlank>
          <WhiteSpace></WhiteSpace>
          <div>问题描述</div> 
           <WhiteSpace></WhiteSpace>
           <TextareaItem
            onChange={this.onChangeBuyMessage}
            rows={3}
            placeholder="请填写您对商品的评价"
          />
          <WhiteSpace></WhiteSpace>
        </WingBlank>

        <SeparationLine></SeparationLine>
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
          <Button type='primary' onClick={this.submit}>提交申请</Button>
        </WingBlank> 
      </div>
    )
  }
}

export default withRouter(ApplyAfterSale);
