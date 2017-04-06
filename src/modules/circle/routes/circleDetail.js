import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Carousel,
  Modal,
  List,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as circleApi from '../api/circle';

import './circle.less';
const Item = List.Item;
class CircleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotpostings: [],
      hotCircle: [],
      myCircle: []
    }
  }

  componentDidMount() {
    Toast.loading();
    circleApi.circleDetail({
      pageNo: 1,
      circleId: this.props.params.circleId,
      pageSize: 10,
    }).then(result => {
      Toast.hide();
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }
      console.log(result);
      // let data = result.data[0];
      // this.setState({
      //   ...data
      // });
    });
  }

  gotoCircleDetail = (circle) => {
    console.log(circle);
    alert('去详情');
  }

  gotoPostingsDetail = (postings) => {
    console.log(postings);
  }

  moreList = (type) => {
    // 1圈子 2帖子
    if (type == 1) {

    } else {

    }
  }

  render() {
    const { hotCircle, hotpostings } = this.state;
    return (
      <div>
        <List>
          <Item>热门圈子</Item>  
          {
            hotCircle.slice(0,4).map(circle => {
              return <Item key={circle.circleId} onClick={()=>this.gotoDetail(circle)}>
                <Flex>
                  <div>
                    <Img src={circle.circlePhoto} style={{width:'1.5rem',height:'1.5rem',borderRadius: '.75rem'}}/>
                  </div>
                  <Flex.Item>
                    <p>{circle.circleName}</p>
                    <div className='text-overflow-hidden'>{circle.circleDescription}</div>
                    <p>{circle.concerns}</p>
                  </Flex.Item>
                  <div>
                    <Button inline size='small' type='primary'>
                    {
                      circle.isFavorites==1?'已关注':'+关注'
                    }
                    </Button>
                  </div>
                </Flex>
              </Item>
            })
          }
          <Item><div style={{ textAlign: 'center' }} onClick={()=>this.moreList(1)}>更多</div></Item>  
        </List>
        <List>
          <Item>热门帖子</Item>  
          {
            hotpostings.slice(0,4).map(postings => {
              return <Item key={postings.postingsId} onClick={()=>this.gotoPostingsDetail(postings)}>
                <Flex>
                  <Img src={postings.memberImg} style={{width:'1.5rem',height:'1.5rem',borderRadius: '.75rem'}}/>
                  <Flex.Item>
                    <p>{postings.postingsName}</p>
                  </Flex.Item>
                </Flex>
              </Item>
            })
          }
          <Item><div style={{textAlign:'center'}} onClick={()=>this.moreList(2)}>更多</div></Item>  
        </List>
      </div>
    )
  }
}

export default withRouter(CircleDetail);
