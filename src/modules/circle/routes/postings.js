import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
  List,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button
} from 'antd-mobile';
import { common } from 'common';
import { Img } from 'commonComponent';
import * as circleApi from '../api/circle';

import './circle.less';
const Item = List.Item;
class Postings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postings: null,
      commentsList: []
    }
  }

  refresh = () => {
    Toast.loading();
    circleApi.postingsDetail({
      postingsId: this.props.params.postingsId,
      selectType: 0,
      pageNo: 1
    }).then(result => {
      Toast.hide();
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }
      let data = result.data[0];
      this.setState({
        ...data
      });
    });
  }

  componentDidMount() {
    this.refresh();
  }

  riokin = (postings) => {
    circleApi.clickGoods({
      postingsId: this.props.params.postingsId
    }).then(result => {
      Toast.info(result.msg, 1, () => {
        this.refresh();
      });
    })
  }

  comment = (postings) => {
    // this.props.router.push('/');
  }

  gotoCommentsDetail = (comments) => {
    console.log(comments);
  }

  moreComments = (postings) => {
    this.props.router.push('/comments/' + postings.postingsId);
  }

  renderHeader = (postings) => {
    return <Flex justify='between'>
      <div>评论 {postings.commentsNum}</div>
      <div onClick={()=>this.moreComments(postings)}>更多评论</div>
    </Flex>
  }

  render() {
    const {
      postings,
      commentsList
    } = this.state;
    if (!postings) {
      return null;
    }
    return (
      <div>
        <List>
          <Item>
            <Flex>
              <Img src={postings.memberImg} style={{
                width: '1rem',
                height: '1rem',
                borderRadius: '.5rem'
              }} />
              <Flex.Item>
                <Flex justify='between'>
                  <p>{postings.postingsName}</p>
                  <p>{postings.createTimeStr}</p>
                </Flex>
              </Flex.Item>
            </Flex>
            <div>
              <p dangerouslySetInnerHTML={{ __html: postings.postingsContent }}></p>
              <span onClick={()=>this.riokin(postings)}>点赞{postings.riokin}</span>
            </div>
          </Item>
        </List>
        <List renderHeader={this.renderHeader(postings)}>
          {
            commentsList.map(comments => {
              return <Item key={comments.postingsId} onClick={()=>this.gotoCommentsDetail(comments)}>
                <Flex>
                  <Img src={comments.memberAvatar} style={{
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '.5rem'
                  }} />
                  <Flex.Item>
                    <Flex justify='between' align='top'>
                      <div>
                        <p>{comments.memberTruename}</p>
                        <p>{comments.comments}</p>
                      </div>
                      <p>{comments.createTimeStr}</p>
                    </Flex>
                  </Flex.Item>
                </Flex>
                <WingBlank>
                {
                  comments.postCommentsVos.map(postComment => {
                    return <Flex>
                      <Img src={postComment.memberAvatar} style={{
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '.5rem'
                      }} />
                      <div>
                        <span>{postComment.memberTruename}:</span>
                        <span>  {postComment.comments}</span>
                      </div>
                    </Flex>
                  })  
                }
                </WingBlank>
                <div onClick={()=> {
                  this.props.router.push('/replys/'+comments.commentId)
                }} style={{textAlign:'center'}}>查看更多</div>
              </Item>
            })
          }
        </List>
      </div>
    )
  }
}

export default withRouter(Postings);
