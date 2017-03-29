import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  SearchBar,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Icon
} from 'antd-mobile';

class GoodsGotoSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Flex>
          <Icon type='left' onClick={()=>this.props.router.goBack()}/>
          <Flex.Item>
            <SearchBar placeholder="商品名称" onSubmit={value => {
              this.props.router.push(`/search/${value}`)
            }}
            />
          </Flex.Item>  
        </Flex>
        
        {/*<WingBlank>历史搜索</WingBlank>*/}
      </div>
    )
  }
}

export default withRouter(GoodsGotoSearch);
