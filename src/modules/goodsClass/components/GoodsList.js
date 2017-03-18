import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import { Img } from 'commonComponent';

class GoodsList extends Component {

  onMenuChange = (item) => {
    alert(item);
  }

  render() {
    const { data } = this.props;
    return <div>
      <div>
        <Img src={data.image}></Img>
      </div>
      <div>自分类1</div>
      <div>自分类2</div>
      <div>自分类3</div>
    </div>
  }
}

export default GoodsList;
