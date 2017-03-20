import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Carousel, Modal, SearchBar, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import { queryIndexData } from '../api';

class MyIntegral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // floorList: [],
      // relGoodsRecommedlist: [],
      // activityBeenList: [], //
      // advList: [], // 轮播
      // navigationList: [],
      // recommendGoodslist: []
    }
  }

  componentWillMount() {
    Toast.loading();
    // queryIndexData().then(result => {
    //   Toast.hide();
    //   let data = result.data[0];
    //   this.setState({
    //     advList: data.advPosition.advList,
    //     activityBeenList: data.activityBeenList,
    //     recommendGoodslist: data.recommendGoodslist,
    //     relGoodsRecommedlist: data.relGoodsRecommedlist,
    //     floorList: data.floorList
    //   });
    // });
  }

  render() {
    const {
      floorList,
      relGoodsRecommedlist,
      activityBeenList,
      advPosition,
      recommendGoodslist
    } = this.state;
    return (
      <div>
       积分
      </div>
    )
  }
}

export default withRouter(MyIntegral);
