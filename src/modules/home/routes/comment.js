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
  Checkbox
} from 'antd-mobile';
import { Img } from 'commonComponent';
import CommentImg from '../components/CommentImg';
import { common } from 'common';
import './comment.less';

const AgreeItem = Checkbox.AgreeItem;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      gevalIsAnonymous: false,
      gevalScore: 0,
      gevalContent: '',
      sevalDeliverycredit: 0,
      sevalDesccredit: 0,
      recId: '',
      imgUrl: '',
      sevalServicecredit: 0,
      // orderSn: 
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  onChange = (files, type, index) => {
    this.setState({
      files,
    });
  }

  postComment = () => {
    console.log(this.state);
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
    const { goods } = this.props.location.state;
    const {
      files: [],
      gevalIsAnonymous,
      gevalContent
    } = this.state;
    return (
      <div className="wx-comment">
        <Flex style={{backgroundColor:'white'}}>
          <Img src={goods.goodsImage} style={{width:'2rem',height:'2rem'}} />
          <Flex.Item>
            <p>{goods.goodsName}</p>
            <p style={{color:'red'}}>{`￥${goods.goodsPrice}`}</p>
          </Flex.Item>
        </Flex>
        <WhiteSpace style={{
          backgroundColor: '#ebebef',
          height: '0.2rem'
        }}></WhiteSpace>
        <TextareaItem
          onChange={(value)=>this.onChangeComment(value)}
            placeholder="请填写您对商品的评价"
            rows={5}
        />
        <WingBlank>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>整体评价:</div> 
            <div className="commstar-mod">
              <CommentImg onChangeScore={score => {
                this.onChangeScore('gevalScore',score)
              }} />
            </div>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>发货速度:</div> 
            <div className="commstar-mod">
              <CommentImg onChangeScore={(score) => {
                this.onChangeScore('sevalDeliverycredit',score)
              }} />
            </div>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>服务态度:</div> 
            <div className="commstar-mod">
              <CommentImg onChangeScore={(score) => {
                this.onChangeScore('sevalServicecredit',score)
              }} />
            </div>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>描述相符:</div> 
            <div className="commstar-mod">
              <CommentImg onChangeScore={(score) => {
                this.onChangeScore('sevalDesccredit',score)
              }} />
            </div>
          </Flex>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            selectable={files.length < 3}
          />
        </WingBlank>
        <Flex justify='between'>
          <AgreeItem
            checked={isAnonymous}
            onChange={e => this.setState({
              isAnonymous:e.target.checked
            })}>
            匿名评价
          </AgreeItem>
          <WingBlank>
            <Button inline type='ghost' onClick={this.postComment}>发表</Button>
          </WingBlank>
        </Flex>
      </div>
    )
  }
}

export default withRouter(Comment);
