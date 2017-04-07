import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Tabs,
  Grid,
  Icon
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as circleApi from '../api/circle';
import deleteIcon from 'svg/delete.svg';

import './circle.less';
const TabPane = Tabs.TabPane;
class My extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postingsList: [],
      myCircleList: []
    }
  }

  initCircle = () => {
    circleApi.myCircle().then(result => {
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }

      let data = result.data[0];
      this.setState({
        myCircleList: data.myCircle
      });
    });
  }

  initPostings = () => {
    circleApi.postingsList({
      pageNo: 1,
      pageSize: 50
    }).then(result => {
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }

      let data = result.data;
      this.setState({
        postingsList: data.postingsVoList
      });
    });
  }

  componentDidMount() {
    this.onChange(1);
  }

  onChange = (key) => {
    if (key == 1) {
      this.initCircle();
    } else {
      this.initPostings();
    }
  }

  renderItem = (dataItem) => {
    return <Flex direction='column'>
      <Img src={dataItem.circlePhoto}
        style={{
          width: '1.5rem',
          height: '1.5rem',
          borderRadius: '.75rem'
        }} />
      <p>{dataItem.circleName}</p>
    </Flex>
  }

  render() {
    const { postingsList, myCircleList } = this.state;
    return (
      <div className='wx-circle-my'>
        <div className='my-header'>
        </div>
        <div>
          <Tabs defaultActiveKey="1" onChange={this.onChange} swipeable={false}>
            <TabPane tab="我的圈子" key="1">
              <WhiteSpace></WhiteSpace>
              <Grid data={myCircleList}
                renderItem={this.renderItem}  
                columnNum={4} hasLine={false} />
            </TabPane>
            <TabPane tab="我的帖子" key="2">
              <WingBlank>
              {
                postingsList.map(postings => {
                  return <div key={postings.postingsId}>
                    <Flex justify='between'>
                      <div>{postings.createTimeStr}</div>
                      <div>
                        <Icon type={deleteIcon} />
                      </div>
                    </Flex>
                    <p>{postings.postingsContent}</p>
                    <Flex>
                      <span>喜欢</span>
                      <span>评论</span>
                    </Flex>
                    <WhiteSpace></WhiteSpace>
                  </div>
                })
              }
              </WingBlank>  
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default withRouter(My);
