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
    const isLogin = common.isLogin();
    if (isLogin) {
      memberApi.memberDetail().then(result => {
        let data = result.data;
        if (data) {
          this.setState({
            memberDetail: data[0]
          });
        }
      })
    }
  }


  gotoLogin = () => {
    common.gotoLogin();
  }

  renderItem = (item) => {
    return <div style={{ textAlign: 'center', height: '1.2rem',paddingTop:'0.3rem'}}>
      <img src={item.icon} style={{height:'0.5rem'}}/>
      <div>{item.text}</div>
    </div>
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
    return <div className='wx-my'>
      <Flex style={{ height: '1.5rem' }}>
        <WingBlank>
          <Flex>
            <Img onClick={() => {
              this.props.router.push('/account')
              }}
              style={{ width: '1rem', height: '1rem' }} src={memberDetail.memberAvatar}></Img>
            {
              isLogin && memberDetail ? <div>
                账户: {memberDetail.memberName}
              </div> : <Button inline size="small" onClick={this.gotoLogin}>登录</Button>
            }
          </Flex>  
        </WingBlank>
      </Flex>
      <Flex className='wx-my-menu1'>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/attention/1')
          }}
          >
          关注的商品<br />({memberDetail && memberDetail.favGoodsCount || 0})
        </Flex.Item>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/attention/2')
          }}
          >关注的店铺<br />({memberDetail && memberDetail.favStoreCount || 0})</Flex.Item>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/viewRecord')
          }}
          >浏览记录<br />({memberDetail && memberDetail.browseCount || 0})</Flex.Item>   
      </Flex>
      <List renderHeader={
        <Flex justify='between'>
          <div>我的订单</div>
          <Flex>
            全部订单<Icon type='right'/>
          </Flex>  
        </Flex>
        }>
        <Grid data={orderMenu} columnNum={4} hasLine={false} renderItem={this.renderItem}>
        </Grid>  
      </List>
      <List className='wx-my-moneybag' renderHeader={()=>'我的钱包'}>
        <Flex style={{height:'1.2rem'}}>
          <Flex.Item>
            ({memberDetail && memberDetail.availablePredeposit || 0})
            <br />
            可用余额</Flex.Item>
          <Flex.Item>
            ({memberDetail && memberDetail.memberConsumePoints || 0})
            <br />
            积分纪录</Flex.Item>
          <Flex.Item>
            ({memberDetail && memberDetail.freezePredeposit || 0})
            <br />
            锁定余额</Flex.Item>
          <Flex.Item>
            ({memberDetail && memberDetail.couponCount || 0})
            <br />
            优惠券</Flex.Item>   
        </Flex>
      </List>

      <WhiteSpace></WhiteSpace>      
      <WingBlank style={{color:'#888'}}>
        <Flex justify='between' onClick={()=>this.props.router.push('/account')}>
          <div>账户管理</div>
            <Icon type='right'/>
        </Flex>
      </WingBlank>  
    </div>
  }
}

export default withRouter(My);
