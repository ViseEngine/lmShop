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
          evaluteList.map(item => {
            return <Item>
              <Flex direction='column'>
                <Flex>

                </Flex>
              </Flex>  
            </Item>
          })
        }  
        </List>  
        
      </div>
    )
  }
}

export default withRouter(EvaluteList);
