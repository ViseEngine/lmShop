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
      isAnonymous: false
    }
  }

  componentDidMount() {}

  onChange = (files, type, index) => {
    this.setState({
      files,
    });
  }

  render() {
    const { goods } = this.props.location.state;
    const { files, isAnonymous } = this.state;
    const starImgPath = `${common.SERVER_DOMAIN}/res_v4.0/h5/images/icon-star.png`

    // const filename = this.props.isFav == 1 ? 'b_1_h_2.png' : 'b_1_h_1.png'
    const filename = 'b_1_h_1.png'
    const isFavUrl = `${common.SERVER_DOMAIN}/res_v4.0/h5/images/${filename}`
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
            placeholder="请填写您对商品的评价"
            rows={5}
        />
        <WingBlank>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>整体评价:</div> 
            <div className="commstar-mod">
              <CommentImg/>
            </div>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>发货速度:</div> 
            <div className="commstar-mod">
              <CommentImg/>
            </div>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>服务态度:</div> 
            <div className="commstar-mod">
              <CommentImg/>
            </div>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>描述相符:</div> 
            <div className="commstar-mod">
              <CommentImg/>
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
            <Button inline type='ghost'>发表</Button>
          </WingBlank>
        </Flex>
      </div>
    )
  }
}

export default withRouter(Comment);
