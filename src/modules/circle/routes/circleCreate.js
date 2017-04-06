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
import { createForm } from 'rc-form';
import * as circleApi from '../api/circle';

import './circle.less';
const Item = List.Item;
class CircleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleTypeList: []
    }
  }

  componentDidMount() {
    // circleApi.circleType().then(result => {
    //   this.setState({
    //     circleTypeList: result.data
    //   })
    // })
  }

  submit = () => {
    circleApi.addcircle({
      // circleClassId,
      // circleName,
      // circleDescription,
      // circlePhoto
    }).then(result => {
      // Toast.hide();
      // if (result.result != 1) {
      //   Toast.error(result.msg);
      //   return;
      // }

      // let data = result.data[0];
      // this.setState({
      //   ...data
      // });
    });
  }

  gotoCircleDetail = (circle) => {
    this.props.router.push('/circleDetail/' + circle.circleId)
  }

  render() {
    const { hotCircle } = this.state;
    return (
      <List>
        <Item>
          请选择分类
        </Item>  
        <Item>
          <Button type='primary' onClick={this.submit}>创建</Button>
        </Item>
      </List>
    )
  }
}

export default withRouter(CircleCreate);
