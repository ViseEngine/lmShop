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
      memberDetail: {

      }
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
    // console.log(memberDetail);
    return <div className='wx-my'>
      <Flex align='bottom'>
        <Img style={{width:'100px',height:'100px'}} src={'/upload/img/avatar/01.jpg'}></Img>
        <WingBlank>
          {
            isLogin && memberDetail ? <div>
              账户: {memberDetail.memberName}
            </div> : <Button inline size="small" onClick={this.gotoLogin}>登录</Button>
          }
        </WingBlank>
      </Flex>
      <Flex className='wx-my-menu1'>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/attention/1')
          }}
          >
          关注的商品<br />({memberDetail && memberDetail.favGoodsCount})
        </Flex.Item>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/attention/2')
          }}
          >关注的店铺<br />({memberDetail && memberDetail.favStoreCount})</Flex.Item>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/viewRecord')
          }}
          >浏览记录<br />({memberDetail && memberDetail.browseCount})</Flex.Item>   
      </Flex>
      <List renderHeader={
        <Flex justify='between'>
          <div>我的订单</div>
          <Flex>
            全部订单<Icon type='right'/>
          </Flex>  
        </Flex>
        }>
        <Grid data={orderMenu} columnNum={4} hasLine={false} >
        </Grid>  
      </List>
      <List className='wx-my-moneybag' renderHeader={()=>'我的钱包'}>
        <Flex>
          <Flex.Item>
            ({memberDetail && memberDetail.availablePredeposit})
            <br />
            可用余额</Flex.Item>
          <Flex.Item>
            ({memberDetail && memberDetail.memberConsumePoints})
            <br />
            积分纪录</Flex.Item>
          <Flex.Item>
            ({memberDetail && memberDetail.freezePredeposit})
            <br />
            锁定余额</Flex.Item>
          <Flex.Item>
            ({memberDetail && memberDetail.couponCount})
            <br />
            优惠券</Flex.Item>   
        </Flex>
      </List>

      <WhiteSpace></WhiteSpace>      
      <WingBlank style={{color:'#888'}}>
        <Flex justify='between'>
          <div>账户管理</div>
            <Icon type='right'/>
        </Flex>
      </WingBlank>  
    </div>
  }
}

export default withRouter(My);
