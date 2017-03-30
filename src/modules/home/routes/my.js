import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  Icon,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Grid,
  Button
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as memberApi from '../api/member';

import './my.less';

const Item = List.Item;

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberDetail: {}
    }
  }

  componentDidMount() {
    memberApi.memberDetail().then(result => {
      if (result.result != 1) {
        Toast.info(result.msg);
        return;
      }

      let data = result.data;
      this.setState({
        memberDetail: data[0]
      });
    })
  }


  gotoLogin = () => {
    common.gotoLogin();
  }

  render() {
    const url = 'http://bbc.leimingtech.com/'
    const orderMenu = [{
      icon: `${url}/res_v4.0/h5/images/carp.png`,
      text: `待付款`,
    }, {
      icon: `${url}/res_v4.0/h5/images/car.png`,
      text: `已发货`,
    }, {
      icon: `${url}/res_v4.0/h5/images/tlist.png`,
      text: `待评价`,
    }, {
      icon: `${url}/res_v4.0/h5/images/fool.png`,
      text: `售后`,
    }];

    const moneyMenu = [{
      text: `待付款`,
    }, {
      text: `已发货`,
    }, {
      text: `待评价`,
    }, {
      text: `售后`,
    }];

    const isLogin = common.isLogin();
    const { memberDetail } = this.state;
    return <div>
      <Flex style={{padding:'20px'}}>
        <Img style={{width:'100px',height:'100px'}} src={'/upload/img/avatar/01.jpg'}></Img>
        <WingBlank>
          {
            isLogin && memberDetail ? <div>
              账户: {memberDetail.memberName}
            </div> : <Button inline size="small" onClick={this.gotoLogin}>登录</Button>
          }
        </WingBlank>
      </Flex>
      <Flex style={{ height: '1rem',backgroundColor:'red',textAlign:'center' }}>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/attention/1')
          }}
          >
          关注的商品<br />({memberDetail.favGoodsCount})
        </Flex.Item>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/attention/2')
          }}
          >关注的店铺<br />({memberDetail.favStoreCount})</Flex.Item>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/viewRecord')
          }}
          >浏览记录<br />({memberDetail.browseCount})</Flex.Item>   
      </Flex>
      <List renderHeader={
        <Flex justify='center'>
          <Flex.Item>我的订单</Flex.Item>
          <Flex.Item style={{ textAlign: 'right' }}>
            <span>全部订单</span>
            <Icon type='right'/>
          </Flex.Item>
        </Flex>
        }>
        <Grid data={orderMenu} columnNum={4} hasLine={false} >
        </Grid>  
      </List>
      <List renderHeader={()=>'我的钱包'}>
        <Flex alignContent='center' style={{ padding: '50px',fontSize:'24px' }}>
          <Flex.Item>可用余额</Flex.Item>
          <Flex.Item>积分纪录</Flex.Item>
          <Flex.Item>锁定余额</Flex.Item>
          <Flex.Item>优惠券</Flex.Item>   
        </Flex>
      </List>
      <List renderHeader={()=>'账户管理'}>

      </List>
    </div>
  }
}

export default withRouter(My);
