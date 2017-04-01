import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  Grid,
  Popup
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import Moment from 'moment';
import * as goodsDetailApi from '../api/goodsDetail';
import './evaluteList.less'

const Item = List.Item;

class EvaluteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluteList: [],
      countAll: null
    }
  }

  componentDidMount() {
    goodsDetailApi.goodsEvaluteList({
      goodsId: this.props.params.goodsId
    }).then(result => {
      console.log(result);
      if (result.result == 1) {
        const data = result.data;
        if (data && data.length > 0) {
          this.setState({
            evaluteList: data[0].beanList || [],
            countAll: data[0].countAll
          })
        }
      }
    })
  }


  render() {
    const { evaluteList, countAll } = this.state;
    return (
      <div className="wx-EvaluteList">
        {
          countAll && <Flex className="wx-EvaluteList-top">
            <Flex.Item>全部评论<br />{countAll.all}</Flex.Item>
            <Flex.Item>好评<br />{countAll.good}</Flex.Item>
            <Flex.Item>中评<br />{countAll.general}</Flex.Item>
            <Flex.Item>差评<br />{countAll.bad}</Flex.Item>
          </Flex>
        }
        <List>
        {
            evaluteList && evaluteList.map((item, index) => {
            const gevalImageShow = item.gevalImage.split(',').map((image, i) => <Img key={i} src={image} style={{width:'1.5rem',height:'1.5rem'}}/>)
            return <WingBlank key={index}>
              <WhiteSpace></WhiteSpace>
              <Flex justify='between'>
                <div><Img src={item.gevalFrommemberAvatar} style={{ width: '.36rem',height:'.36rem'}}/><span>{item.gevalFrommembername}</span></div>
                <div>{Moment(item.gevalAddTime).format('YYYY-MM-DD HH:mm:ss')}</div>
              </Flex>
              <WhiteSpace></WhiteSpace>
              <Flex>
                <Flex.Item>
                  {
                    [...Array(item.gevalScore)].map((_, i) => {
                      return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-on.png`} style={{ width: '.36rem',height:'.36rem'  }} />
                    })
                  }
                  {
                    [...Array(5-item.gevalScore)].map((_, i) => {
                      return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-off.png`} style={{ width: '.36rem',height:'.36rem' }} />
                    })
                  }
                </Flex.Item>
                
              </Flex>
              <WhiteSpace></WhiteSpace>
              <div>{item.gevalContent}</div>
              <WhiteSpace></WhiteSpace>
              {
                item.gevalImage && <div>{gevalImageShow}</div>
              }
              <p dangerouslySetInnerHTML={{ __html: item.specInfo }} ></p>
              <p>购买日期:{Moment(item.orderAddTime).format('YYYY-MM-DD HH:mm:ss')}</p>
            </WingBlank>
          })
        }  
        </List>  
        
      </div>
    )
  }
}

export default withRouter(EvaluteList);
