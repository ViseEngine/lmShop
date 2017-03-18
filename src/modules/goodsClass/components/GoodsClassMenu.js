import React, { Component } from 'react';
import { Menu } from 'antd-mobile';

class GoodsClassMenu extends Component {

  onMenuChange = (item) => {
    alert(item);
  }

  render() {
    const { data } = this.props;
    let convertedData = data.map(item => {
      return {
        value: item.gcId,
        label: item.gcName,
        isLeaf: true
      }
    });
    if (!convertedData || convertedData.length == 0) {
      return null;
    }

    return <Menu
        level={1}
        data={convertedData}
        height={document.documentElement.clientHeight}
        onChange={this.onMenuChange}
      />
  }
}

export default GoodsClassMenu;
