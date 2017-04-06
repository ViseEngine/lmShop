import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Carousel,
  Modal,
  Tabs,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button
} from 'antd-mobile';
import * as contentApi from '../api/content';
import { Img } from 'commonComponent';
import './content.less';

const TabPane = Tabs.TabPane;

class ContentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      advlist: [],
      conList: [],
      activeKey: null
    }
  }

  componentDidMount() {
    Toast.loading();
    contentApi.index().then(result => {
      Toast.hide();
      let data = result.data;
      const classList = data.classList;
      let currentClass;
      if (classList.length > 0) {
        currentClass = classList[0]
      }
      const activeKey = currentClass.acId
      this.setState({
        classList,
        activeKey
      });

      this.onChangeTab(activeKey);
    });
  }

  onChangeTab = (acId) => {
    this.setState({
      activeKey: acId
    })
    contentApi.articleList({ acId }).then(result => {
      console.log(result);
      const data = result.data
      this.setState({
        conList: data.conList,
        advlist: data.advlist,
      })
    })
  }

  render() {
    const {
      classList,
      advlist,
      activeKey,
      conList
    } = this.state;
    if (!activeKey) {
      return null;
    }
    return (
      <div>
        <Tabs activeKey={activeKey}
          swipeable={false}
          onChange={this.onChangeTab}>
          {
            classList.map((item,index)=>{
              return <TabPane tab={item.acName} key={item.acId}>
                <Carousel
                  autoplay={true}
                  style={{height:'2rem'}}>
                  {
                    advlist.map(adv => {
                      return <Img key={adv.id} src={adv.thumb} style={{width:'100%',height:'2rem'}}/>
                    })
                  }  
                  
                </Carousel>
                <div>
                {
                  conList && conList.map((con,i) => {
                      return <WingBlank>
                        <WhiteSpace></WhiteSpace>
                        <Flex key={i} style={{ height: '2.4rem' }}>
                          <Img src='' style={{ width: '2rem', height: '2rem' }} />
                          <Flex.Item>
                            <p>
                              <Button size='small' inline>{con.catName}</Button>
                              <span>发布时间: {con.publishedStr.substr(0,10)}</span>
                            </p>
                            <div className='text-overflow-hidden'>{con.title}</div>
                            <p style={{height:'1rem'}}>{con.digest}</p>
                          </Flex.Item>
                        </Flex>
                        <WhiteSpace></WhiteSpace>
                    </WingBlank>    
                  })
                }  
                </div>  
              </TabPane>
            })
          }
        </Tabs>
      </div>
    )
  }
}

export default withRouter(ContentDetail);
