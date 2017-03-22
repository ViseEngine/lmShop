import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Modal, WhiteSpace, WingBlank, Toast, Flex, List, Grid, Button } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

import './my.less';

class My extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   classList: [],
    //   goodsList: []
    // }
  }

  componentDidMount() {
    // goodsClassApi.queryClasslist().then(result => {
    //   // Toast.hide();
    //   if (result.result != 1) {
    //     Toast.error(result.msg);
    //     return;
    //   }

    //   let data = result.data;
    //   this.setState({
    //     classList: data
    //   });

    //   if (data && data.length > 0) {
    //     this.onMenuChange(data[0]);
    //   }
    // });
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

    return <div>
      <Flex style={{padding:'20px'}}>
        <Img style={{width:'100px',height:'100px'}} src={'/upload/img/avatar/01.jpg'}></Img>
        <WingBlank>
          <Button inline size="small" onClick={this.gotoLogin}>登录</Button>
        </WingBlank>
      </Flex>
      <Flex align='center' style={{ padding: '50px',backgroundColor:'red' }}>
        <Flex.Item style={{textAlign:'center'}}>关注的商品</Flex.Item>
        <Flex.Item style={{textAlign:'center'}}>关注的店铺</Flex.Item>
        <Flex.Item style={{textAlign:'center'}}>浏览记录</Flex.Item>   
      </Flex>
      <List renderHeader={()=>'我的订单'}>
        <Grid data={orderMenu} columnNum={4} hasLine={false} >
        </Grid>  
      </List>
      <List renderHeader={()=>'我的钱包'}>
        <Flex align='center' style={{ padding: '50px',fontSize:'24px' }}>
          <Flex.Item style={{textAlign:'center'}}>可用余额</Flex.Item>
          <Flex.Item style={{textAlign:'center'}}>积分纪录</Flex.Item>
          <Flex.Item style={{ textAlign: 'center' }}>锁定余额</Flex.Item>
          <Flex.Item style={{textAlign:'center'}}>优惠券</Flex.Item>   
        </Flex>
      </List>
      <List renderHeader={()=>'账户管理'}>

      </List>
    </div>
  }
}

export default withRouter(My);
